import React from 'react';
import ReactPlayer from 'react-player';
import { AddComments } from '../../components/CommentCreate';
export function Player() {
  return (
    <div>
      <section className="player">
        <ReactPlayer url="http://127.0.0.1:8080/live/live/index.m3u8" />
      </section>
      <AddComments />
    </div>
  );
}
