import React, { useState, useEffect } from "react";
import axios from "axios";
import "./notificationPatient.css";
import NavbarAll from "../Navbar/Navbar";
import SidebarPatient from "../../Patients Components/SidebarPatient/SidebarPatient";
import SidebarPatientForPhone from "../../Patients Components/SidebarPatient/SidebarPatientForPhone";
import Card from "react-bootstrap/Card";
import { api_url } from "../../Urls/Api";
import moment from "moment";
const NotificationPatient = () => {
  const [patientNot, setPatientNoc] = useState("");
  const token = window.localStorage.getItem("patientToken");

  useEffect(() => {
    axios
      .get(`${api_url}notification/patient/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);

        setPatientNoc(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <NavbarAll />

      <div className="container-fluid" style={{ padding: "0" }}>
        <div className="row content">
          <div class="col-md-3 ms-sm-auto col-lg-2 ">
            <SidebarPatient />
            <SidebarPatientForPhone />
          </div>
          <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {patientNot.length <= 0 ? (
              "No Notifications found!!"
            ) : (
              <div class=" ">
                {patientNot &&
                  patientNot?.map((res) => (
                    <Card style={{ borderRadius: "30px" }}>
                      <Card.Body style={{ borderRadius: "30px" }}>
                        <p>{res.context}</p>
                        {res.accept == "accepted" ? (
                          <button className="btn-acc">Accepted</button>
                        ) : (
                          ""
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

export default NotificationPatient;
