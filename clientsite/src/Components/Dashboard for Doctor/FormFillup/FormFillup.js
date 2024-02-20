import React, { useState, useEffect } from "react";
import "./FormFillup.css";
import { Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TimeSlot from "./TimeSlot";
import PriceBox from "./PriceBox";
import Country from "./Country";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { useDoctorInfo } from "../../../Context/DoctorInfoContext";
import { Link } from "react-router-dom";
import EndTimeSlot from "./EndTimeSlot";
import axios from "axios";
import { api_url } from "../../../Urls/Api";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import appli from "../../../Database/Firebase";
const FormFillup = () => {
  const { updateDocInfo } = useDoctorInfo();

  const [update, setupdate] = useState(false);
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [doctorInfo, setdoctorInfo] = useState("");
  const token = window.localStorage.getItem("token");
  const storage = appli.storage();

  useEffect(() => {
    axios
      .get(`${api_url}doc/getInfo/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setdoctorInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // State Variables

  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [desc, setdesc] = useState("");
  const [startTime, setstartTime] = useState("10:00");
  const [endTime, setendTime] = useState("21:00");
  const [address, setaddress] = useState("");
  const [fees, setfees] = useState("");
  const [country, setcountry] = useState("");
  const [city, setcity] = useState("");
  const [hospital, sethospital] = useState("");
  const [specialization, setspecialization] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    let url;
    if (image.raw) {
      const imgRef = ref(
        storage,
        `images/${new Date().getTime()} - ${image.raw.name}`,
      );
      const snap = await uploadBytes(imgRef, image.raw);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
      console.log(image);
    }
    const body = {
      name: name ? name : doctorInfo?.name,
      phone: phone ? phone : doctorInfo?.phone,
      startTime:
        startTime !== "10:00"
          ? startTime
          : doctorInfo?.startTimeHours + ":" + doctorInfo?.startTimeMinutes,
      endTime:
        endTime !== "21:00"
          ? endTime
          : doctorInfo?.endTimeHours + ":" + doctorInfo?.endTimeMinutes,
      desc: desc ? desc : doctorInfo?.desc,
      address: address ? address : doctorInfo?.address,
      price: fees ? fees : doctorInfo?.price,
      country: country ? country : doctorInfo?.country,
      city: city ? city : doctorInfo?.city,
      hospital: hospital ? hospital : doctorInfo?.hospital,
      specialization: specialization
        ? specialization
        : doctorInfo?.specialization,
      profilePicture: url ? url : doctorInfo?.profilePicture,
    };

    updateDocInfo(body);
  };

  const handleChangeImg = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  return (
    <div className="form-section">
      {!update && (
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
      )}

      {update && (
        <Button
          variant="contained"
          disableElevation
          className="submit-button"
          onClick={(e) => {
            e.preventDefault();
            setupdate(false);
            setname("");
            setphone("");
            setstartTime("10:00");
            setendTime("21:00");
            setdesc("");
            setfees("");
            setaddress("");
            setcountry("");
            setcity("");
          }}
        >
          Cancel Edit
        </Button>
      )}

      <div className="profile-pic">
        {!update ? (
          <img src={doctorInfo?.profilePicture} width="120px" height="120px" />
        ) : (
          <label htmlFor="upload-button">
            {image.preview ? (
              <img src={image.preview} width="120px" height="120px" />
            ) : (
              <FontAwesomeIcon icon={faUserPlus} className="add-icon" />
            )}
          </label>
        )}
      </div>
      <input
        type="file"
        id="upload-button"
        style={{ display: "none" }}
        onChange={handleChangeImg}
      />

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
                    onChange={(e) => {
                      setphone(e.target.value);
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
                  <TimeSlot startTime={startTime} setstartTime={setstartTime} />{" "}
                  <span> till</span>{" "}
                  <EndTimeSlot endTime={endTime} setendTime={setendTime} />
                </>
              ) : (
                <Typography variant="h6" component="h2">
                  Time Slot - {doctorInfo?.startTimeHours}:
                  {doctorInfo?.startTimeMinutes} till {doctorInfo?.endTimeHours}{" "}
                  :{doctorInfo?.endTimeMinutes}
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
                  onChange={(e) => {
                    setdesc(e.target.value);
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
                  onChange={(e) => {
                    setaddress(e.target.value);
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
                  Fees - ₹ {doctorInfo?.price}
                </Typography>
              )}
            </Col>
            <Col>
              {update ? (
                <Typography variant="h6" component="h2">
                  Country and City -{" "}
                  <Country
                    country={country}
                    setcountry={setcountry}
                    city={city}
                    setcity={setcity}
                  />
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
                    onChange={(e) => {
                      sethospital(e.target.value);
                    }}
                  />
                </Typography>
              ) : (
                <Typography variant="h6" component="h2">
                  Hospital - {doctorInfo?.hospital}
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
                    onChange={(e) => {
                      setspecialization(e.target.value);
                    }}
                  />
                </Typography>
              ) : (
                <Typography variant="h6" component="h2">
                  Specialization- {doctorInfo?.specialization}
                </Typography>
              )}
            </Col>
          </Row>
        </Container>
      </div>

      {update && (
        <Button
          variant="contained"
          disableElevation
          className="submit-button"
          onClick={onSubmit}
        >
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
