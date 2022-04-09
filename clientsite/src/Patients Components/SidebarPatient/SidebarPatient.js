import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const SidebarPatient = () => {
  const { signOutPatient } = useAuth();

  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-top">
          <Link to="/patientdashboard">
            <h5>Overview</h5>
          </Link>
          <Link to="/patientdetailForm">
            <h5>User Profile</h5>
          </Link>
          <Link to="/doctors">
            <h5>Doctor Lists</h5>
          </Link>
          <Link to="/patientappointment">
            <h5>Appointments</h5>
          </Link>
          <Link to="/patientchat">
            <h5>Chats</h5>
          </Link>
          <Link to="/notificationpatient">
            <h5>Notification</h5>
          </Link>

          <h5 style={{color:'#845ec2'}} onClick={signOutPatient}>Logout</h5>
        </div>
      </div>
    </div>
  );
};

export default SidebarPatient;
