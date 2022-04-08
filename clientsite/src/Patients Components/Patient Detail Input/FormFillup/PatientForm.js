import React, { useState, useEffect } from "react";
import "./PatientForm.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Typography } from "@material-ui/core";
import Trimester from "./Trimester";
import PatienCountries from "../Countries/PatientCountires";
import { Button } from "@material-ui/core";
import { usePatientInfo } from "../../../Context/PatientInfoContext";
import { api_url } from "../../../Urls/Api";
import axios from "axios";
import { Link } from "react-router-dom";
import { TextField } from "@material-ui/core";

const PatientForm = () => {
  const { updatePatientInfo } = usePatientInfo();

  const [update, setUpdate] = useState(false);
  const [patientInfo, setpatientInfo] = useState("");
  const token = window.localStorage.getItem("patientToken");

  useEffect(() => {
    axios
      .get(`${api_url}patient/patientinfo`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setpatientInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setphone] = useState("");
  const [country, setcountry] = useState("");
  const [problem, setProblem] = useState("");
  const [trimester, setTrimester] = useState("");

  const submitData = () => {
    const body = {
      name: name ? name : patientInfo?.name,
      phone: phone ? phone : patientInfo?.phone,
      email: email ? email : patientInfo?.email,
      country: country ? country : patientInfo?.country,
      problem: problem ? problem : patientInfo?.problem,
      trimester: trimester ? trimester : patientInfo?.trimester,
    };
    // console.log(updatePatientInfo)
    updatePatientInfo(body);
  };

  return (
    <div className="patient-form">
      {!update && (
        <Button
          variant="contained"
          disableElevation
          className="submit-button"
          onClick={(e) => {
            e.preventDefault();
            setUpdate(true);
          }}
        >
          Edit Your Information
        </Button>
      )}

      {update && (
        <Button
          variant="contained"
          disableElevation
          className="submit-button"
          onClick={(e) => {
            e.preventDefault();
            setUpdate(false);
            setname("");
            setphone("");
            setProblem("");
            setcountry("");
          }}
        >
          Cancel Edit
        </Button>
      )}
      <div className="form-part-one">
        <Container>
          <Row>
            <Col>
              {update ? (
                <Typography variant="h6" component="h2">
                  Name - <br />
                  <TextField
                    id="filled-basic"
                    label="Enter name..."
                    variant="filled"
                    style={{ background: "#FEFEDF" }}
                    value={name}
                    onChange={(e) => {
                      setname(e.target.value);
                    }}
                  />{" "}
                </Typography>
              ) : (
                <Typography variant="h6" component="h2">
                  Name - {patientInfo?.name}
                </Typography>
              )}
            </Col>
            <Col>
              <Typography variant="h6" component="h2">
                Email - {patientInfo.email}
              </Typography>
            </Col>
          </Row>

          <Row>
            <Col>
              {update ? (
                <Typography variant="h6" component="h2">
                  Phone - <br />
                  <TextField
                    id="filled-basic"
                    label="Enter number..."
                    variant="filled"
                    style={{ background: "#FEFEDF" }}
                    value={phone}
                    onChange={(e) => {
                      setphone(e.target.value);
                    }}
                  />{" "}
                </Typography>
              ) : (
                <Typography variant="h6" component="h2">
                  Phone - {patientInfo?.phone}
                </Typography>
              )}
            </Col>
            <Col className="trimester-col">
              <Typography
                variant="h6"
                component="h2"
                className="trimester-text"
              >
                Trimester - {patientInfo.trimester}
              </Typography>
              <Trimester />
            </Col>
          </Row>
        </Container>
      </div>

      <div className="form-part-two">
        <Container>
          <Row>
            <Col sm={2} className="patient-colsm2">
              <Typography variant="h6" component="h2">
                Problems <br />
                (if any)
              </Typography>
            </Col>
            <Col sm={10}>
              {update ? (
                <textarea
                  type="message"
                  placeholder="If you are facing any problems...."
                  className="form-control"
                  rows="4"
                  style={{
                    marginLeft: "12%",
                    borderRadius: "16px",
                  }}
                />
              ) : (
                <textarea
                  type="message"
                  placeholder="If you are facing any problems...."
                  className="form-control"
                  rows="4"
                  style={{
                    marginLeft: "12%",
                    borderRadius: "16px",
                  }}
                  defaultValue={patientInfo?.problem}
                />
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <div className="form-part-three">
        <Container>
          <Row>
            <Col>
              {update ? (
                <Typography variant="h6" component="h2">
                  Country and City -{" "}
                  <PatienCountries country={country} setcountry={setcountry} />
                </Typography>
              ) : (
                <Typography variant="h6" component="h2">
                  Country and City - {patientInfo?.country}
                </Typography>
              )}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="form-part-three">
        <Container>
          <Row>
            <Col>
              {update && (
                <Button
                  variant="contained"
                  disableElevation
                  className="submit-button"
                  type="button"
                  onClick={(e)=>{e.preventDefault()
                    submitData()
                }}
                >
                  Submit
                </Button>
              )}
            </Col>
          </Row>
        </Container>
      </div>
      <Button variant="contained" disableElevation className="submit-button">
        <Link to="/patientdashboard" className="linkwhite">
          Move To Dashboard
        </Link>
      </Button>
    </div>
  );
};

export default PatientForm;
