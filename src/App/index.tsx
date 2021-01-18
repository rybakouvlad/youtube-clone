import React, { useState } from 'react';
import { useAuth } from '../Pages/Auth/hooks/auth.hook';
import { AuthContext } from '../Pages/Auth/context/AuthContext';
import { AuthTrue } from '../components/AuthTrue';
import { AuthFalse } from '../components/AuthFalse';
export function App() {
  const { token, login, logout, userId, ready } = useAuth();
  const [isAuthenticated = false] = useState(!!token);
  const auth = !!token;

  console.log(isAuthenticated);
  console.log(auth);
  // const routes = useRoutes(isAuthenticated);
  if (!ready) {
    console.log('loader');
  }
  require('../Styles/styles.scss');
  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        userId,
        isAuthenticated,
      }}
    >
      {auth ? <AuthFalse /> : <AuthTrue />}
    </AuthContext.Provider>
  );
}
