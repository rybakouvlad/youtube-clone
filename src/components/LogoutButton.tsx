import { Nav } from 'react-bootstrap';
import React, { useContext } from 'react';
import { AuthContext } from '../Pages/Auth/context/AuthContext';

export const LogoutButton = () => {
  const auth = useContext(AuthContext);

  const logoutHandler = async () => {
    try {
      //   const data = await request('/api/login', 'POST', { ...form });
      auth.logout();
      //   console.log(data);
    } catch (e) {}
  };
  return <Nav.Link onClick={logoutHandler}>logout</Nav.Link>;
};
