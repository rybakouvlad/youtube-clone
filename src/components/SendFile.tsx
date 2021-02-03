import React, { useState, FC } from 'react';
import { Button, Form, FormControl, InputGroup, ProgressBar } from 'react-bootstrap';
import superagent, { ResponseError, Response } from 'superagent';
import { AuthContext } from '../Pages/Auth/context/AuthContext';
import { useContext } from 'react';
import { ToastCopmponent } from './ToastCopmponent';
interface Event<T = EventTarget> {
  target: T;
}
interface authToke {
  Authorization: string;
}
export const SendFile: FC = () => {
  const auth = useContext(AuthContext);
  const [videoFile, setVideoFile] = useState(null);
  const [fileTitle, setFileTitle] = useState({ title: '' });
  const [isLoad, setIsLoad] = useState(false);
  const [loadPerCent, setLoadPerCent] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileTitle({ ...fileTitle, [event.target.name]: event.target.value });
  };

  const loadHandler = (event: Event<HTMLInputElement>) => {
    if (event.target.files[0].type === 'video/mp4') {
      setVideoFile({ videoFile, ...event });
    } else {
      setToastMessage('Тип не подходит, надо mp4');
      console.log('Тип не подходит');
      setShowToast(true);
    }
  };

  const ClearForms = () => {
    setFileTitle({ title: '' });
  };

  const sendFile = (event: Event<HTMLInputElement>, header: authToke, fileTitle: string) => {
    superagent
      .post('http://178.124.178.250:3000/api/files')
      .attach('file', event.target.files[0])
      .on('progress', (event) => {
        if (!isLoad) {
          setIsLoad(true);
        }
        setLoadPerCent(event.percent);
      })
      .set(header)
      .set('fileTitle', fileTitle)
      .set('accept', 'json')
      .end(function (err: ResponseError, res: Response) {
        setToastMessage(res.text);
        setShowToast(true);
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
      setToastMessage('укажите название');
      setShowToast(true);
      console.log('укажите название');
    }
    event.preventDefault();
  };

  const changeShow = (status: boolean) => {
    setShowToast(status);
    setToastMessage(null);
  };

  return (
    <>
      <Form>
        <div className="mb-3">
          <Form.File id="formcheck-api-regular">
            <Form.File.Label>Regular file input</Form.File.Label>
            <Form.File.Input type="file" onChange={loadHandler} />
            {showToast ? <ToastCopmponent show={showToast} message={toastMessage} changeShow={changeShow} /> : null}
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
                  <Button variant="dark" type="submit" onClick={submitFileHandler}>
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
