import React, { useState } from 'react';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import { sendFile } from './hooks/sendFile.hook';
import { AuthContext } from '../Auth/context/AuthContext';
import { useContext } from 'react';
interface Event<T = EventTarget> {
  target: T;
  // ...
}
export function Profile() {
  const [videoFile, setVideoFile] = useState(null);
  const [fileTitle, setFileTitle] = useState({ title: '' });
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileTitle({ ...fileTitle, [event.target.name]: event.target.value });
  };
  const auth = useContext(AuthContext);
  const loadHandler = (event: Event<HTMLInputElement>) => {
    console.log(auth.token);
    if (event.target.files[0].type === 'video/mp4') {
      console.log(event);
      setVideoFile({ videoFile, ...event });
      console.log(videoFile);
      // sendFile(event, { Authorization: `Bearer ${auth.token}` });
    } else {
      console.log('Тип не подходит');
    }
  };

  const submitFileHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    sendFile(videoFile, { Authorization: `Bearer ${auth.token}` }, fileTitle.title);
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
          <Form.File.Input type="file" onChange={loadHandler} />
          {videoFile ? (
            <InputGroup className="mb-3">
              <FormControl
                onChange={changeHandler}
                value={fileTitle.title}
                name="title"
                placeholder="Enter file title"
                aria-label="Enter file title"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" type="submit" onClick={submitFileHandler}>
                  submit
                </Button>
              </InputGroup.Append>
            </InputGroup>
          ) : null}
        </Form.File>
      </div>
    </Form>
  );
}
