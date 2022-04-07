import React, { useState, useEffect } from "react";
import "./notificationDoctor.css";
import { Chat } from "../chatBot/Chat";
import NavbarAll from "../Navbar/Navbar";
import SideBar from "../OverviewDashboard/SideBar/SideBar";
import SideBarForPhone from "../OverviewDashboard/SideBar/SideBarForPhone";
import axios from "axios";
import { api_url } from "../../Urls/Api";
import Card from "react-bootstrap/Card";
import Moment from "react-moment";

const NotificationDoctor = () => {
  const [docNot, setDocNoc] = useState("");
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${api_url}notification/doc/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);

        setDocNoc(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
            {docNot.length <= 0 ? (
              "No Notifications found!!"
            ) : (
              <div class=" ">
                {docNot &&
                  docNot?.map((res) => {
                    <Card>
                      <Card.Body>
                        <p>{res.context}</p>
                        {res.accept == "accepted" ? (
                          <button className="btn-acc">Accepted</button>
                        ) : (
                          ""
                        )}

                        <p className="notification-time">
                          <Moment fromNow>{res.created_at}</Moment>{" "}
                        </p>
                      </Card.Body>
                    </Card>;
                  })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default NotificationDoctor;
