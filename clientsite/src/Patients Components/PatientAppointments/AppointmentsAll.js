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

const AppointmentsAll = () => {
  return (
    <Col>
      <Card style={{ backgroundColor: "cornsilk", borderRadius: "30px" }}>
        <Card.Body>
          <Card.Title style={{ textAlign: "center", marginBottom: "2vh" }}>
            Id - 
            {/* {doc._id} */}
          </Card.Title>
          <Card.Text>
            <p className="appheading">
              <ImUser /> Doctor Name-
              <span
                style={{
                  margin: "10px",
                  color: "black",
                  fontWeight: "normal",
                }}
              >
                {/* {patientdata?.name} */}
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
                {/* {doc?.startTimeHours}:
                  {doc?.startTimeMinutes} till {doc?.endTimeHours}{" "}
                  :{doc?.endTimeMinutes} */}
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
             {/* { moment.utc(doc?.Date).format('DD/MM/YYYY')} */}

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
              {/* ₹{doc.Price} */}
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
                {/* {doc?.Status} */}
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
                {/* {doc?.expirity} */}
              </span>
            </p>

            <p className="appheading">
              <MdDescription />
              Problems -
              <span
                style={{
                  margin: "10px",
                  color: "black",
                  fontWeight: "normal",
                }}
              >
               {/* {doc?.problem} */}
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
            //   onClick={handleComplete}
            >
              Complete Appointment
            </Button>{" "}
          </div>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default AppointmentsAll