import React, { FC, useCallback } from 'react';
import { useRouteMatch } from 'react-router-dom';
import axios from 'axios';

// interface IStreams {}

export const Content: FC = () => {
  const { path, url } = useRouteMatch();
  console.log(path);
  console.log(url);
  // const [streamList, setStreamList] = useState<AxiosPromise>();

  const getStreams = useCallback(async () => {
    try {
      const data = await axios.get('http://localhost:8080/api/streams');
      console.log(data.data.live);
    } catch (error) {}
  }, []);
  getStreams();
  return (
    <>
      <h2>content</h2>
    </>
  );
};
