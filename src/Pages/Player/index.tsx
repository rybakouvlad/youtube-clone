import React from 'react';
import { PlayerComponent } from '../../components/PlayerComponent';
import { AddComments } from '../../components/CommentCreate';

import ReactPlayer from 'react-player';
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
