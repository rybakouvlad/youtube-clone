import { ComponentType } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Home } from 'Pages/Home';
import { Content } from 'Pages/Content';
import { Player } from 'Pages/Player';
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
    title: 'Content',
    component: Content,
  },
  {
    link: '/player',
    title: 'Player',
    component: Player,
  },
  {
    link: '/auth',
    title: 'Auth',
    component: Auth,
  },
];
