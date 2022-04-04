import React from 'react'
import NavbarAll from '../Navbar/Navbar'
import './DoctorDetails.css'
import DoctorDetailImage from '../assets/DoctorDetail.svg'
import DoctorProfileImage from '../assets/DoctorProfile.svg'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const DoctorDetails = () => {
    return (
        <div>
            <NavbarAll />
            <div className='details-section'>
                <div className='landing-section'>
                    <Container>
                        <Row>
                            <Col>
                                <img src={DoctorDetailImage} />
                            </Col>
                            <Col>
                                <h1>Hi, I am Doctor Sagnik Pal and
                                    these are some details about me which you should know before moving forward.</h1>
                            </Col>
                        </Row>
                    </Container>
                </div>


                <div className='personalDetail-form'>
                    <h3>Personal Details</h3>
                    <Container>
                        <Row>
                            <Col sm={4}>
                                <img src={DoctorProfileImage}/>
                            </Col>
                            <Col sm={8} className="personalDetails">
                                <p>Name - Sagnik Pal</p>
                                <p>Email - sagnikpal22@gmail.com</p>
                                <p>Phone Number - 8670443212</p>
                                <p>Time Slot- 10am till 2pm</p>
                                <p>Description - There are many variations of passages of 
                                    Lorem Ipsum available, but the majority have suffered 
                                    alteration in some form, by injected humour, or 
                                    randomised words which don't look even slightly 
                                    believable. If you are going to use a passage of Lorem 
                                    Ipsum, you need to be sure there isn't anything 
                                    embarrassing hidden in the middle of text.</p>
                                <p>Fees - ₹1000</p>
                                <p>Country - India</p>
                                <p>Region - West Bengal</p>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
    )
}

export default DoctorDetails