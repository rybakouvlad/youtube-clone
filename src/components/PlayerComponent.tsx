import React from 'react';
import ReactPlayer from 'react-player';
import { useLocation } from 'react-router-dom';
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export function PlayerComponent() {
  const query = useQuery();

  return (
    <section className="player">
      <ReactPlayer controls={true} url={`http://178.124.178.250:8080/live/${query.get('name')}/index.m3u8`} />
    </section>
  );
}
