import React from 'react';
import { FC } from 'react';
import ReactPlayer from 'react-player';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const VideoPage: FC = () => {
  const query = useQuery();
  return (
    <div>
      <h2>Video</h2>
      <h4>{query.get('name')}</h4>
      <ReactPlayer controls={true} url="/api/play/video" />
    </div>
  );
};
