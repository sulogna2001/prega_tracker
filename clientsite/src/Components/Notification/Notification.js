import React from "react";
import './notification.css'
import { Chat } from "../chatBot/Chat";
import NavbarAll from "../Navbar/Navbar";
import SideBar from "../OverviewDashboard/SideBar/SideBar";
import SideBarForPhone from "../OverviewDashboard/SideBar/SideBarForPhone";
import Card from 'react-bootstrap/Card'
const Notification = () => {
  return (
    <div>
      <Chat />
      <NavbarAll />

      <div className="container-fluid" style={{ padding: "0" }}>
        <div className="row">
          <div class="col-md-3 ms-sm-auto col-lg-2 ">
            <SideBar />
            <SideBarForPhone />
          </div>
          <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div class=" ">
              <Card >
                <Card.Body>This is some text within a card body.</Card.Body>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Notification;
