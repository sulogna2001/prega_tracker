import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DoctorDetailImage from "../assets/DoctorDetail.svg";
import DoctorProfileImage from "../assets/DoctorProfile.svg";
import { Button } from "react-bootstrap";
import { VscOpenPreview } from "react-icons/vsc";
import { MdOutlineRateReview } from "react-icons/md";
import axios from "axios";
import { api_url } from "../../Urls/Api";
import ShowReviewModal from "./Reviews/ShowReviewModal";
import { useParams } from "react-router-dom";
import Feedback from "./Reviews/AddReviewModal";

export const DoctorCard = ({ doc }) => {
  const [handleOpen, sethandleOpen] = useState(false);
  const setopen = () => {
    sethandleOpen(true);
  };
  const setclose = () => {
    sethandleOpen(false);
  };

  const [handleReviewOpen, sethandleReviewOpen] = useState(false);

  const setreviewopen = () => {
    sethandleReviewOpen(true);
  };

  const setreviewclose = () => {
    sethandleReviewOpen(false);
  };

  const params = useParams();

  console.log(params);

  return (
    <div>
      {" "}
      <div className="landing-section">
        <Container>
          <Row>
            <Col>
              <img src={DoctorDetailImage} />
            </Col>
            <Col>
              <h1>
                Hi, I am Doctor {doc.name} and these are some details about me
                which you should know before moving forward.
              </h1>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="personalDetail-form">
        <h3>Personal Details</h3>
        <Container>
          <Row>
            <Col sm={4}>
              <img src={doc?.profilePicture} />
            </Col>
            <Col sm={8} className="personalDetails">
              <p>Name - {doc?.name}</p>
              <p>Email - {doc?.email}</p>
              <p>Phone Number - {doc?.phone}</p>
              <p>
                Time Slot- {doc?.startTimeHours}:
                {doc?.startTimeMinutes == 0 ? "00" : doc?.startTimeMinutes} till{" "}
                {doc?.endTimeHours} :
                {doc?.endTimeMinutes == 0 ? "00" : doc?.endTimeMinutes}
              </p>
              <p>Description - {doc.desc}</p>
              <p>Fees - ₹{doc?.price}</p>
              <p>Hospital - {doc?.hospital}</p>
              <p>Specialization - {doc?.specialization}</p>
              <p>Country - {doc.country}</p>
              <p>Region - {doc.city}</p>
            </Col>
          </Row>
        </Container>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Button variant="outline" className="buttonBook" onClick={setopen}>
            <VscOpenPreview /> Show Reviews
          </Button>
          <Button
            variant="outline"
            className="buttonBook"
            onClick={setreviewopen}
          >
            <MdOutlineRateReview /> Add Review
          </Button>
          <ShowReviewModal
            open={handleOpen}
            handleClose={setclose}
            id={doc?._id ? doc?._id : params.id}
          />
          <Feedback
            open={handleReviewOpen}
            onClose={setreviewclose}
            id={doc?._id ? doc?._id : params.id}
          />
        </div>
      </div>
    </div>
  );
};
