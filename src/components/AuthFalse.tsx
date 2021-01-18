import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Pages } from 'Pages/Routes/authFalse';
import { LogoutButton } from './LogoutButton';
import { Form, Nav, Navbar } from 'react-bootstrap';

export const AuthFalse = () => {
  console.log('kuku');

  return (
    <React.Fragment>
      <Navbar bg="dark" variant="dark">
        <Nav className="mr-auto">
          {Pages.map((page, index) => (
            <Nav.Link href={page.link} key={index}>
              {page.title}
            </Nav.Link>
          ))}
        </Nav>
        <Form>
          <LogoutButton />
        </Form>
      </Navbar>
      <Switch>
        {Pages.map((page, index) => (
          <Route exact path={page.link} component={page.component} key={index} />
        ))}
      </Switch>
    </React.Fragment>
  );
};
