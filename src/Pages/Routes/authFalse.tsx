import { ComponentType } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Home } from 'Pages/Home';
import { Content } from 'Pages/Content';
import { Profile } from 'Pages/Profile';
import { Youtube } from 'Pages/Youtube';
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
    link: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    link: '/send',
    title: 'MP4toRTMP',
    component: Youtube,
  },
];
