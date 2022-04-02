import React from 'react'
import NavbarAll from '../Navbar/Navbar'
import './LandingPage.css'
import landingImage from '../assets/landing.svg'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const LandingPage = () => {
    return (
        <div>
            <NavbarAll />
            <Container>
                <Row>
                    <Col>1 of 2</Col>
                    <Col>
                        <img src={landingImage} />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default LandingPage