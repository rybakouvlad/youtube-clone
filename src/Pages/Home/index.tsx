import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { VideoPage } from 'Pages/VideoPage';
export function Home() {
  return (
    <>
      <Link to="/video">
        <h2>VIDEO</h2>
      </Link>
      <Switch>
        <Route path="/video">
          <VideoPage />
        </Route>
      </Switch>
    </>
  );
}
