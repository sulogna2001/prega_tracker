import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { api_url } from "../../../Urls/Api";
import ReviewCard from "./ReviewCard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

const ShowReviewModal = (props) => {
  const [review, setreview] = useState("");

  const token = window.localStorage.getItem("patientToken");

  useEffect(() => {
    axios
      .put(`${api_url}review/get/`, {
        doctorId: props.id,
      })
      .then((res) => {
        console.log(res);
        setreview(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          style={{ fontFamily: "Amaranth", color: "#845ec2", fontSize: "25px" }}
        >
          Reviews
        </Typography>
        {review && review?.map((res) => <ReviewCard review={res} />)}
      </Box>
    </Modal>
  );
};

export default ShowReviewModal;
