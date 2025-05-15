import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    // Show a loading indicator or placeholder while checking authentication
    return <div>Loading...</div>; // You can replace this with a spinner or skeleton screen
  }

  // If user is not authenticated, redirect to login page
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
