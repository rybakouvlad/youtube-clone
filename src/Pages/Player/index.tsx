// import { AuthContext } from 'Pages/Auth/context/AuthContext';
// import { useHttp } from 'Pages/Auth/hooks/http.hook';
import React from 'react';
import { PlayerComponent } from '../../components/PlayerComponent';
import { AddComments } from '../../components/CommentCreate';

export function Player() {
  return (
    <div>
      <PlayerComponent />
      <AddComments />
    </div>
  );
}
