import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { VideoPage } from 'Pages/VideoPage';
import { useHttp } from 'Pages/Auth/hooks/http.hook';
import { Card, CardColumns } from 'react-bootstrap';
import { LoaderSpiner } from '../../components/LoadingComponent';
import TimeAgo from 'react-timeago';
interface IVideo {
  _id: string;
  path: string;
  date: Date;
  name: string;
  size: number;
  user: string;
  title: string;
  createdAt: Date;
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
    return <LoaderSpiner />;
  }

  return (
    <>
      {!loading && (
        <CardColumns>
          {allVideo.map((video, index) => {
            return (
              <Link to={`/video?name=${video._id}`} key={index}>
                <Card bg="dark" text="white">
                  <Card.Img variant="top" src={`http://178.124.178.250:3000/api/image/${video.name}.png`} />
                  <Card.Body>
                    <Card.Title>{video.title}</Card.Title>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      <TimeAgo date={new Date(video.createdAt)} />
                    </small>
                  </Card.Footer>
                </Card>
              </Link>
            );
          })}
        </CardColumns>
      )}
    </>
  );
}
