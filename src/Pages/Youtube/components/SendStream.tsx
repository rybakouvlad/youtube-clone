import React, { FC, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHttp } from '../hooks/http.hook';
import { ToastCopmponent } from '../../../components/ToastCopmponent';

interface IProps {
  fileName: string;
}

export const SendStream: FC<IProps> = (props: IProps) => {
  const { request } = useHttp();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [form, setForm] = useState({
    link: '',
    key: '',
  });
  const [pid, setPid] = useState(null);
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const sendHandler = async () => {
    try {
      const data = await request('/api/rtmp/send', 'POST', { ...form, name: props.fileName });

      setPid(data.pid);
      setToastMessage(data.message);
      setShowToast(true);
    } catch (e) {}
  };

  const stopHandler = async () => {
    try {
      if (pid) {
        const data = await request('/api/rtmp/stop', 'POST', { pid: pid });
        setPid(null);

        setToastMessage(data.message);
        setShowToast(true);
      }
    } catch (e) {}
  };

  const changeShow = (status: boolean) => {
    setShowToast(status);
    setToastMessage(null);
  };

  return (
    <div>
      <h1>Enter RTMP link</h1>
      <Form>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Enter RTMP Link</Form.Label>
          <Form.Control
            name="link"
            type="text"
            placeholder="Enter RTMP link"
            value={form.link}
            onChange={changeHandler}
          />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Enter Key</Form.Label>
          <Form.Control name="key" type="password" placeholder="Enter key" value={form.key} onChange={changeHandler} />
        </Form.Group>
      </Form>
      <Button variant="primary" type="submit" onClick={sendHandler}>
        start
      </Button>
      <Button variant="primary" type="submit" className="ml-3" onClick={stopHandler}>
        stop
      </Button>
      {showToast ? <ToastCopmponent show={showToast} message={toastMessage} changeShow={changeShow} /> : null}
    </div>
  );
};
