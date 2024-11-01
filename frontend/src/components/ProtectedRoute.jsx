// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('accessToken') !== null;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;