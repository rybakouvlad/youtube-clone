import React, { FC, useCallback, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import axios from 'axios';
// import { Container, Row, Col, Image } from 'react-bootstrap';
import { LiveVideoList } from '../../components/LiveVideoList';

// {"live":{"NhWyGgIzq":{"publisher":{"app":"live","stream":"NhWyGgIzq","clientId":"GIBY39P7","connectCreated":"2021-01-30T21:20:06.870Z","bytes":2506103,"ip":"::ffff:127.0.0.1","audio":{"codec":"AAC","profile":"LC","samplerate":48000,"channels":2},"video":{"codec":"H264","width":852,"height":480,"profile":"Main","level":3.1,"fps":30}},"subscribers":[{"app":"live","stream":"NhWyGgIzq","clientId":"KE7K1FH2","connectCreated":"2021-01-30T21:20:08.094Z","bytes":2508206,"ip":"::ffff:127.0.0.1","protocol":"rtmp"}]}}}
export const Content: FC = () => {
  const { path, url } = useRouteMatch();
  console.log(path);
  console.log(url);
  const [isStreams, setIsStream] = useState(false);

  const getStreams = useCallback(async () => {
    try {
      const data = await axios.get('http://localhost:8080/api/streams');
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
