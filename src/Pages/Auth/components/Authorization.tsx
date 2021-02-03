import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { Button, Form, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { ToastError } from '../../../components/ToastError';
export const Authorization = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [registeredMessage, setRegisteredMessage] = useState(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    setRegisteredMessage(error);
    setShow(true);
  }, [error, clearError, setShow]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const loginHandler = async () => {
    try {
      const data = await request('/api/login', 'POST', { ...form });
      auth.login(data.token, data.userId);
      if (data.status) {
        history.push('/');
      }
    } catch (e) {}
  };

  const changeShow = (status: boolean) => {
    setShow(status);
  };
  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" value={form.email} onChange={changeHandler} />
        <Form.Text className="text-dark">Well never share your email with anyone else.</Form.Text>
      </Form.Group>
      <Form.Label>Password</Form.Label>
      <Form.Group controlId="formBasicPassword">
        <OverlayTrigger
          key="top"
          placement="top"
          overlay={<Tooltip id="tooltip-top">Enter more than 6 symbols.</Tooltip>}
        >
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={changeHandler}
          />
        </OverlayTrigger>
      </Form.Group>

      <Button variant="primary" type="submit" onClick={loginHandler} disabled={loading}>
        Login
      </Button>
      {registeredMessage ? (
        <ToastError message={registeredMessage} show={show} changeShow={changeShow} clearError={clearError} />
      ) : null}
    </Form>
  );
};

export default Authorization;
