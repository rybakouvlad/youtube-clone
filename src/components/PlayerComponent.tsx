import { AuthContext } from 'Pages/Auth/context/AuthContext';
import { useHttp } from 'Pages/Auth/hooks/http.hook';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useLocation } from 'react-router-dom';
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export function PlayerComponent() {
  const { request } = useHttp();
  const auth = useContext(AuthContext);
  const query = useQuery();
  const [streamKey, setStreamKey] = useState<string>();

  const getKey = useCallback(async () => {
    try {
      const data = await request('/api/stream/stream-key', 'GET', null, { Authorization: `Bearer ${auth.token}` });
      setStreamKey(data);
      return true;
    } catch (e) {
      return false;
    }
  }, [request]);

  useEffect(() => {
    try {
      getKey();
    } catch (error) {}
  }, [getKey]);

  return (
    <section className="player">
      <h2>{streamKey}</h2>
      <ReactPlayer controls={true} url={`http://127.0.0.1:8080/live/${query.get('name')}/index.m3u8`} />
    </section>
  );
}
