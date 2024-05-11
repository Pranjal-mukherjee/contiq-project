import React from 'react';
import { Navigate } from 'react-router-dom';

interface AuthRouteProps {
  children: React.ReactNode;
}

function AuthRoute({ children }: AuthRouteProps) {
  const isAuthenticated = localStorage.getItem('user');

  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
}

export default AuthRoute;
