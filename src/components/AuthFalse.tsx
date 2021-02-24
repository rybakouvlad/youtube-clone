import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Pages } from 'Pages/Routes/authFalse';
import { LogoutButton } from './LogoutButton';
import { Form, Nav, Navbar } from 'react-bootstrap';
import { Content } from '../Pages/Content';
import { Home } from '../Pages/Home';
import { Profile } from 'Pages/Profile';
import { VideoPage } from 'Pages/VideoPage';
import { Auth } from 'Pages/Auth';
import { Player } from 'Pages/Player';
import { Youtube } from 'Pages/Youtube';

import style from '../Styles/styles.scss';
export const AuthFalse: FC = () => {
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
      <section className={style.main}>
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
          <Route path="/player">
            <Player />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/auth">
            <Auth />
          </Route>
          <Route path="/send">
            <Youtube />
          </Route>
        </Switch>
      </section>
    </React.Fragment>
  );
};
