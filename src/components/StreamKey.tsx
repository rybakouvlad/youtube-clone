import { AuthContext } from 'Pages/Auth/context/AuthContext';
import { useHttp } from 'Pages/Auth/hooks/http.hook';
import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';

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
      <Accordion defaultActiveKey="0" style={{ marginTop: '10px' }}>
        <Card bg="dark" text="white">
          <Card.Header>
            <Accordion.Toggle as={Button} variant="secondary" eventKey="1" text="white">
              Get key!
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <div>Key: {streamKey}</div>
              <div>Link: rtmp://178.124.178.250:1935/live</div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
};
