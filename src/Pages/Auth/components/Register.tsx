import React, {FC, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useHttp} from '../hooks/http.hook';
import {Button, Form, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {ToastComponent} from '../../../components/ToastComponent';

interface ISet {
  changeStatus(status: boolean): void;
}

export const Register: FC<ISet> = (props) => {
  const {loading, request, error, clearError} = useHttp();
  const [form, setForm] = useState({
    email: '',
    password: '',
    login: '',
  });
  const [registeredMessage, setRegisteredMessage] = useState(null);

  useEffect(() => {
    setRegisteredMessage(error);
    // clearError();
  }, [error, clearError]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({...form, [event.target.name]: event.target.value});
  };

  const registerHandler = async () => {
    try {
      console.log(form);

      const data = await request('/api/register', 'POST', {...form});
      console.log(data);
      if (data.message === 'Пользователь создан') {
        props.changeStatus(true);
      }
    } catch (e) {
    }
  };

  return (
    <Form>
      <Form.Group controlId="formBasicLogin">
        <Form.Label>Login</Form.Label>
        <Form.Control type="text" placeholder="Enter login" name="login" value={form.login} onChange={changeHandler}/>
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" value={form.email} onChange={changeHandler}/>
        <Form.Text className="text-muted">Well never share your email with anyone else.</Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <OverlayTrigger
          key="top"
          placement="top"
          overlay={<Tooltip id="tooltip-top">Enter more than 6 symbols.</Tooltip>}
        >
          {/*<Form.Label>Password</Form.Label>*/}
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={changeHandler}
          />
        </OverlayTrigger>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={registerHandler} disabled={loading}>
        Register
      </Button>
      {registeredMessage ? <ToastComponent message={registeredMessage} show={true} /> : null}
      {registeredMessage ? console.log(typeof registeredMessage) : null}
    </Form>
  );
};

Register.propTypes = {
  changeStatus: PropTypes.func,
};

export default Register;
