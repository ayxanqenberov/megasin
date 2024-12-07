import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.admin);

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default ProtectedRoute;
