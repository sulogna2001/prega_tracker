import React, { useEffect } from "react";
import Register from "./Components/Register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import ForgetPass from "./Components/Forget Password/ForgetPass";
import Dashboard from "./Components/Dashboard for Doctor/Dashboard";
import ResetPass from "./Components/Forget Password/ResetPass";
import Home from "./Components/Home/Home";
import Overview from "./Components/OverviewDashboard/Overview/Overview";
import LandingPage from "./Components/Landing Page/LandingPage";
import PatientRegister from "./Patients Components/Register/PatientRegister";
import PatientLogin from "./Patients Components/Login/PatientLogin";
import PatientForgetPass from "./Patients Components/ForgetPassword/PatientForgetPass";
import PatientResetPass from "./Patients Components/ForgetPassword/PatientResetPass";
import { DashboardPatient } from "./Patients Components/PatientDashboard/DashboardPatient";
import NotificationPatient from "./Components/NotificationPatient/NotificationPatient";
import NotificationDoctor from "./Components/NotificationDoctor/NotificationDoctor";
import AuthContextProvider from "./Context/AuthContext";
import DoctorDetails from "./Components/Personal Doctor Detail/DoctorDetails";
import PatientDetail from "./Patients Components/Detail of a Patient/PatientDetail";
import PatientDetailForm from "./Patients Components/Patient Detail Input/Main Section/PatientDetailForm";
import { Doctors } from "./Patients Components/DoctorsList/Doctors";
import DoctorInfoContextProvider from "./Context/DoctorInfoContext";
import AppointmentCards from "./Components/Appointments/AppointmentCards";
import Appointments from "./Patients Components/PatientAppointments/Appointments";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedUrls/DoctorProtectedUrl";
import PatientProtectedRoute from "./ProtectedUrls/PatientProtectedUrl";

import PatientInfoContextProvider from "./Context/PatientInfoContext";
import Chat from './Components/Chat/Chat'

const App = () => {
  const token = window.localStorage.getItem("token");
  const patientToken = window.localStorage.getItem("patientToken");
  const navigate = useNavigate();

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    if (token) {
      const decodeJwt = parseJwt(token);
      console.log(decodeJwt);
      if (decodeJwt.exp * 1000 < Date.now()) {
        console.log("Exxp");

        localStorage.removeItem("token");
        navigate("/doctorlogin");
      }
    }
    if (patientToken) {
      const decodeJwt = parseJwt(patientToken);
      console.log(decodeJwt);
      if (decodeJwt.exp * 1000 < Date.now()) {
        console.log("Exxp");

        localStorage.removeItem("patientToken");
        navigate("/patientLogin");
      }
    }
  });

  return (
    <AuthContextProvider>
    <PatientInfoContextProvider>
      
    <DoctorInfoContextProvider>
      <Routes>
        {/* //For Doctors */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/doctorRegister" element={<Register />} />
        <Route path="/doctorlogin" element={<Login />} />
        <Route path="/forgetPassword" element={<ForgetPass />} />
        <Route path="/reset/:verificationtoken/:id" element={<ResetPass />} />
        <Route
          path="/doctorDetails"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctorDashboard"
          element={
            <ProtectedRoute>
              <Overview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/:id"
          element={
            <PatientProtectedRoute>
              <DoctorDetails />
            </PatientProtectedRoute>
          }
        />
        <Route
          path="/doctorappointment"
          element={
            <ProtectedRoute>
              <AppointmentCards />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notificationpatient"
          element={
            <PatientProtectedRoute>
              <NotificationPatient />
            </PatientProtectedRoute>
          }
        />
        <Route
          path="/notificationdoctor"
          element={
            <ProtectedRoute>
              <NotificationDoctor />
            </ProtectedRoute>
          }
        />

        {/* //For Patients */}
        <Route path="/patientRegister" element={<PatientRegister />} />
        <Route path="/patientLogin" element={<PatientLogin />} />
        <Route path="/patientForgetPass" element={<PatientForgetPass />} />
        <Route path="/patientResetPass" element={<PatientResetPass />} />
        <Route
          path="/patientdashboard"
          element={
            <PatientProtectedRoute>
              <DashboardPatient />
            </PatientProtectedRoute>
          }
        />
        <Route
          path="/patientdetailForm"
          element={
            <PatientProtectedRoute>
              <PatientDetailForm />
            </PatientProtectedRoute>
          }
        />
        <Route
          path="/patientdetails/:id"
          element={
            <ProtectedRoute>
              <PatientDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctors"
          element={
            <PatientProtectedRoute>
              <Doctors />
            </PatientProtectedRoute>
          }
        />
        <Route
          path="/patientappointment"
          element={
            <PatientProtectedRoute>
              <Appointments />
            </PatientProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
             <Chat/>
          }
        />
        <Route
          path="/patientreset/:verificationtoken/:id"
          element={<PatientResetPass />}
        />
      </Routes>
    </DoctorInfoContextProvider>
    </PatientInfoContextProvider>
    
  </AuthContextProvider>
  );
};

export default App;
