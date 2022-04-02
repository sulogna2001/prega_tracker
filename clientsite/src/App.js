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

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/home' element={<Home />} />
          <Route path='/doctorRegister' element={<Register />} />
          <Route path='/doctorlogin' element={<Login />} />
          <Route path='/forgetPassword' element={<ForgetPass />}/>
          <Route path='/reset/:verificationtoken/:id' element={<ResetPass />}/>
          <Route path='/doctorDetails' element={<Dashboard/>} />
          <Route path='/doctorDashboard' element={<Overview />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App