import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Pages } from 'Pages/Routes/authFalse';
import { LogoutButton } from './LogoutButton';
import { Form, Nav, Navbar } from 'react-bootstrap';
import { Content } from '../Pages/Content';
import { Home } from '../Pages/Home';
import { Profile } from 'Pages/Profile';
import { VideoPage } from 'Pages/VideoPage';
import { Auth } from 'Pages/Auth';
export const AuthFalse = () => {
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
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/video">
          <VideoPage />
        </Route>
        <Route path="/content">
          <Content />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
      </Switch>
    </React.Fragment>
  );
};
