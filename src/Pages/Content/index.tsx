import React, { FC } from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';

import { VideoPage } from 'Pages/VideoPage';
// import { VideoPage } from 'Pages/VideoPage';
// function RouteWithSubRoutes(page: any) {
//   return (
//     <Route
//       path={page.link}
//       render={(props) => (
//         // pass the sub-routes down to keep nesting
//         <page.component {...props} routes={page.component} />
//       )}
//     />
//   );
// }
export const Content: FC = () => {
  const { path, url } = useRouteMatch();
  console.log(path);
  console.log(url);
  // console.log(routes);

  return (
    <>
      <Link to="/content/video">
        <h2>VIDEO</h2>
      </Link>
      <Switch>
        <Route exact path="/content">
          <VideoPage />
        </Route>
        <Route exact path="/content/video">
          <VideoPage />
        </Route>
      </Switch>
    </>
  );
};
