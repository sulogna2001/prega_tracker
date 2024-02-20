import React from "react";
import NavbarAll from "../Navbar/Navbar";
import "./LandingPage.css";
import landingImage from "../assets/landing.svg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBedPulse } from "@fortawesome/free-solid-svg-icons";

const LandingPage = () => {
  return (
    <div>
      <NavbarAll />
      <div className="landing-section">
        <Container>
          <Row>
            <Col>
              <h1>Serving Your Health is our First Priority.</h1>
              <Link to="/home">
                <button className="landing-button">Get Started</button>
              </Link>
            </Col>
            <Col>
              <img src={landingImage} />
            </Col>
          </Row>
        </Container>
      </div>
      <div className="services-section">
        <h1>Health Services for You</h1>
        <p>We are always here to listening and understandings</p>
        <div className="services-cards">
          <Container>
            <Row>
              <Col className="coloumn_cards">
                <Card>
                  <FontAwesomeIcon
                    icon={faBedPulse}
                    className="services-icon"
                  />
                  <Card.Body>
                    <Card.Title>01</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col className="coloumn_cards">
                <Card>
                  <FontAwesomeIcon
                    icon={faBedPulse}
                    className="services-icon"
                  />
                  <Card.Body>
                    <Card.Title>02</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col className="coloumn_cards">
                <Card>
                  <FontAwesomeIcon
                    icon={faBedPulse}
                    className="services-icon"
                  />
                  <Card.Body>
                    <Card.Title>03</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
