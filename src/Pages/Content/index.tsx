import React, { FC, useCallback, useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Image } from 'react-bootstrap';

interface IStreams {
  nameStream: string;
  date: Date;
}
// {"live":{"NhWyGgIzq":{"publisher":{"app":"live","stream":"NhWyGgIzq","clientId":"GIBY39P7","connectCreated":"2021-01-30T21:20:06.870Z","bytes":2506103,"ip":"::ffff:127.0.0.1","audio":{"codec":"AAC","profile":"LC","samplerate":48000,"channels":2},"video":{"codec":"H264","width":852,"height":480,"profile":"Main","level":3.1,"fps":30}},"subscribers":[{"app":"live","stream":"NhWyGgIzq","clientId":"KE7K1FH2","connectCreated":"2021-01-30T21:20:08.094Z","bytes":2508206,"ip":"::ffff:127.0.0.1","protocol":"rtmp"}]}}}
export const Content: FC = () => {
  const { path, url } = useRouteMatch();
  console.log(path);
  console.log(url);
  const [streamList, setStreamList] = useState<Array<IStreams>>([]);

  const getStreams = useCallback(async () => {
    try {
      const data = await axios.get('http://localhost:8080/api/streams');
      console.log(data.data.live);
      const arr: Array<IStreams> = [];

      if (typeof data.data.live !== 'undefined') {
        for (const element in data.data.live) {
          console.log('elem' + element.valueOf());
          console.log(data.data.live[element].publisher);
          arr.push({
            nameStream: data.data.live[element].publisher.stream,
            date: data.data.live[element].publisher.connectCreated,
          });
        }
        setStreamList(arr);
      }
    } catch (error) {}
  }, []);
  useEffect(() => {
    try {
      getStreams();
    } catch (error) {}
  }, [getStreams]);

  console.log(streamList);

  return (
    <>
      <h2>content</h2>
      <Container>
        <Row xs={1} md={3}>
          {streamList.map((el, i) => {
            return (
              <>
                <Col key={i}>
                  <Link to={`/player?name=${el.nameStream}&live=true`}>
                    <Image src={`http://localhost:3000/api/image/${el.nameStream}.png`} rounded />
                  </Link>
                </Col>
              </>
            );
          })}
        </Row>
      </Container>
    </>
  );
};
