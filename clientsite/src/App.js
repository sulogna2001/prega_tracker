import React from 'react'
import Register from './Components/Register/Register'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './Components/Login/Login';
import ForgetPass from './Components/Forget Password/ForgetPass';
import Dashboard from './Components/Dashboard for Doctor/Dashboard';
import ResetPass from './Components/Forget Password/ResetPass';
import Home from './Components/Home/Home';
import Overview from './Components/OverviewDashboard/Overview/Overview';
import LandingPage from './Components/Landing Page/LandingPage';
import PatientRegister from './Patients Components/Register/PatientRegister';
import PatientLogin from './Patients Components/Login/PatientLogin';
import PatientForgetPass from './Patients Components/ForgetPassword/PatientForgetPass';
import PatientResetPass from './Patients Components/ForgetPassword/PatientResetPass';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          //For Doctors
          <Route path='/' element={<LandingPage/>} />
          <Route path='/home' element={<Home />} />
          <Route path='/doctorRegister' element={<Register />} />
          <Route path='/doctorlogin' element={<Login />} />
          <Route path='/forgetPassword' element={<ForgetPass />}/>
          <Route path='/reset/:verificationtoken/:id' element={<ResetPass />}/>
          <Route path='/doctorDetails' element={<Dashboard/>} />
          <Route path='/doctorDashboard' element={<Overview />} />

          //For Patients
          <Route path='/patientRegister' element={<PatientRegister />} />
          <Route path='/patientLogin' element={<PatientLogin />} />
          <Route path='/patientForgetPass' element={<PatientForgetPass />} />
          <Route path='/patientResetPass' element={<PatientResetPass />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App