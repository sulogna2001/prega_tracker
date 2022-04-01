import React from 'react'
import './dashboard.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUserDoctor} from '@fortawesome/free-solid-svg-icons'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import WelcomeDoctor from './Welcome Doctor/WelcomeDoctor'
import FormFillup from './FormFillup/FormFillup'

const Dashboard = () => {
  return (
    <div className='doc-dashboard'>
      <Navbar className='dashboard-navbar'>
        <Container>
          <Navbar.Brand href="#home">Logo with pic</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <FontAwesomeIcon icon={faUserDoctor} />
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className='doctor-image'>
        <img src={require('../assets/doctor.png')}/>
      </div>
      <WelcomeDoctor />
      <FormFillup />
    </div>
  )
}

export default Dashboard