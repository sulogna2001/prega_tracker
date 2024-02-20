import React from "react";
import NavbarAll from "../../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";
import SideBarForPhone from "../SideBar/SideBarForPhone";
import Home from "./Home";

const Overview = () => {
  return (
    <div>
      <NavbarAll />

      <div className="container-fluid" style={{ padding: "0" }}>
        <div className="row content">
          <div class="col-md-3 ms-sm-auto col-lg-2 ">
            <SideBar />
            <SideBarForPhone />
          </div>
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
