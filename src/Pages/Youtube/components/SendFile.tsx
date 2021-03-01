import React, { useState, FC } from 'react';
import { Button, Form, FormControl, InputGroup, ProgressBar } from 'react-bootstrap';
import superagent, { ResponseError, Response } from 'superagent';
// import { useContext } from 'react';
import { ToastCopmponent } from '../../../components/ToastCopmponent';
interface Event<T = EventTarget> {
  target: T;
}

interface IProps {
  setFileName(name: string): void;
  setStatus(isStatus: boolean): void;
}

export const SendFile: FC<IProps> = (props: IProps) => {
  // const auth = useContext(AuthContext);
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
      setToastMessage('Type does not fit. Need mp4.');

      setShowToast(true);
    }
  };

  const ClearForms = () => {
    setFileTitle({ title: '' });
  };

  const sendFile = (event: Event<HTMLInputElement>, fileTitle: string) => {
    superagent
      .post('http://178.124.178.250:3000/api/file/upload/rtmp')
      .attach('file', event.target.files[0])
      .on('progress', (event) => {
        if (!isLoad) {
          setIsLoad(true);
        }
        setLoadPerCent(event.percent);
      })
      .set('fileTitle', fileTitle)
      .set('accept', 'json')
      .end(function (err: ResponseError, res: Response) {
        const text = JSON.parse(res.text);
        setToastMessage(text.message);
        setShowToast(true);
        if (res.status === 200) {
          props.setFileName(text.fileName);
          setIsLoad(false);
          ClearForms();
          setVideoFile(null);
        }
      });
  };
  const submitFileHandler = (event: React.MouseEvent<HTMLElement>) => {
    if (fileTitle.title !== '') {
      sendFile(videoFile, fileTitle.title);
    } else {
      setToastMessage('Enter name.');
      setShowToast(true);
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
            <Form.File.Label>Select file to add</Form.File.Label>
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
      <div>{isLoad ? <ProgressBar now={loadPerCent} label={`${Math.trunc(loadPerCent)}%`} /> : null}</div>
    </>
  );
};
