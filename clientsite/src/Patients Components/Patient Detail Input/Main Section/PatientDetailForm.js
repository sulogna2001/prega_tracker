import React from "react";
import NavbarAll from "../../../Components/Navbar/Navbar";
import Patient1 from "../../../Components/assets/Patients1.svg";
import Patient2 from "../../../Components/assets/Patients2.svg";
import Patient3 from "../../../Components/assets/Patients3.svg";
import "./PatientDetailForm.css";
import PatientForm from "../FormFillup/PatientForm";

const PatientDetailForm = () => {
  return (
    <div>
      <NavbarAll />
      <div className="doctor-image">
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <img
                src={Patient1}
                alt="doctorimg"
                className="laptop-view-only"
              />
            </div>
            <div className="col-sm">
              <img
                src={Patient2}
                alt="doctorimg"
                className="laptop-view-only"
              />
            </div>
            <div className="col-sm">
              <img src={Patient3} alt="doctorimg" />
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Text section */}
      <div className="patient-welcome">
        <div className="welcome-section">
          <h1>Welcome to PregBuddy, Patient🤰🏻</h1>
          <p>
            Thank You for choosing us and cooperating with us. We will try our
            best to be at your services. Also we assure you, we have the best
            and the most trusted Doctors with us.
          </p>
          <br />
          <h5>Let's fill some details before moving on to the next step</h5>
        </div>
      </div>

      <PatientForm />
    </div>
  );
};

export default PatientDetailForm;
