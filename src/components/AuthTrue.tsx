import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Pages } from 'Pages/Routes/Routes';
import { Form, Nav, Navbar } from 'react-bootstrap';
import { LogInButton } from './LogInButton';
import { Content } from '../Pages/Content';
import { Home } from '../Pages/Home';
import { Profile } from 'Pages/Profile';
import { VideoPage } from 'Pages/VideoPage';
import { Player } from 'Pages/Player';
import { Auth } from 'Pages/Auth';

export const AuthTrue: FC = () => {
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
      <section className="main">
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
          <Route path="/player">
            <Player />
          </Route>
        </Switch>
        Ï
      </section>
    </React.Fragment>
  );
};
