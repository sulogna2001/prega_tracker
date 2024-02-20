import React, { useState } from "react";
import { Link } from "react-router-dom";
import image3 from "../../Components/assets/Forget_pass.svg";
import { Icon } from "react-icons-kit";
import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";

const PatientResetPass = () => {
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
    <div className="register">
      <div className="register-box">
        <div className="register-row">
          <div className="register-col1">
            <img src={image3} className="login-img" />
          </div>
          <div className="register-col2">
            <div className="register-form-part">
              <h1 className="forget-text">Reset Your Password </h1>
              <form className="register-form" style={{ marginTop: "3vh" }}>
                <div className="pass-section">
                  <input
                    placeholder="New Password"
                    name="new password"
                    type={type}
                  />
                  <span onClick={handleToggle} className="pass-icon">
                    <Icon icon={icon} size={20} />
                  </span>
                </div>
                <div className="conpass-section">
                  <input
                    placeholder="Confirm Password"
                    name="confirm password"
                    type={type}
                  />
                  <span onClick={handleToggle} className="conpass-icon">
                    <Icon icon={icon} size={20} />
                  </span>
                </div>
              </form>
              <button className="register-button">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientResetPass;
