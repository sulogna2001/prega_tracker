import React from "react";
import { Chat } from "../../chatBot/Chat";
import NavbarAll from "../../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";
import SideBarForPhone from "../SideBar/SideBarForPhone";
import Home from "./Home";

const Overview = () => {
  return (
    <div>
      <Chat />
      <NavbarAll />

      <div className="container-fluid">
        <div className="row">
          <SideBar />
          <SideBarForPhone />
          <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 ">
              <Home />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Overview;
