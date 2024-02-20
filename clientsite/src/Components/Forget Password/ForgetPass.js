import React from "react";
import { Link } from "react-router-dom";
import image3 from "../assets/Forget_pass.svg";
import "./forgetPass.css";

const ForgetPass = () => {
  return (
    <div className="register">
      <div className="register-box">
        <div className="register-row">
          <div className="register-col1">
            <img src={image3} className="login-img" />
          </div>
          <div className="register-col2">
            <div className="register-form-part">
              <h1 className="forget-text">Forgot Your Password ?</h1>
              <form className="register-form" style={{ marginTop: "3vh" }}>
                <input placeholder="Email Address" name="email" type="email" />
              </form>
              <button className="register-button">Submit</button>
              <p className="extra-text">
                Go back to Login?
                <Link to="/doctorlogin"> Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPass;
