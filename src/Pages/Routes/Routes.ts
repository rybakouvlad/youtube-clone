import { ComponentType } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Home } from 'Pages/Home';
import { Content } from 'Pages/Content';
import { Youtube } from 'Pages/Youtube';
import { Auth } from 'Pages/Auth';
interface Route {
  link: string;
  title: string;
  component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
}

export const Pages: Array<Route> = [
  {
    link: '/',
    title: 'Home',
    component: Home,
  },
  {
    link: '/content',
    title: 'Lives',
    component: Content,
  },
  {
    link: '/auth',
    title: 'Login',
    component: Auth,
  },
  {
    link: '/send',
    title: 'Youtube',
    component: Youtube,
  },
];
