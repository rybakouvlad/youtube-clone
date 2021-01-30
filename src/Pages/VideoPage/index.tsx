import { useHttp } from 'Pages/Auth/hooks/http.hook';
import React, { useCallback, useEffect, useState } from 'react';
import { FC } from 'react';
import ReactPlayer from 'react-player';
import { useLocation } from 'react-router-dom';
import { AddComments } from "../../components/CommentCreate";

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
}

export const VideoPage: FC = () => {
  const query = useQuery();
  const { request, loading } = useHttp();
  const [video, setVideo] = useState<IURL>({ _id: '', date: new Date(), user: '', name: '' });
  const getAllVideo = useCallback(async () => {
    try {
      const data = await request('/api/file/single', 'POST', { filename: query.get('name') });
      setVideo(data);
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
  console.log(video.user);

  return (
    <div>
      <h2>Video</h2>
      <h4>{query.get('name')}</h4>
      <ReactPlayer controls={true} url={`/api/play/video/${video.user}/${video.name}`} />
      <AddComments />
    </div>
  );
};
