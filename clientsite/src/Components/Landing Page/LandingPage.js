import React from 'react'
import NavbarAll from '../Navbar/Navbar'
import './LandingPage.css'
import landingImage from '../assets/landing.svg'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/esm/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBedPulse } from '@fortawesome/free-solid-svg-icons'
import { Chat } from '../chatBot/Chat'

const LandingPage = () => {
    return (
        <div>
       
            <Chat/>
            <NavbarAll />
            <div className='landing-section'>
                <Container>
                    <Row>
                        <Col>
                            <h1>Serving Your Health is our First Priority.</h1>
                            <Link to="/home"><button className='landing-button'>Get Started</button></Link>
                        </Col>
                        <Col>
                            <img src={landingImage} />
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className='services-section'>
                <h1>Health Services for You</h1>
                <p>We are always here to listening and understandings</p>
                <div className='services-cards'>
                    <Container>
                        <Row>
                            <Col>
                                <Card>
                                    <FontAwesomeIcon icon={faBedPulse} className="services-icon" />
                                    <Card.Body>
                                        <Card.Title>01</Card.Title>
                                        <Card.Text>
                                            Solving problems related to pregnancy. Have conversation
                                            with your doctor and solve all kinds of problems you are facing.
                                            All the doctors are trusted and professional.
                                        </Card.Text>
                                        
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <FontAwesomeIcon icon={faBedPulse} className="services-icon" />
                                    <Card.Body>
                                        <Card.Title>02</Card.Title>
                                        <Card.Text>
                                            Make your own profile either you are a Doctor or a Patient.
                                            Patients can book their doctors and doctors can set their appointment 
                                            with their patients with proper timing.
                                        </Card.Text>
                                        
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <FontAwesomeIcon icon={faBedPulse} className="services-icon" />
                                    <Card.Body>
                                        <Card.Title>03</Card.Title>
                                        <Card.Text>
                                           Patients can track their prgnancy data. Customization of data
                                           is also possible. Also the patient and doctor can check each others profile
                                           for any kind of clarification.
                                        </Card.Text>
                                        
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
    )
}

export default LandingPage