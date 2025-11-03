// src/Components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // Check if user data exists in localStorage
  const user = localStorage.getItem('user');

  // If no user, redirect to login page
  if (!user) {
    return <Navigate to="/user/login" replace />;
  }

  // Else render the requested component
  return children;
}
