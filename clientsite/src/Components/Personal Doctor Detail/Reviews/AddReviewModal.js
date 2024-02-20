import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { RiCloseCircleLine } from "react-icons/ri";
import HoverRating from "./AddRatings";
import axios from "axios";
import { api_url } from "../../../Urls/Api";
import { toast } from "react-toastify";

// Material Ui Styles
// const useStyles = makeStyles({
//   root: {},
//   paper: { borderRadius: 5, width: "100%" },
// });

export default function Feedback(props) {
  const [charsleft1, setcharsleft1] = useState(500); // for maintaing the character count of the feed back dialog text field
  const [para, setpara] = useState(""); // to store the text value
  const [value, setValue] = useState("");

  console.log(value);

  // For counting the no of characters in the text field

  const maxLength1 = 500;
  const onHandleInputFeedback = (e) => {
    setpara(e.target.value);
    const characterCount1 = e.target.value.length;
    const charlefttext = maxLength1 - characterCount1;
    setcharsleft1(charlefttext);
  };

  // On Submitting the feedback

  const token = window.localStorage.getItem("patientToken");

  const handleFeedback = () => {
    const body = {
      doctorId: props.id,
      ratings: value,
      review: para,
    };

    axios
      .post(`${api_url}review/add/`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        //  console.log(res);
        toast.success("Review added!!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const classes = useStyles();
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="customized-dialog-title"
        // classes={{
        //   root: classes.root,
        //   paper: classes.paper,
        // }}
        sx={{
          "& .MuiDialog-paper": {
            // Your CSS styles for the paper element go here
            borderRadius: 5,
            width: "100%"
          },
        }}
      >
        <DialogTitle
          sx={{ m: 0, p: 2 }}
          className="backgroundPalette1"
          style={{
            paddingTop: "5vh",
          }}
        >
          <Typography
            style={{
              fontFamily: "Amaranth",
              color: "white",
              fontSize: "25px",
            }}
          >
            Send me your feedback!
          </Typography>
          {props.onClose ? (
            <IconButton
              aria-label="close"
              onClick={props.onClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
              style={{ position: "absolute" }}
            >
              <RiCloseCircleLine style={{ color: "white" }} />
            </IconButton>
          ) : null}
          <div style={{ marginTop: "3vh" }}>
            <Typography
              style={{
                fontFamily: "Amaranth",
                color: "white",
                fontSize: "18px",
              }}
            >
              Let me know in the field below
            </Typography>
          </div>
        </DialogTitle>
        <DialogContent style={{ marginTop: "3vh" }}>
          <DialogContentText
            style={{ color: "#707070", fontFamily: "Amaranth" }}
          >
            Describe your experience here.
          </DialogContentText>
          <HoverRating value={value} setValue={setValue} />
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="4"
            style={{
              color: "grey",

              borderRadius: "16px",
              marginTop: "3vh",
            }}
            value={para}
            onChange={onHandleInputFeedback}
            maxLength="500"
          ></textarea>
          <div style={{ marginTop: "2vh" }}>
            <Typography
              style={{
                textAlign: "right",
                fontFamily: "Amaranth",
                color: "#707070",
              }}
            >
              {charsleft1} Characters left
            </Typography>
          </div>
        </DialogContent>
        <DialogActions
          style={{
            justifyContent: "flex-end",
            marginLeft: "1vw",
            marginBottom: "2vh",
          }}
        >
          <Button
            className="backgroundPalette1"
            style={{
              paddingLeft: "20px",
              paddingRight: "20px",
              paddingTop: "10px",
              paddingBottom: "10px",
              color: "white",
              fontFamily: "Amaranth",
              textTransform: "none",
              borderRadius: "10px",
            }}
            onClick={(e) => {
              e.preventDefault();
              handleFeedback();
            }}
          >
            Send Review
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  );
}
