import React from 'react'
import Register from './Components/Register/Register'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './Components/Login/Login';
import ForgetPass from './Components/Forget Password/ForgetPass';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='forgetPassword' element={<ForgetPass />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App