import React from "react";
import "./dashboard.css";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import WelcomeDoctor from "./Welcome Doctor/WelcomeDoctor";
import FormFillup from "./FormFillup/FormFillup";
import Image1 from ".././assets/Doctors1.svg";
import Image2 from ".././assets/Doctors2.svg";
import Image3 from ".././assets/Doctors3.svg";
import Image4 from "../assets/Logo.png";
import { Typography } from "@material-ui/core";
import { HiUserCircle } from "react-icons/hi";

const Dashboard = () => {
  return (
    <div className="doc-dashboard">
      <Navbar className="dashboard-navbar">
        <Container>
          <Navbar.Brand href="#home">
            <Typography
              style={{
                fontSize: "30px",
                fontFamily: "Luckiest Guy",
                marginLeft: "3vw",
                alignItems: "center",
                justifyContent: "space-around",
                color: "white",
              }}
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              <img src={Image4} alt="doctorimg" width="125px" height="125px" className="logoImg" />{" "}
              <span className="lapi"> PREGBUDDY</span>
            </Typography>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <HiUserCircle size="60px" style={{color:'white'}}/>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="doctor-image">
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <img src={Image1} alt="doctorimg" />
            </div>
            <div className="col-sm">
              <img src={Image3} alt="doctorimg" />
            </div>
            <div className="col-sm">
              <img src={Image2} alt="doctorimg" />
            </div>
          </div>
        </div>
      </div>
      <WelcomeDoctor />
      <FormFillup />
    </div>
  );
};

export default Dashboard;
