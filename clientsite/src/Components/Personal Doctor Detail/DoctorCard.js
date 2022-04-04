import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DoctorDetailImage from "../assets/DoctorDetail.svg";
import DoctorProfileImage from "../assets/DoctorProfile.svg";

export const DoctorCard = ({doc}) => {
  return (
    <div>
      {" "}
      <div className="landing-section">
        <Container>
          <Row>
            <Col>
              <img src={DoctorDetailImage} />
            </Col>
            <Col>
              <h1>
                Hi, I am Doctor {doc.name} and these are some details about me
                which you should know before moving forward.
              </h1>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="personalDetail-form">
        <h3>Personal Details</h3>
        <Container>
          <Row>
            <Col sm={4}>
              <img src={DoctorProfileImage} />
            </Col>
            <Col sm={8} className="personalDetails">
              <p>Name - {doc.name}</p>
              <p>Email - {doc.email}</p>
              <p>Phone Number - {doc.phone}</p>
              <p>Time Slot- 10am till 2pm</p>
              <p>Description - {doc.desc}</p>
              <p>Fees - ₹1000</p>
              <p>Country - {doc.country}</p>
              <p>Region - {doc.city}</p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
