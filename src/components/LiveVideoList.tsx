import axios from 'axios';
import React from 'react';
import { FC, useCallback, useEffect, useState } from 'react';
import { CardColumns, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
interface IStreams {
  nameStream: string;
  date: Date;
}

export const LiveVideoList: FC = () => {
  const [streamList, setStreamList] = useState<Array<IStreams>>([]);

  const getStreams = useCallback(async () => {
    try {
      const data = await axios.get('http://178.124.178.250:8080/api/streams');
      const arr: Array<IStreams> = [];

      if (typeof data.data.live !== 'undefined') {
        for (const element in data.data.live) {
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

  return (
    <CardColumns>
      {streamList.map((el, i) => {
        return (
          <Link to={`/player?name=${el.nameStream}&live=true`} key={i}>
            <Card bg="dark" text="white">
              <Card.Img variant="top" src={`http://178.124.178.250:3000/api/image/${el.nameStream}.png`} />
              <Card.Body>
                <Card.Title>NAME</Card.Title>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
          </Link>
        );
      })}
    </CardColumns>
  );
};
