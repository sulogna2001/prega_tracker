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
import { api_url } from "../../Urls/Api";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AppointmentLists = ({ doc }) => {
  const token = window.localStorage.getItem("token");
  const [patientdata, setpatientdata] = useState("");
  const history = useNavigate();

  useEffect(() => {
    axios
      .get(`${api_url}patient/${doc.patientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setpatientdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [doc.patientId]);

  useEffect(() => {
    axios
      .get(`${api_url}appointment/getperdate/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleComplete = (e) => {
    e.preventDefault();
    const body = {
      id: doc._id,
      status: "completed",
    };
    axios
      .put(`${api_url}appointment/complete/`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        window.location.reload();
        toast.success("Appointment completed!!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Col>
      <Card style={{ backgroundColor: "cornsilk", borderRadius: "30px" }}>
        <Card.Body
          style={{ backgroundColor: "cornsilk", borderRadius: "30px" }}
        >
          <Card.Title style={{ textAlign: "center", marginBottom: "2vh" }}>
            Id - {doc._id}
          </Card.Title>
          <Card.Text>
            <p className="appheading">
              <ImUser /> Patient Name-
              <span
                style={{
                  margin: "10px",
                  color: "black",
                  fontWeight: "normal",
                }}
              >
                {patientdata?.name}
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
                {doc?.startTimeHours}:{doc?.startTimeMinutes} till{" "}
                {doc?.endTimeHours} :{doc?.endTimeMinutes}
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
                {doc?.Date.toString().replace(
                  /(\d{4})(\d{2})(\d{2})/,
                  "$1-$2-$3",
                )}
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
                ₹{doc.Price}
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
                {doc?.Status}
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
                {doc?.expirity}
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
                {doc?.problem}
              </span>
            </p>
          </Card.Text>
          {doc?.expirity == "false" && doc?.Status == "notcompleted" && (
            <div style={{ textAlign: "center" }}>
              <Button
                variant="outline"
                className="buttonBook"
                style={{
                  margin: "10px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                }}
                onClick={handleComplete}
              >
                Complete Appointment
              </Button>{" "}
            </div>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};
export default AppointmentLists;
