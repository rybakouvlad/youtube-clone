import React, { useCallback, useEffect, useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { VideoPage } from 'Pages/VideoPage';
import { useHttp } from 'Pages/Auth/hooks/http.hook';
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
    return <h2>llllll</h2>;
  }
  console.log(allVideo);

  return (
    <>
      {!loading &&
        allVideo.map((video, index) => {
          return (
            <li key={index}>
              <Link to={`/video?name=${video._id}`}>{video.name}</Link>
            </li>
          );
        })}
      <li>
        <Link to="/video?name=netflix">video 1</Link>
      </li>
      <li>
        <Link to="/video?name=zillow-group">video 2</Link>
      </li>
      <Switch>
        <Route path="/video?:id">
          <VideoPage />
        </Route>
      </Switch>
    </>
  );
}
