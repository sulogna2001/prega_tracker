import React, { useState, useEffect } from "react";
import NavbarAll from "../../Components/Navbar/Navbar";
import { Typography } from "@mui/material";
import { Row } from "react-bootstrap";
import { api_url } from "../../Urls/Api";
import AppointmentsAll from "./AppointmentsAll";
import axios from "axios";

const Appointments = () => {
  const token = window.localStorage.getItem("patientToken");

  const [appointmentlist, setappointmentlist] = useState("");
  useEffect(() => {
    axios
      .get(`${api_url}appointment/get/patient/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setappointmentlist(res.data);
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
          {appointmentlist &&
            appointmentlist?.map((patient) => (
              <AppointmentsAll patient={patient} />
            ))}
        </Row>
      </div>
    </>
  );
};

export default Appointments;
