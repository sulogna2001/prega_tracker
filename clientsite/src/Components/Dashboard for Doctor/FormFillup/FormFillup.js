import React, { useState } from "react";
import "./FormFillup.css";
import { Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TimeSlot from "./TimeSlot";
import PriceBox from "./PriceBox";
import Country from "./Country";
import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { useDoctorInfo } from "../../../Context/DoctorInfoContext";
import { Link } from "react-router-dom";
import EndTimeSlot from "./EndTimeSlot";
const FormFillup = () => {
  const { doctorInfo } = useDoctorInfo();

  const [update, setupdate] = useState(false);

  // State Variables

  const [name,setname] = useState('')
  const [phone,setphone] = useState('')
  const [desc,setdesc] = useState('')
  const [startTime,setstartTime] = useState('10:00')
  const [endTime,setendTime] = useState('21:00')
  const [address,setaddress] = useState('')
  const [fees,setfees] = useState('')
  const [country,setcountry] = useState('')
  const [city,setcity] = useState('')
  const [hospital,sethospital] = useState('')
  const [specialization,setspecialization] = useState('')

  return (
    <div className="form-section">
      <Button
        variant="contained"
        disableElevation
        className="submit-button"
        onClick={(e) => {
          e.preventDefault();
          setupdate(true);
        }}
      >
        Edit Your Information
      </Button>
      <div className="profile-pic">
        <label htmlFor="upload-button">
          <FontAwesomeIcon icon={faUserPlus} className="add-icon" />
        </label>
      </div>
      <input type="file" id="upload-button" style={{ display: "none" }} />

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
                    onChange={(e)=>{
                      setname(e.target.value)
                    }}
                  />{" "}
                </Typography>
              ) : (
                <Typography variant="h6" component="h2">
                  Name - {doctorInfo?.name}
                </Typography>
              )}
            </Col>
            <Col>
              <Typography variant="h6" component="h2">
                Email - {doctorInfo?.email}
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
                    onChange={(e)=>{
                      setphone(e.target.value)
                    }}
                  />{" "}
                </Typography>
              ) : (
                <Typography variant="h6" component="h2">
                  Phone - {doctorInfo?.phone}
                </Typography>
              )}
            </Col>
            <Col>
              {update ? (
                <>
                  <Typography variant="h6" component="h2">
                    Time Slot -
                  </Typography>
                  <TimeSlot startTime={startTime} setstartTime={setstartTime} /> <span> till</span> <EndTimeSlot endTime={endTime} setendTime={setendTime} />
                </>
              ) : (
                <Typography variant="h6" component="h2">
                  Time Slot - {doctorInfo?.startTimeHours}:
                  {doctorInfo?.startTimeMinutes} till {doctorInfo?.endTimeHours}{" "}
                  :{doctorInfo?.startTimeMinutes}
                </Typography>
              )}

              {/*  */}
            </Col>
          </Row>
        </Container>
      </div>

      <div className="form-part-two">
        <Container>
          <Row>
            <Col sm={2}>
              <Typography variant="h6" component="h2">
                Description
              </Typography>
            </Col>
            <Col sm={10}>
              {update ? (
                <textarea
                  type="message"
                  placeholder="Provide the necessary details about you...."
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="4"
                  style={{
                    marginLeft: "1%",
                    borderRadius: "16px",
                    background: "#FEFEDF",
                  }}
                  value={desc}
                  onChange={(e)=>{
                    setdesc(e.target.value)
                  }}
                />
              ) : (
                <textarea
                  type="message"
                  placeholder="Provide the necessary details about you...."
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="4"
                  style={{
                    marginLeft: "1%",
                    borderRadius: "16px",
                  }}
                  disabled="true"
                  defaultValue={doctorInfo?.desc}
                />
              )}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="form-part-two" style={{ marginTop: "2vh" }}>
        <Container>
          <Row>
            <Col sm={2}>
              <Typography variant="h6" component="h2">
                Address
              </Typography>
            </Col>
            <Col sm={10}>
              {update ? (
                <textarea
                  type="message"
                  placeholder="Provide the address ...."
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="4"
                  style={{
                    marginLeft: "1%",
                    borderRadius: "16px",
                    background: "#FEFEDF",
                  }}
                  value={address}
                  onChange={(e)=>{
                    setaddress(e.target.value)
                  }}
                />
              ) : (
                <textarea
                  type="message"
                  placeholder="Provide the address ...."
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="4"
                  style={{
                    marginLeft: "1%",
                    borderRadius: "16px",
                  }}
                  disabled="true"
                  defaultValue={doctorInfo?.address}
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
                  Fees - <PriceBox fees={fees} setfees={setfees} />
                </Typography>
              ) : (
                <Typography variant="h6" component="h2">
                  Fees - {doctorInfo?.price}
                </Typography>
              )}
            </Col>
            <Col>
              {update ? (
                <Typography variant="h6" component="h2">
                  Country and City - <Country country={country} setcountry={setcountry} city={city} setcity={setcity} />
                </Typography>
              ) : (
                <Typography variant="h6" component="h2">
                  Country and City - {doctorInfo?.city},{doctorInfo?.country}
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
              {update ? (
                <Typography variant="h6" component="h2">
                  Hospital - <br />
                  <TextField
                    id="filled-basic"
                    label="Hospital name..."
                    variant="filled"
                    value={hospital}
                    onChange={(e)=>{
                      sethospital(e.target.value)
                    }}
                  />
                </Typography>
              ) : (
                <Typography variant="h6" component="h2">
                  Hospital -{" "}
                  {doctorInfo?.hospital ? doctorInfo?.hospital : "NA"}
                </Typography>
              )}
            </Col>
            <Col>
              {update ? (
                <Typography variant="h6" component="h2">
                  Specialization - <br />
                  <TextField
                    id="filled-basic"
                    label="Specialized in..."
                    variant="filled"
                    value={specialization}
                    onChange={(e)=>{
                      setspecialization(e.target.value)
                    }}
                  />
                </Typography>
              ) : (
                <Typography variant="h6" component="h2">
                  Specialization-{" "}
                  {doctorInfo?.specialization
                    ? doctorInfo?.specialization
                    : "NA"}
                </Typography>
              )}
            </Col>
          </Row>
        </Container>
      </div>

      {update && (
        <Button variant="contained" disableElevation className="submit-button">
          Submit
        </Button>
      )}

      <Button variant="contained" disableElevation className="submit-button">
        <Link to="/doctorDashboard" className="linkwhite">
          Move To Dashboard
        </Link>
      </Button>
    </div>
  );
};

export default FormFillup;
