
import React from "react";
import { Navigate } from "react-router-dom";

const PatientProtectedRoute = ({ children }) => {
   const token = window.localStorage.getItem('token')

  return token ? (
    children
  ) : (
    <Navigate
      to={{
        pathname: "/login",
      }}
    />
  );
};

export default PatientProtectedRoute;