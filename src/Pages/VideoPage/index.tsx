import { useHttp } from 'Pages/Auth/hooks/http.hook';
import React, { useCallback, useEffect, useState } from 'react';
import { FC } from 'react';
import ReactPlayer from 'react-player';
import { useLocation } from 'react-router-dom';
import { LoaderSpiner } from '../../components/LoadingComponent';
import { AddComments } from '../../components/CommentCreate';
import TimeAgo from 'react-timeago';
import style from './index.scss';
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
interface IURL {
  _id: string;
  date?: Date;
  user: string;
  name: string;
  title: string;
  createdAt: Date;
}

export const VideoPage: FC = () => {
  const query = useQuery();
  const { request, loading } = useHttp();
  const [login, setLogin] = useState('');
  const [video, setVideo] = useState<IURL>({
    _id: '',
    createdAt: new Date('2021-01-31T04:19:37.967Z'),
    user: '60165c08c4e5086aec94f004',
    name: '',
    title: '',
  });
  const [isReady, setIsReady] = useState(false);
  const getAllVideo = useCallback(async () => {
    try {
      const data = await request('/api/file/single', 'POST', null, { filename: query.get('name') });

      const userLogin = await request('/api/getUserLogin', 'POST', null, { userId: data.user });
      setVideo(data);
      setLogin(userLogin);
      setIsReady(true);
      return true;
    } catch (e) {
      return false;
    }
  }, [request]);

  useEffect(() => {
    try {
      getAllVideo();
    } catch (error) {}
  }, [getAllVideo]);

  if (loading) {
    return <LoaderSpiner />;
  }

  return (
    <div>
      {isReady ? (
        <>
          <div className={style.player_container}>
            <div className={style.player_items}>
              <h2>{video.title}</h2>
              <ReactPlayer controls={true} url={`http://178.124.178.250:3000/api/video/${video.user}/${video.name}`} />
              <div className={style.player_header}>
                <p>Add: {login}</p>
                <p>
                  <TimeAgo date={new Date(video.createdAt)} />
                </p>
              </div>
            </div>
          </div>

          <AddComments videoId={query.get('name')} />
        </>
      ) : null}
    </div>
  );
};
