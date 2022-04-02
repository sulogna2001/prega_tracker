import React, { useState } from 'react'
import './Register.css'
import { Link } from 'react-router-dom'
import image1 from '../assets/Doctor_register.svg'
import { Icon } from 'react-icons-kit'
import { eye } from 'react-icons-kit/feather/eye'
import { eyeOff } from 'react-icons-kit/feather/eyeOff'

const Register = () => {
  const [type, setType] = useState('password')
  const [icon, setIcon] = useState(eyeOff)

  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eye)
      setType('text')
    }

    else {
      setIcon(eyeOff)
      setType('password')
    }
  }

  return (
    <div className='register'>
      <div className='register-box'>
        <div className='register-row'>
          <div className='register-col1'>
            <img src={image1} className='register-img' />
            <h1 className='doctor-text'>Welcome Doctors</h1>
          </div>
          <div className='register-col2'>
            <div className='register-form-part'>
              <h1>Let's Get Started</h1>
              <form className='register-form'>
                <input
                  placeholder='Name'
                  name='name'
                  type='text'
                />
                <input
                  placeholder='Email Address'
                  name='email'
                  type='email'
                />
                <div className='pass-section'>
                  <input
                    placeholder='Password'
                    name='password'
                    type={type}
                  />
                  <span onClick={handleToggle} className='pass-icon'><Icon icon={icon} size={20} /></span>
                </div>
                <div className='conpass-section'>
                  <input
                    placeholder='Confirm Password'
                    name='confirm password'
                    type={type}
                  />
                  <span onClick={handleToggle} className='conpass-icon'><Icon icon={icon} size={20} /></span>
                </div>
                <input
                  placeholder='Phone Number'
                  name='phone number'
                  type='text'
                />
              </form>
              <button className='register-button'>Register</button>
              <p className='extra-text'>Already have an account?
                <Link to="/login"> Log in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register