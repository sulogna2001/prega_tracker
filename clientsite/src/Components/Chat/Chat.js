import React from "react";
import NavbarAll from "../Navbar/Navbar";
import { CssBaseline } from "@mui/material";
import ChatMain from "./ChatMain";
export const Chat = () => {
  return (
    <div>
      <>
        <CssBaseline />
          <NavbarAll />
        <div
          className="container-fluid computer"
          style={{ overflow: "hidden" }}
        >
          <div className="row">
            <div className="col-1  px-1 " id="main"></div>
            <div className="col-10  px-3 " id="main">
              {/* <ChatMain/> */}
            </div>
            <div className="col-1 offset-3 " id="main"></div>
          </div>
        </div>
        <div style={{ display: "none" }} className="mediadev">
          {/* Mobile View */}
          
        </div>
      </>
    </div>
  );
};
