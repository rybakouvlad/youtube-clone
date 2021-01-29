import React from 'react';
import ReactPlayer from 'react-player';

export function Player() {
  return (
    <section className="player">
      <ReactPlayer url="/api/play/video" />
    </section>
  );
}
