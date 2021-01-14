import { Button } from 'react-bootstrap';
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
  return (
    <Button variant="outline-primary" onClick={logoutHandler}>
      logout
    </Button>
  );
};
