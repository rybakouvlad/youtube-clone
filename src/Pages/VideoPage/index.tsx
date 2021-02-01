import { useHttp } from 'Pages/Auth/hooks/http.hook';
import React, { useCallback, useEffect, useState } from 'react';
import { FC } from 'react';
import ReactPlayer from 'react-player';
import { useLocation } from 'react-router-dom';
import { AddComments } from '../../components/CommentCreate';

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
  date: Date;
  user: string;
  name: string;
  title: string;
}

export const VideoPage: FC = () => {
  const query = useQuery();
  const { request, loading } = useHttp();
  const [login, setLogin] = useState('');
  const [video, setVideo] = useState<IURL>({
    _id: '',
    date: new Date('2021-01-31T04:19:37.967Z'),
    user: '60165c08c4e5086aec94f004',
    name: '',
    title: '',
  });
  const getAllVideo = useCallback(async () => {
    try {
      const data = await request('/api/file/single', 'POST', { filename: query.get('name') });
      setVideo(data);
      const userLogin = await request('/api/getUserLogin', 'POST', { userId: data.user });
      setLogin(userLogin);
      console.log('', userLogin);
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
    return <h2>llllll</h2>;
  }
  console.log('!!!!!!!!!!', video.user);
  const dateOptions = {
    hour: 'numeric',
    minute: 'numeric',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timezone: 'UTC',
  };

  return (
    <div>
      <h2>Video</h2>
      <h4>{query.get('name')}</h4>
      <ReactPlayer controls={true} url={`/api/play/video/${video.user}/${video.name}`} />
      <p>{login}</p>
      <p>{video.title}</p>
      <p>{new Date(video.date).toLocaleString('ru', dateOptions)}</p>
      <AddComments videoId={query.get('name')} />
    </div>
  );
};
