import { createContext } from 'react';
// import { useAuth } from '../hooks/auth.hook';
// eslint-disable-next-line @typescript-eslint/no-empty-function
// const { login, logout } = useAuth();

// interface IAuth {
//   token: string;
//   userId: string;
//   login: any;
//   logout: any;
//   isAuthenticated: false;
// }

export const AuthContext = createContext(null);
