import React, { useState } from 'react';
import { Button, Form, FormControl, InputGroup, ProgressBar } from 'react-bootstrap';
import superagent, { ResponseError, Response } from 'superagent';
import { AuthContext } from '../Pages/Auth/context/AuthContext';
import { useContext } from 'react';
// import { StreamKey } from '../../components/StreamKey';
interface Event<T = EventTarget> {
  target: T;
  // ...
}
interface authToke {
  Authorization: string;
}
export const SendFile = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [fileTitle, setFileTitle] = useState({ title: '' });
  const [isLoad, setIsLoad] = useState(false);
  const [loadPerCent, setLoadPerCent] = useState(0);
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileTitle({ ...fileTitle, [event.target.name]: event.target.value });
  };
  const auth = useContext(AuthContext);
  const loadHandler = (event: Event<HTMLInputElement>) => {
    if (event.target.files[0].type === 'video/mp4') {
      setVideoFile({ videoFile, ...event });
    } else {
      console.log('Тип не подходит');
    }
  };

  const ClearForms = () => {
    setFileTitle({ title: '' });
  };

  const sendFile = (event: Event<HTMLInputElement>, header: authToke, fileTitle: string) => {
    superagent
      .post('/api/files')
      .attach('file', event.target.files[0])
      .on('progress', (event) => {
        if (!isLoad) {
          setIsLoad(true);
        }
        setLoadPerCent(event.percent);
        console.log(event);
      }) // sends a JSON post body
      .set(header)
      .set('fileTitle', fileTitle)
      .set('accept', 'json')
      .end(function (err: ResponseError, res: Response) {
        // Calling the end function will send the request
        console.log(`err:${err}`);
        console.log(res);
        if (res.status === 200) {
          setIsLoad(false);
          ClearForms();
          setVideoFile(null);
        }
      });
  };
  const submitFileHandler = (event: React.MouseEvent<HTMLElement>) => {
    if (fileTitle.title !== '') {
      sendFile(videoFile, { Authorization: `Bearer ${auth.token}` }, fileTitle.title);
    } else {
      console.log('укажите название');
    }
    event.preventDefault();
  };
  return (
    <>
      <Form>
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
      <div>{isLoad ? <ProgressBar now={loadPerCent} label={`${loadPerCent}%`} /> : null}</div>
    </>
  );
};
