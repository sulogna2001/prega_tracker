import React from "react";
import { Link } from "react-router-dom";

const SidebarPatient = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-top">
          <Link to="/patientdashboard">
            <h5>Overview</h5>
          </Link>
          <Link to="/patientdetails">
            <h5>User Profile</h5>
          </Link>
          <Link to="/patientappointment">
            <h5>Appointments</h5>
          </Link>
          <Link to="/chat">
            <h5>Chats</h5>
          </Link>
          <Link to="/">
            <h5>Notification</h5>
          </Link>

          <Link to="/">
            <h5>Logout</h5>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SidebarPatient;
