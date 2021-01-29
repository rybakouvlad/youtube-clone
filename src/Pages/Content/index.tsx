import React, { FC } from 'react';
import { useRouteMatch } from 'react-router-dom';

export const Content: FC = () => {
  const { path, url } = useRouteMatch();
  console.log(path);
  console.log(url);
  // console.log(routes);

  return (
    <>
      <h2>content</h2>
    </>
  );
};
