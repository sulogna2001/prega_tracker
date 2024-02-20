import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import image4 from "../assets/Home.svg";
import { useNavigate } from "react-router-dom";
import "./home.css";
import { parseJwt } from "../../App";

const Home = () => {
  const patientToken = window.localStorage.getItem("patientToken");

  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    const decodeJwt = parseJwt(patientToken);
    if (token) navigate("/doctordetails");
    if (patientToken) navigate(`/patientdetailForm`);
  }, []);

  return (
    <div className="home_container">
      <div className="register-box">
        <div className="register-row">
          <div className="register-col1">
            <img src={image4} className="register-img" />
          </div>
          <div className="register-col2" style={{ padding: "0px" }}>
            <div className="home-section">
              <h1>Welcome to PregBuddy</h1>
              <p>
                Your trusted companion on the incredible journey of pregnancy! Navigating the path to motherhood should be a joyful experience, and at PregBuddy, we're here to make it even more special.

                PregBuddy is your go-to platform for seamlessly booking appointments tailored to the needs of expectant mothers. We understand that each pregnancy is unique, and our mission is to provide you with a hassle-free way to connect with experienced healthcare professionals who specialize in prenatal care.

                Our user-friendly platform empowers you to effortlessly schedule and manage your appointments, whether you're looking for routine check-ups, ultrasounds, or specialized consultations. Say goodbye to the stress of coordinating your prenatal care and embrace the excitement of this transformative time.

                With PregBuddy, you're not just booking appointments; you're joining a supportive community dedicated to your well-being and the health of your little one. Take charge of your pregnancy journey, and let PregBuddy be your trusted ally every step of the way.

                Welcome to PregBuddy, where we prioritize your comfort, health, and the joy that comes with the anticipation of new life. Start your journey with us, and let PregBuddy make your pregnancy experience as smooth and delightful as possible.
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
  );
};

export default Home;
