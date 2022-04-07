import React from "react";
import { Chat } from "../../Components/chatBot/Chat";
import NavbarAll from "../../Components/Navbar/Navbar";
import SidebarPatientForPhone from "../SidebarPatient/SidebarPatientForPhone";
import SidebarPatient from "../SidebarPatient/SidebarPatient";
import Dashboard from "./Dashboard";

export const DashboardPatient = () => {
  return (
    <div>
      <Chat />
      <NavbarAll />

      <div className="container-fluid" style={{padding:'0'}}>
        <div className="row">
          <div class="col-md-3 ms-sm-auto col-lg-2 " >
            <SidebarPatient />
            <SidebarPatientForPhone />
          </div>
          <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 ">
             <Dashboard/>
            </div>
          </main>
        </div>
      </div>
    </div>
  
  );
};
