import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import image2 from "../../Components/assets/Patient_login.svg";
import { Icon } from "react-icons-kit";
import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import "./PatientLogin.css";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { parseJwt } from "../../App";

const PatientLogin = () => {
  const { Patient_login } = useAuth();
  const navigate = useNavigate();
  const patientToken = window.localStorage.getItem("patientToken");
  useEffect(() => {
    if (patientToken) navigate(`/patientdetailForm`);
  }, []);

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [emailFormError, setemailFormError] = useState(false);
  const [passwordFormError, setpasswordFormError] = useState(false);

  const [formError, setformError] = useState(false);

  const regexpattern = {
    // eslint-disable-next-line
    email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/i,
    userName: /^([a-z]){5,12}$/i,
    password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    phone: /^(\+\d{1,3}[- ]?)?\d{10}$/,
  };

  const handleSubmit = (e) => {
    setformError(false);
    e.preventDefault();
    const body = {
      email,
      password,
    };

    // Validations

    if (regexpattern.email.test(email) === false || email === "") {
      setemailFormError(true);
      setformError(true);
      return;
    } else if (
      regexpattern.password.test(password) === false ||
      password === ""
    ) {
      setpasswordFormError(true);
      setformError(true);
      return;
    }

    if (formError === false) {
      Patient_login(body);
      setemail("");
      setpassword("");
    }
  };

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  return (
    <div>
      <div className="register">
        <div className="register-box">
          <div className="register-row">
            <div className="register-col1">
              <img src={image2} className="login-img" />
            </div>
            <div className="register-col2">
              <div className="register-form-part">
                <h1 className="login-text">Login to your Account</h1>
                <form className="register-form" onSubmit={handleSubmit}>
                  <input
                    placeholder="Email Address"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setemail(e.target.value);
                      setemailFormError(false);
                      setformError(false);
                    }}
                  />
                  {emailFormError && (
                    <Alert
                      severity="error"
                      style={{
                        marginBottom: "5%",
                        width: "75%",
                      }}
                    >
                      Enter A Valid Email
                    </Alert>
                  )}
                  <div className="pass-section">
                    <input
                      placeholder="Password"
                      name="password"
                      type={type}
                      value={password}
                      onChange={(e) => {
                        setpassword(e.target.value);
                        setpasswordFormError(false);
                        setformError(false);
                      }}
                    />
                    <span onClick={handleToggle} className="pass-icon">
                      <Icon icon={icon} size={20} />
                    </span>
                  </div>
                  {passwordFormError && (
                    <Alert
                      severity="error"
                      style={{
                        marginBottom: "5%",
                        width: "75%",
                      }}
                    >
                      Password should be 8 characters,a lowercase,a uppercase, a
                      digit and a special character
                    </Alert>
                  )}
                  <button className="register-button">Login</button>
                </form>
                <p className="extra-text">
                  <Link to="/patientForgetPass">Forget Password ?</Link>
                </p>
                <p className="extra-text">
                  Don't have an account?
                  <Link to="/patientRegister"> Register</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientLogin;
