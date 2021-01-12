import React, { /*  useState, KeyboardEvent, */ useState } from 'react';
// import style from './index.scss';
// import { useMessage } from './hooks/message.hook';
import { useHttp } from './hooks/http.hook';
import { Button, Form /* FormControl */ } from 'react-bootstrap';

// export function Auth() {
//   // const message = useMessage();
// const { loading, request /* , error, clearError  */ } = useHttp();
// const [form /* , setForm */] = useState({
//   email: '',
//   password: '',
// });

//   // const changeHandler = (event: KeyboardEvent) => {
//   //   setForm({ ...form, [event.target.name]: event.target.value });
//   // };
//   const registerHandler = async () => {
//     try {
//       /* const data = */ await request('/register', 'POST', { ...form });
//       // message(data.message);
//     } catch (e) {}
//   };
//   require('./index.scss');
//   console.log(style.form);
//   const ref = React.createRef();
//   state = {
//     value: '',
//   };
// type AuthForm = {
//   email: string;
//   password: string;
// };
export const Auth = () => {
  // const auth = useContext(AuthContext);
  // const message = useMessage();
  const { loading, request /* , error, clearError  */ } = useHttp();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  // useEffect(() => {
  //   message(error);
  //   clearError();
  // }, [error, message, clearError]);

  // useEffect(() => {
  //   window.M.updateTextFields();
  // }, []);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      console.log(form);

      await request('/api/register', 'POST', { ...form });
      // message(data.message);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request('/api/login', 'POST', { ...form });
      // auth.login(data.token, data.userId)
      console.log(data);
    } catch (e) {}
  };

  // const loginHandler = async () => {
  //   try {
  //     const data = await request('/api/auth/login', 'POST', { ...form });
  //     auth.login(data.token, data.userId);
  //   } catch (e) {}
  // };lkk

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
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={registerHandler} disabled={loading}>
        Register
      </Button>
      <Button variant="primary" type="submit" onClick={loginHandler} disabled={loading}>
        Login
      </Button>
    </Form>
  );
};

// export class Auth extends Component<unknown, AuthForm> {
//   http = useHttp;
//   state = {
//     email: '',
//     password: '',
//   };

//   registerHandler = async () => {
//     try {
//       /* const data = */ await request('http://localhost:3000/register', 'POST', this.state);
//       // message(data.message);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   render() {}
// }

export default Auth;
