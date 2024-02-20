import React, { useState, useEffect } from "react";
import "./PatientForm.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Typography } from "@mui/material";
import Trimester from "./Trimester";
import PatienCountries from "../Countries/PatientCountires";
import { Button } from "@mui/material";
import { usePatientInfo } from "../../../Context/PatientInfoContext";
import { api_url } from "../../../Urls/Api";
import axios from "axios";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";

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
  const [phone, setphone] = useState("");
  const [country, setcountry] = useState("");
  const [problem, setProblem] = useState("");
  const [age, setAge] = useState("");
  const [city, setcity] = useState("");

  const submitData = () => {
    const body = {
      name: name ? name : patientInfo?.name,
      phone: phone ? phone : patientInfo?.phone,
      country: country ? country : patientInfo?.country,
      problems: problem ? problem : patientInfo?.problem,
      trimester: age ? age : patientInfo?.trimester,
      city: city ? city : patientInfo?.city,
    };
    // console.log(body)
    updatePatientInfo(body);
    toast.success("Updated successfully!!");
  };

  return (
    <div className="patient-form" style={{ textAlign: "center" }}>
      <div>
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
      </div>
      {/* <div className="form-part-one">
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
              {update ? (
                <>
                  <Typography
                    variant="h6"
                    component="h2"
                    className="trimester-text"
                  >
                    Trimester - <Trimester age={age} setAge={setAge} />
                  </Typography>
                </>
              ) : (
                <Typography
                  variant="h6"
                  component="h2"
                  className="trimester-text"
                >
                  Trimester - {patientInfo.trimester}
                </Typography>
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <div className="form-part-two">
        <Container>
          <Row>
            <Col sm={4} className="patient-colsm2">
              <Typography variant="h6" component="h2">
                Problems <br />
                (if any)
              </Typography>
            </Col>
            <Col sm={8}>
              {update ? (
                <textarea
                  type="message"
                  placeholder="Write down the problems you are facing ...."
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="4"
                  style={{
                    borderRadius: "16px",
                    background: "#FEFEDF",
                  }}
                  value={problem}
                  onChange={(e) => {
                    setProblem(e.target.value);
                  }}
                />
              ) : (
                <textarea
                  type="message"
                  placeholder="Write down the problems you are facing ...."
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="4"
                  style={{
                    borderRadius: "16px",
                  }}
                  disabled="true"
                  defaultValue={patientInfo?.problems}
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
                  <PatienCountries
                    country={country}
                    setcountry={setcountry}
                    city={city}
                    setcity={setcity}
                  />
                </Typography>
              ) : (
                <Typography variant="h6" component="h2">
                  Country and City - {patientInfo?.country},{patientInfo?.city}
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
                  onClick={(e) => {
                    e.preventDefault();
                    submitData();
                  }}
                >
                  Submit
                </Button>
              )}
            </Col>
          </Row>
        </Container>
      </div> */}
      <Button variant="contained" disableElevation className="submit-button">
        <Link to="/patientdashboard" className="linkwhite">
          Move To Dashboard
        </Link>
      </Button>
    </div>
  );
};

export default PatientForm;
