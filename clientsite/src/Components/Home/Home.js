import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import image4 from "../assets/Home.svg";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  const patientToken = window.localStorage.getItem("patientToken");

  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    if (token) navigate("/doctordetails");
    if (patientToken) navigate("/patientdetails");
  });

  return (
    <div>
      <div className="register">
        <div className="register-box">
          <div className="register-row">
            <div className="register-col1">
              <img src={image4} className="register-img" />
            </div>
            <div className="register-col2" style={{ padding: "0px" }}>
              <div className="home-section">
                <h1>Welcome to PregBuddy</h1>
                <p>
                  Pregbuddy is a simple platform to book your appointments and
                  track them. It helps user to track their pregnancy
                  journey.Connection with doctors and appointment bookings are
                  made simpler using pregbuddy.Throughout it will build
                  connection with your doctors.
                </p>
                <div className="home-buttons">
                  <Link to="/doctorRegister">
                    <button>For Doctors</button>
                  </Link>
                  <Link to="/patientRegister">
                    <button>For Patients</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
