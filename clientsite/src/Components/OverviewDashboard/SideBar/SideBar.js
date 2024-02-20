import React from "react";
import "./DocSidebar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";

const SideBar = () => {
  const { signOut } = useAuth();
  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-top">
          <Link to="/doctorDashboard">
            <h5>Overview</h5>
          </Link>
          <Link to="/doctordetails">
            <h5>User Profile</h5>
          </Link>
          <Link to="/doctorappointment">
            <h5>Appointments</h5>
          </Link>
          <Link to="/doctorchats">
            <h5>Chats</h5>
          </Link>
          <Link to="/notificationdoctor">
            <h5>Notification</h5>
          </Link>

          <h5 onClick={signOut} style={{ color: "#845ec2" }}>
            Logout
          </h5>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
