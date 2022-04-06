import React,{useState,useEffect} from "react";
import "./dashboard.css";
import axios from "axios";
import { Card, Row, Col } from "react-bootstrap";
import { Calender } from "./Calender/Calender";
import img2 from "../../Components/assets/img2.jpg";
import { usePatientInfo } from "../../Context/PatientInfoContext";
import { api_url } from "../../Urls/Api";

const Dashboard = () => {
  const { patientInfo } = usePatientInfo();
  const token = window.localStorage.getItem("token");

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
      <Row xs={1} md={2} className="g-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Appointments</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Card style={{ margin: "2%", width: "45%" }}>
          <Card.Body>
            <Card.Title>User Information</Card.Title>
            <Card.Text>
              This is a longer card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ height: "450px" }}>
          <Card.Body>
            <Card.Title>Calender</Card.Title>
            <Card.Text>
              <Calender />
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ margin: "2%", width: "45%" }}>
          <Card.Body>
            <Card.Img variant="top" src={img2} />
          </Card.Body>
        </Card>
      </Row>
    </div>
  );
};
export default Dashboard;
