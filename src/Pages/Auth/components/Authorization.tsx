import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { Button, Form /* FormControl */ } from 'react-bootstrap';

export const Authorization = () => {
  const auth = useContext(AuthContext);
  const { loading, request /* , error, clearError  */ } = useHttp();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const loginHandler = async () => {
    try {
      const data = await request('/api/login', 'POST', { ...form });
      auth.login(data.token, data.userId);
      console.log(data);
    } catch (e) {}
  };

  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" value={form.email} onChange={changeHandler} />
        <Form.Text className="text-muted">Well never share your email with anyone else.</Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={changeHandler}
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={loginHandler} disabled={loading}>
        Login
      </Button>
    </Form>
  );
};

export default Authorization;
