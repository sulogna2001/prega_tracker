import React, { useState, useEffect } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import image1 from "../assets/Doctor_register.svg";
import { Icon } from "react-icons-kit";
import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import Alert from "@mui/material/Alert";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const { Doctor_signUp } = useAuth();

  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    if (token) navigate("/doctordetails");
  });

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [phone, setphone] = useState("");

  const [nameFormError, setnameFormError] = useState(false);
  const [emailFormError, setemailFormError] = useState(false);
  const [passwordFormError, setpasswordFormError] = useState(false);
  const [passwordMatchError, setpasswordMatchError] = useState(false);
  const [mobileFormError, setmobileFormError] = useState(false);

  const [formError, setformError] = useState(false);

  const regexpattern = {
    // eslint-disable-next-line
    email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/i,
    name: /^([a-z]){5,20}$/i,
    password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    phone: /^(\+\d{1,3}[- ]?)?\d{10}$/,
  };

  const handleSubmit = (e) => {
    setformError(false);
    e.preventDefault();
    const body = {
      name,
      email,
      password,
      phone,
    };

    // Validations

    if (regexpattern.name.test(name) === false || name === "") {
      setnameFormError(true);
      setformError(true);
      return;
    } else if (regexpattern.email.test(email) === false || email === "") {
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
    } else if (password !== confirmpassword || confirmpassword === "") {
      setpasswordMatchError(true);
      setformError(true);
      return;
    } else if (regexpattern.phone.test(phone) === false || phone === "") {
      setmobileFormError(true);
      setformError(false);
      return;
    }

    if (formError === false) {
      Doctor_signUp(body);
      setname("");
      setemail("");
      setpassword("");
      setconfirmpassword("");
      setphone("");
    }
  };

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
    <div className="register">
      <div className="register-box">
        <div className="register-row">
          <div className="register-col1">
            <img src={image1} className="register-img" />
            <h1 className="doctor-text">Welcome Doctors</h1>
          </div>
          <div className="register-col2">
            <div className="register-form-part">
              <h1>Let's Get Started</h1>
              <form className="register-form" onSubmit={handleSubmit}>
                <input
                  placeholder="Name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setname(e.target.value);
                    setnameFormError(false);
                    setformError(false);
                  }}
                  autocomplete="off"
                />
                {nameFormError && (
                  <Alert
                    severity="error"
                    style={{
                      marginBottom: "5%",
                      width: "75%",
                    }}
                  >
                    Enter A Valid Name
                  </Alert>
                )}
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
                  autocomplete="off"
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
                <div className="conpass-section">
                  <input
                    placeholder="Confirm Password"
                    name="confirm password"
                    type={type}
                    value={confirmpassword}
                    onChange={(e) => {
                      setconfirmpassword(e.target.value);
                      setpasswordMatchError(false);
                      setformError(false);
                    }}
                  />
                  <span onClick={handleToggle} className="conpass-icon">
                    <Icon icon={icon} size={20} />
                  </span>
                </div>
                {passwordMatchError && (
                  <Alert
                    severity="error"
                    style={{
                      marginBottom: "5%",
                      width: "75%",
                    }}
                  >
                    Password should Match
                  </Alert>
                )}
                <input
                  placeholder="Phone Number"
                  name="phone number"
                  type="text"
                  value={phone}
                  onChange={(e) => {
                    setphone(e.target.value);
                    setmobileFormError(false);
                    setformError(false);
                  }}
                  autoComplete="off"
                />
                {mobileFormError && (
                  <Alert
                    severity="error"
                    style={{
                      marginBottom: "5%",
                      width: "75%",
                    }}
                  >
                    Enter a Valid MobileNumber
                  </Alert>
                )}
                <button type="submit" className="register-button">
                  Register
                </button>
              </form>

              <p className="extra-text">
                Already have an account?
                <Link to="/doctorlogin"> Log in</Link>
              </p>
              <div
                style={{
                  width: "80%",
                  height: "12px",
                  borderBottom: "1px solid #707070",
                  textAlign: "center",
                  marginBottom: "5%",
                  marginTop: "1%",
                }}
              >
                <span
                  style={{
                    fontSize: "20px",
                    backgroundColor: "white",
                    padding: "0 30px",
                  }}
                >
                  Or{" "}
                </span>{" "}
              </div>
              <Link to="/home">
                <button
                  type="button"
                  className="register-button"
                  style={{ marginBottom: "2%" }}
                >
                  Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
