import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { Pages } from 'Pages/Routes/authFalse';
import { LogoutButton } from './LogoutButton';

export const AuthFalse = () => {
  console.log('kuku');

  return (
    <React.Fragment>
      <div className="menu">
        {Pages.map((page, index) => (
          <Link to={page.link} key={index}>
            {page.title}
          </Link>
        ))}
        <LogoutButton />
      </div>

      <Switch>
        {Pages.map((page, index) => (
          <Route exact path={page.link} component={page.component} key={index} />
        ))}
      </Switch>
    </React.Fragment>
  );
};
