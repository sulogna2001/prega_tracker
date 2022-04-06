import React, { useState, useEffect } from "react";
import "./dashboard.css";
import axios from "axios";
import { Card, Row, Col } from "react-bootstrap";
import { Calender } from "./Calender/Calender";
import img from "../../Components/assets/img.jpg";
import { usePatientInfo } from "../../Context/PatientInfoContext";
import { api_url } from "../../Urls/Api";

const Dashboard = () => {
  const { patientInfo } = usePatientInfo();
  const token = window.localStorage.getItem("patientToken");

  const [getPatientInfo, setPatientInfo] = useState("");

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

  return (
    <div className="container">
      <div class="row" style={{ gap: "12px", marginTop: "2vh" }}>
        <div class="col gridStats">
          <Card style={{ margin: "2%" }} className="patientCard">
            <Card.Body>
              <Card.Title>Appointments</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div class="col gridStats">
          <Card style={{ margin: "2%" }} className="patientCard">
            <Card.Body>
              <Card.Title>User Information</Card.Title>
              <Card.Text style={{marginLeft:"10%"}}>
                Id : {getPatientInfo._id}<br/>
                Name : {getPatientInfo.name}<br/>
                Email : {getPatientInfo.email}<br/>
                Phone : {getPatientInfo.phone}<br/>
                Trimester : {getPatientInfo.trimester}<br/>
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
