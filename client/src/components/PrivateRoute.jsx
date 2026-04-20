import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = false; // temporary – you will replace with real auth logic
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;