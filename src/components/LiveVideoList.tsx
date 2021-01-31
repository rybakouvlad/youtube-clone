import axios from 'axios';
import React from 'react';
import { FC, useCallback, useEffect, useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
interface IStreams {
  nameStream: string;
  date: Date;
}

export const LiveVideoList: FC = () => {
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
      <Container>
        <Row xs={1} md={3}>
          {streamList.map((el, i) => {
            return (
              <Col key={i}>
                <Link to={`/player?name=${el.nameStream}&live=true`}>
                  <Image src={`http://localhost:3000/api/image/${el.nameStream}.png`} rounded />
                </Link>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};
