import React, { useState, useEffect } from "react";
import axios from "axios";
import PatientDetailImage from "../../Components/assets/PatientDetail.svg";
import DoctorProfileImage from "../../Components/assets/DoctorProfile.svg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavbarAll from "../../Components/Navbar/Navbar";
import { usePatientInfo } from "../../Context/PatientInfoContext";
import { api_url } from "../../Urls/Api";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import "./PatientDetail.css";

const PatientDetail = () => {
  const params = useParams();

  console.log(params.id);

  const [getPatientInfo, setPatientInfo] = useState("");

  const token = window.localStorage;

  useEffect(() => {
    axios
      .get(`${api_url}patient/${params.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);

        setPatientInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <NavbarAll />
      <div className="details-section">
        <div className="landing-section">
          <Container>
            <Row>
              <Col>
                <img src={PatientDetailImage} />
              </Col>
              <Col>
                <h1>
                  Hi, I am Patient {getPatientInfo.name} and these are some
                  details about me which you should know before moving forward.
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
                <p>Name - {getPatientInfo.name}</p>
                <p>Email - {getPatientInfo.email}</p>
                <p>Phone Number - {getPatientInfo.phone}</p>
                <p>Trimester - {getPatientInfo.trimester}</p>
                <p>Problems (if any) - {getPatientInfo.problems}</p>
                <p>Country - {getPatientInfo.country}</p>
                <p>Region - {getPatientInfo.city}</p>
              </Col>
            </Row>
          </Container>
        </div>
        <button
          disableElevation
          style={{ padding: "14px", background: "#845ec2", color: "white" }}
          className="submit-button"
        >
          <Link to="/doctorDashboard" className="linkwhite">
            Move To Dashboard
          </Link>
        </button>
      </div>
    </div>
  );
};

export default PatientDetail;
