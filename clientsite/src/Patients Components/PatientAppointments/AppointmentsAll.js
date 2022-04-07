import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import { Button } from "react-bootstrap";
import { MdDescription } from "react-icons/md";
import { ImUser } from "react-icons/im";
import { BiTimeFive } from "react-icons/bi";
import { BsCalendarDate } from "react-icons/bs";
import { HiCurrencyRupee } from "react-icons/hi";
import { GrStatusGood } from "react-icons/gr";
import { FcExpired } from "react-icons/fc";
import Card from "react-bootstrap/Card";
import axios from "axios";
import moment from "moment"
import { useNavigate } from "react-router-dom";
import { api_url } from "../../Urls/Api";

const AppointmentsAll = ({patient}) => {
  const token = window.localStorage.getItem("patientToken");
  const history = useNavigate()

  // const handleCancel =(e) =>{
  //   e.preventDefault()
  //   const body = {
  //       id : doc._id,
  //       status : 'cancelled'
  //   }
  //   axios.put(`${api_url}appointment/cancel`,body, {
  //     headers: { Authorization: `Bearer ${token}` },
  //   })
  //   .then((res) => {
  //     console.log(res.data)
  //     window.location.reload()
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }


  return (
    <Col>
      <Card style={{ backgroundColor: "cornsilk", borderRadius: "30px" }}>
        <Card.Body>
          <Card.Text>
            <p className="appheading">
              <ImUser /> Doctor Id-
              <span
                style={{
                  margin: "10px",
                  color: "black",
                  fontWeight: "normal",
                }}
              >
                {patient?.doctorId}
              </span>
            </p>
            <p className="appheading">
              <BiTimeFive /> Time Period -
              <span
                style={{
                  margin: "10px",
                  color: "black",
                  fontWeight: "normal",
                }}
              >
                {patient?.startTimeHours}:
                  {patient?.startTimeMinutes} till {patient?.endTimeHours}{" "}
                  :{patient?.endTimeMinutes}
              </span>
            </p>
            <p className="appheading">
              <BsCalendarDate /> Date -
              <span
                style={{
                  margin: "10px",
                  color: "black",
                  fontWeight: "normal",
                }}
              >
             { moment.utc(patient?.Date).format('DD/MM/YYYY')}

              </span>
            </p>

            <p className="appheading">
              <HiCurrencyRupee /> Price -
              <span
                style={{
                  margin: "10px",
                  color: "black",
                  fontWeight: "normal",
                }}
              >
              ₹{patient.Price}
              </span>
            </p>

            <p className="appheading">
              <GrStatusGood /> Status -
              <span
                style={{
                  margin: "10px",
                  color: "black",
                  fontWeight: "normal",
                }}
              >
                {patient?.Status}
              </span>
            </p>

            <p className="appheading">
              <FcExpired />
              Expired -
              <span
                style={{
                  margin: "10px",
                  color: "black",
                  fontWeight: "normal",
                }}
              >
                {patient?.expirity}
              </span>
            </p>

          </Card.Text>
          <div style={{ textAlign: "center" }}>
            <Button
              variant="outline"
              className="buttonBook"
              style={{
                margin: "10px",
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
              // onClick={handleCancel}
            >
              Cancel Appointment
            </Button>{" "}
          </div>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default AppointmentsAll