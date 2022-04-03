import React from 'react'
import { Link } from 'react-router-dom'
import image4 from '../assets/Home.svg'
import './home.css'

const Home = () => {
    return (
        <div>
            <div className='register'>
                <div className='register-box'>
                    <div className='register-row'>
                        <div className='register-col1'>
                            <img src={image4} className='register-img' />
                        </div>
                        <div className='register-col2' style={{padding: "0px"}}>
                            <div className='home-section'>
                                <h1>Welcome to PregBuddy</h1>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                    when an unknown printer took a galley of type and scrambled it to make a type 
                                    specimen book. It has survived not only five centuries, but also the leap into 
                                    electronic typesetting, remaining essentially unchanged.
                                </p>
                                <div className='home-buttons'>
                                    <Link to="/doctorRegister"><button>For Doctors</button></Link>
                                    <Link to="/patientRegister"><button>For Patients</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home