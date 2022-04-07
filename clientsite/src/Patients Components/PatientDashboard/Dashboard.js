import React, { useState, useEffect } from "react";
import "./dashboard.css";
import axios from "axios";
import { Card, Row, Col } from "react-bootstrap";
import { Calender } from "./Calender/Calender";
import img from "../../Components/assets/img.jpg";
import { usePatientInfo } from "../../Context/PatientInfoContext";
import { api_url } from "../../Urls/Api";
import Image2 from "../../Components/assets/noresults.svg";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";

const Dashboard = () => {
  const { patientInfo, appointmentList } = usePatientInfo();
  const token = window.localStorage.getItem("patientToken");

  const [getPatientInfo, setPatientInfo] = useState("");
  const [patientInfoPerdate, setPatientInfoPerdate] = useState("");

  useEffect(() => {
    axios
      .get(`${api_url}patient/patientinfo/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);

        setPatientInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${api_url}appointment/getperpatientdate/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);

        setPatientInfoPerdate(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container">
      <div class="row" style={{ gap: "12px", marginTop: "2vh" }}>
        <div class="col gridStats">
          <Card style={{ margin: "2%" }} className="patientCard">
            <Card.Body>
              <Card.Title>Appointments</Card.Title>
              <CardContent>
                {!patientInfoPerdate && (
                  <Typography
                    className="appointmentTypo"
                    align="center"
                    style={{ marginTop: "2vh" }}
                  >
                    No Appointments today
                    <img src={Image2} alt="imag" />
                  </Typography>
                )}
                {patientInfoPerdate &&
                  patientInfoPerdate?.map((res) => (
                    <Card style={{border:"none"}}>
                      <Typography className="cardTypo">
                        Time - {res.startTimeHours}:{res.startTimeMinutes}
                      </Typography>
                      <Typography className="cardTypo">
                        EndtimeTime - {res.endTimeHours}:{res.endTimeMinutes}
                      </Typography>
                      <Typography className="cardTypo">
                        Doctor Id - {res._id}
                      </Typography>
                      <Typography className="cardTypo">
                        Problem - {res.problem}
                      </Typography>

                      <Typography className="cardTypo">
                        Date - {res.Date}
                      </Typography>
                      <Typography className="cardTypo">
                        Price - {res.price}
                      </Typography>
                      <Typography className="cardTypo">
                        Status - {res.Status}
                      </Typography>
                    </Card>
                  ))}
              </CardContent>
            </Card.Body>
          </Card>
        </div>
        <div class="col gridStats">
          <Card style={{ margin: "2%" }} className="patientCard">
            <Card.Body>
              <Card.Title>User Information</Card.Title>
              <Card.Text style={{ marginLeft: "10%" }}>
                Id : {getPatientInfo._id}
                <br />
                Name : {getPatientInfo.name}
                <br />
                Email : {getPatientInfo.email}
                <br />
                Phone : {getPatientInfo.phone}
                <br />
                Trimester : {getPatientInfo.trimester}
                <br />
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div class="row" style={{ gap: "12px", marginTop: "2vh" }}>
        <div class="col gridStats">
          <Card style={{ margin: "2%" }} className="patientCard">
            <Card.Body>
              <Card.Title>Calender</Card.Title>
              <Card.Text>
                <Calender />
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div class="col gridStats">
          <Card style={{ margin: "2%" }} className="patientCard">
            <Card.Body>
              <Card.Title>Few Tips To Follow</Card.Title>

              <Card.Img variant="top" src={img} />
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
