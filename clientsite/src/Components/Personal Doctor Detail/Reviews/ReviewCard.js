import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import { api_url } from "../../../Urls/Api";

const labels = {
  1: "Useless",

  2: "Poor",

  3: "Ok",

  4: "Good",

  5: "Excellent",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const ReviewCard = ({ review }) => {
  const token = window.localStorage.getItem("patientToken");

  const [patientdata, setpatientdata] = useState("");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  console.log(headers);

  useEffect(() => {
    axios
      .get(`${api_url}patient/${review?.patientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setpatientdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const value = review?.ratings;
  return (
    <Card style={{ width: "100%", borderRadius: "15px" }}>
      <Card.Body style={{ borderRadius: "15px" }}>
        <Typography style={{ paddingLeft: "0", fontFamily: "Amaranth" }}>
          <span style={{ fontWeight: "bold" }}>Patient Name </span> -{" "}
          {patientdata?.name}
        </Typography>
        <Typography style={{ fontFamily: "Amaranth", marginTop: "1vh" }}>
          <span style={{ fontWeight: "bold" }}>Ratings</span> -{" "}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Rating
              name="read-only"
              value={review?.ratings}
              precision={1}
              getLabelText={getLabelText}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            {value !== null && <Box sx={{ ml: 2 }}>{labels[value]}</Box>}
          </div>
        </Typography>
        <Typography
          style={{ paddingLeft: "0", marginTop: "1vh", fontFamily: "Amaranth" }}
        >
          <span style={{ fontWeight: "bold" }}>Review </span> -{review?.review}
        </Typography>
      </Card.Body>
    </Card>
  );
};

export default ReviewCard;
