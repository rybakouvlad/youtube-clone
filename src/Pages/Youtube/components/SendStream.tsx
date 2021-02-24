import React, { FC, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHttp } from '../hooks/http.hook';

interface IProps {
  fileName: string;
}

export const SendStream: FC<IProps> = (props: IProps) => {
  const { request } = useHttp();
  const [form, setForm] = useState({
    link: '',
    key: '',
  });
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const sendHandler = async () => {
    try {
      const data = await request('/api/rtmp/send', 'POST', { ...form, name: props.fileName });
      console.log(data);

      // auth.login(data.token, data.userId);
    } catch (e) {}
  };

  return (
    <div>
      <h1>SEND</h1>
      <Form>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Enter Link</Form.Label>
          <Form.Control name="link" type="text" placeholder="Enter link" value={form.link} onChange={changeHandler} />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Enter Key</Form.Label>
          <Form.Control name="key" type="password" placeholder="Enter key" value={form.key} onChange={changeHandler} />
        </Form.Group>
      </Form>
      <Button variant="primary" type="submit" onClick={sendHandler}>
        Login
      </Button>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </div>
  );
};
