import React from 'react';
import { Form } from 'react-bootstrap';
import { sendFile } from '../hooks/sendFile.hook';
import { AuthContext } from '../../Auth/context/AuthContext';
import { useContext } from 'react';
interface Event<T = EventTarget> {
  target: T;
  // ...
}
export function Profile() {
  const auth = useContext(AuthContext);
  const loadHendler = (event: Event<HTMLInputElement>) => {
    console.log(auth.token);

    console.log(event);
    sendFile(event, { Authorization: `Bearer ${auth.token}` });
  };

  return (
    <Form>
      <div className="mb-3">
        <Form.File id="formcheck-api-custom" custom>
          <Form.File.Input isValid />
          <Form.File.Label data-browse="Button text">Custom file input</Form.File.Label>
          <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback>
        </Form.File>
      </div>
      <div className="mb-3">
        <Form.File id="formcheck-api-regular">
          <Form.File.Label>Regular file input</Form.File.Label>
          <Form.File.Input type="file" onChange={loadHendler} />
        </Form.File>
      </div>
    </Form>
  );
}
