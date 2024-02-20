import React from "react";
import "./dashboard.css";
import WelcomeDoctor from "./Welcome Doctor/WelcomeDoctor";
import FormFillup from "./FormFillup/FormFillup";
import Image1 from ".././assets/Doctors1.svg";
import Image2 from ".././assets/Doctors2.svg";
import Image3 from ".././assets/Doctors3.svg";
import NavbarAll from "../Navbar/Navbar";

const Dashboard = () => {
  return (
    <div className="doc-dashboard">
      <NavbarAll />
      <div className="doctor-image">
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <img src={Image1} alt="doctorimg" />
            </div>
            <div className="col-sm">
              <img src={Image3} alt="doctorimg" className="laptop-view-only" />
            </div>
            <div className="col-sm">
              <img src={Image2} alt="doctorimg" className="laptop-view-only" />
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
