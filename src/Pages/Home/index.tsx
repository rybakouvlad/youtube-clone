import React, { useCallback, useEffect, useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { VideoPage } from 'Pages/VideoPage';
import { useHttp } from 'Pages/Auth/hooks/http.hook';
import { Row, Col, Image, Container } from 'react-bootstrap';
interface IVideo {
  _id: string;
  path: string;
  date: Date;
  name: string;
  size: number;
  user: string;
}
// {
//   "size": 1107701,
//   "path": "",
//   "date": "2021-01-26T21:50:20.579Z",
//   "_id": "60108eab97916e647d2de24d",
//   "name": "bus.png",
//   "user": "5fff9ae15d9ece0edb8e5fc1",
//   "__v": 0
// }
export function Home() {
  const { request, loading } = useHttp();
  const [allVideo, setAllVideo] = useState<Array<IVideo>>([]);
  const getAllVideo = useCallback(async () => {
    try {
      const data = await request('/api/file/all', 'GET', null);
      setAllVideo(data);
      return true;
    } catch (e) {
      return false;
    }
  }, [request]);

  useEffect(() => {
    try {
      getAllVideo();
    } catch (error) {}
  }, [getAllVideo]);

  if (loading) {
    return <h2>Loading</h2>;
  }

  return (
    <>
      {!loading && (
        <Container>
          <Row xs={1} md={3}>
            {allVideo.map((video, index) => {
              return (
                <Col xs={6} md={4} key={index}>
                  <Link to={`/video?name=${video._id}`}>
                    <Image width="300px" src={`http://localhost:3000/api/image/${video.name}.png`} rounded />
                  </Link>
                </Col>
              );
            })}
          </Row>
        </Container>
      )}
      <Switch>
        <Route path="/video?:id">
          <VideoPage />
        </Route>
      </Switch>
    </>
  );
}
