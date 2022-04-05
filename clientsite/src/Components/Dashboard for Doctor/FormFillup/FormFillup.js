import React from "react";
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
const FormFillup = () => {
  const { doctorInfo } = useDoctorInfo();
  console.log(doctorInfo);
  return (
    <div className="form-section">
      <Button variant="contained" disableElevation className="submit-button">
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
              <Typography variant="h6" component="h2">
                Name - {doctorInfo?.name}
              </Typography>
            </Col>
            <Col>
              <Typography variant="h6" component="h2">
                Email - {doctorInfo?.email}
              </Typography>
            </Col>
          </Row>

          <Row>
            <Col>
              <Typography variant="h6" component="h2">
                Phone Number - {doctorInfo?.phone}
              </Typography>
            </Col>
            <Col>
              <Typography variant="h6" component="h2">
                Time Slot - {doctorInfo?.startTimeHours}:
                {doctorInfo?.startTimeMinutes} till {doctorInfo?.endTimeHours} :
                {doctorInfo?.startTimeMinutes}
              </Typography>
              {/* <TimeSlot /> till <TimeSlot /> */}
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
                defaultValue={doctorInfo?.desc?doctor?.desc:'NA'}
              />
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
                defaultValue={doctorInfo?.address?doctorInfo?.address:'NA'}
              />
            </Col>
          </Row>
        </Container>
      </div>

      <div className="form-part-three">
        <Container>
          <Row>
            <Col>
              {/* <Typography variant="h6" component="h2">
                Fees - <PriceBox />
              </Typography> */}
              <Typography variant="h6" component="h2">
                Fees - {doctorInfo?.price ? doctorInfo?.price : "NA"}
              </Typography>
            </Col>
            <Col>
              {/* <Typography variant="h6" component="h2">
                Country and City - <Country />
              </Typography> */}
              <Typography variant="h6" component="h2">
                Country and City - {doctorInfo?.city ? doctorInfo?.city : "NA"},
                {doctorInfo?.country ? doctorInfo?.country : "NA"}
              </Typography>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="form-part-three">
        <Container>
          <Row>
            <Col>
              {/* <Typography variant="h6" component="h2">
                Hospital - <br />
                <TextField
                  id="filled-basic"
                  label="Hospital name..."
                  variant="filled"
                />
              </Typography> */}
              <Typography variant="h6" component="h2">
                Hospital - {doctorInfo?.hospital ? doctorInfo?.hospital : "NA"}
              </Typography>
            </Col>
            <Col>
              {/* <Typography variant="h6" component="h2">
                Specialization - <br />
                <TextField
                  id="filled-basic"
                  label="Specialized in..."
                  variant="filled"
                />
              </Typography> */}
              <Typography variant="h6" component="h2">
                Specialization-{" "}
                {doctorInfo?.specialization ? doctorInfo?.specialization : "NA"}
              </Typography>
            </Col>
          </Row>
        </Container>
      </div>

<<<<<<< HEAD
      {/* <Button variant="contained" disableElevation className="submit-button">
        Submit
      </Button> */}

      <Button variant="contained" disableElevation className="submit-button">
        <Link to="/doctorDashboard" className="linkwhite">Move To Dashboard</Link>
=======
      <Button variant="contained" disableElevation className='submit-button'>
        Submit
>>>>>>> upstream/master
      </Button>
    </div>
  );
};

export default FormFillup;
