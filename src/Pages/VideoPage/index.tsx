import { useHttp } from 'Pages/Auth/hooks/http.hook';
import React, { useCallback, useEffect, useState } from 'react';
import { FC } from 'react';
import ReactPlayer from 'react-player';
import { useLocation } from 'react-router-dom';
import { LoaderSpiner } from '../../components/LoadingComponent';
import { AddComments } from '../../components/CommentCreate';
import TimeAgo from 'react-timeago';
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
// date: "2021-01-27T00:21:33.500Z"
// name: "second.mp4"
// path: ""
// size: 63614462
// user: "5fff9ae15d9ece0edb8e5fc1"
// __v: 0
// _id: "6010b23b8f7bef1640cd6883"
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
  // const dateOptions = {
  //   hour: 'numeric',
  //   minute: 'numeric',
  //   year: 'numeric',
  //   month: 'long',
  //   day: 'numeric',
  //   timezone: 'UTC',
  // };

  return (
    <div>
      {isReady ? (
        <>
          <h2>{video.title}</h2>
          <ReactPlayer controls={true} url={`http://178.124.178.250:3000/api/video/${video.user}/${video.name}`} />
          <p>{login}</p>
          <p>
            <TimeAgo date={new Date(video.createdAt)} />
          </p>
          <AddComments videoId={query.get('name')} />
        </>
      ) : null}
    </div>
  );
};
