/* eslint-disable */

import { React, useState, useEffect } from "react";
import "./Appointments.css";
import Row from "react-bootstrap/esm/Row";
import NavbarAll from "../Navbar/Navbar";
import { Typography } from "@mui/material";
import { api_url } from "../../Urls/Api";
import AppointmentLists from "./AppointmentLists";
import axios from "axios";
const AppointmentCards = () => {
  const token = window.localStorage.getItem("token");

  const [appointmentdetails, setappointmentdetails] = useState("");

  useEffect(() => {
    axios
      .get(`${api_url}appointment/get/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setappointmentdetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <NavbarAll />
      <Typography
        className="patientTypo"
        align="center"
        style={{ marginTop: "2vh" }}
      >
        Your Appointments
      </Typography>
      <div style={{ margin: "20px" }}>
        <Row xs={1} md={2} className="g-4">
          {appointmentdetails &&
            appointmentdetails?.map((doc) => <AppointmentLists doc={doc} />)}
        </Row>
      </div>
    </>
  );
};

export default AppointmentCards;
