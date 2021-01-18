import { Nav } from 'react-bootstrap';
import React from 'react';

import { Pages } from 'Pages/Routes/Routes';

export const LogInButton = () => {
  const login = Pages.find((el) => el.title === 'Login');
  console.log(login);

  return <Nav.Link href="/auth">Login</Nav.Link>;
};
