import React, { FC, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { LiveVideoList } from '../../components/LiveVideoList';

export const Content: FC = () => {
  const [isStreams, setIsStream] = useState(false);

  const getStreams = useCallback(async () => {
    try {
      const data = await axios.get('http://178.124.178.250:8080/api/streams');
      if (typeof data.data.live !== 'undefined') {
        setIsStream(true);
      }
    } catch (error) {}
  }, []);
  useEffect(() => {
    try {
      getStreams();
    } catch (error) {}
  }, [getStreams]);

  console.log(isStreams);

  return <>{isStreams ? <LiveVideoList /> : <h2>No streams</h2>}</>;
};
