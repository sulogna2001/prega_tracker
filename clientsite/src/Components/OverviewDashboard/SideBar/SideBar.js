import React from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";

const SideBar = () => {
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
          <Link to="/">
            <h5>Appointments</h5>
          </Link>
          <Link to="/">
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

export default SideBar;
