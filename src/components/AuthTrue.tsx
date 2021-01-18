import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Pages } from 'Pages/Routes/Routes';
import { Form, Nav, Navbar } from 'react-bootstrap';
import { LogInButton } from './LogInButton';
export const AuthTrue = () => {
  return (
    <React.Fragment>
      <Navbar bg="dark" variant="dark">
        <Nav className="mr-auto">
          {Pages.map((page, index) =>
            page.title !== 'Login' ? (
              <Nav.Link href={page.link} key={index}>
                {page.title}
              </Nav.Link>
            ) : null,
          )}
        </Nav>
        <Form inline>
          <LogInButton />
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
