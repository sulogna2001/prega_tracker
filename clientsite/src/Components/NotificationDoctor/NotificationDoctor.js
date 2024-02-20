import React, { useState, useEffect } from "react";
import "./notificationDoctor.css";
import NavbarAll from "../Navbar/Navbar";
import SideBar from "../OverviewDashboard/SideBar/SideBar";
import SideBarForPhone from "../OverviewDashboard/SideBar/SideBarForPhone";
import axios from "axios";
import { api_url } from "../../Urls/Api";
import Card from "react-bootstrap/Card";
import moment from "moment";

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

  const handleAccept = (id) => {
    const body = {
      notificationId: id,
    };
    axios
      .post(`${api_url}doc/acceptInvitation/`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
            {docNot.length <= 0 ? (
              "No Notifications found!!"
            ) : (
              <div class=" ">
                {docNot?.map((res) => (
                  <Card style={{ borderRadius: "30px" }}>
                    <Card.Body style={{ borderRadius: "30px" }}>
                      <p>{res.context}</p>
                      {res.accept == "accepted" &&
                        !res?.context.includes("terminated") &&
                        !res?.context.includes("accepted") && (
                          <button className="btn-acc" disabled="true">
                            Accepted
                          </button>
                        )}
                      {!res.accept &&
                        !res?.context.includes("terminated") &&
                        !res?.context.includes("accepted") && (
                          <button
                            className="btn-acc"
                            onClick={(e) => {
                              e.preventDefault();
                              handleAccept(res._id);
                            }}
                          >
                            Accept
                          </button>
                        )}

                      <p className="notification-time">
                        {moment(res?.createdAt).fromNow()}
                      </p>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default NotificationDoctor;
