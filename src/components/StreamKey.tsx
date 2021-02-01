import { AuthContext } from 'Pages/Auth/context/AuthContext';
import { useHttp } from 'Pages/Auth/hooks/http.hook';
import React, { FC, useCallback, useContext, useEffect, useState } from 'react';

export const StreamKey: FC = () => {
  const { request } = useHttp();
  const auth = useContext(AuthContext);

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
    <>
      <h2>Stream key</h2>
      <h2>{streamKey}</h2>
    </>
  );
};
