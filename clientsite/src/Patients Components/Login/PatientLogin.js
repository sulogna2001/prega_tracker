import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import image2 from '../../Components/assets/Patient_login.svg'
import { Icon } from 'react-icons-kit'
import { eye } from 'react-icons-kit/feather/eye'
import { eyeOff } from 'react-icons-kit/feather/eyeOff'
import "./PatientLogin.css"

const PatientLogin = () => {
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
        <div>
            <div className='register'>
                <div className='register-box'>
                    <div className='register-row'>
                        <div className='register-col1'>
                            <img src={image2} className='login-img' />
                        </div>
                        <div className='register-col2'>
                            <div className='register-form-part'>
                                <h1 className='login-text'>Login to your Account</h1>
                                <form className='register-form'>
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
                                </form>
                                <p className='extra-text'>
                                    <Link to="/patientForgetPass">Forget Password ?</Link>
                                </p>
                                <button className='register-button'>Login</button>
                                <p className='extra-text'>Don't have an account?
                                    <Link to="/patientRegister"> Register</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientLogin