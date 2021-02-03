import React from 'react';
import ReactPlayer from 'react-player';
import { useLocation } from 'react-router-dom';
import style from '../Pages/VideoPage/index.scss';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export function PlayerComponent() {
  const query = useQuery();

  return (
    <div className={style.player_container}>
      <div className={style.player_items}>
        <ReactPlayer controls={true} url={`http://178.124.178.250:8080/live/${query.get('name')}/index.m3u8`} />
      </div>
    </div>
  );
}
