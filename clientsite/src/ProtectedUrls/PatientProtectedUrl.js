import React from "react";
import { Navigate } from "react-router-dom";

const PatientProtectedRoute = ({ children }) => {
  const token = window.localStorage.getItem("patientToken");

  return token ? (
    children
  ) : (
    <Navigate
      to={{
        pathname: "/patientLogin",
      }}
    />
  );
};

export default PatientProtectedRoute;
