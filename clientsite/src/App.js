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

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgetPassword' element={<ForgetPass />}/>
          <Route path='/reset/:verificationtoken/:id' element={<ResetPass />}/>
          <Route path='/doctorDetails' element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App