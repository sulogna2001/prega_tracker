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
import axios from "axios";
import DatePicker2 from "./DatePicker";
import { api_url } from "../../Urls/Api";
import TimeSlot from "../../Components/Dashboard for Doctor/FormFillup/TimeSlot";
import EndTimeSlot from "../../Components/Dashboard for Doctor/FormFillup/EndTimeSlot";
import { id } from "date-fns/locale";
import { toast } from "react-toastify";

// Material Ui Styles
// const useStyles = makeStyles({
//   root: {},
//   paper: { borderRadius: 5, width: "100%" },
// });

export default function AddAppModal(props) {
  const [startTime, setstartTime] = useState("10:00");
  const [endTime, setendTime] = useState("21:00");

  const token = window.localStorage.getItem("patientToken");

  var id;

  id = JSON.parse(atob(token.split(".")[1]));

  // to store the text value

  const [charsleft1, setcharsleft1] = useState(500); // for maintaing the character count of the feed back dialog text field
  const [para, setpara] = useState(""); // to store the text value

  // For counting the no of characters in the text field

  const maxLength1 = 500;
  const onHandleInputFeedback = (e) => {
    setpara(e.target.value);
    const characterCount1 = e.target.value.length;
    const charlefttext = maxLength1 - characterCount1;
    setcharsleft1(charlefttext);
  };

  // For counting the no of characters in the text field
  const [value, setValue] = React.useState(new Date());

  const bookReview = () => {
    var month = value.getMonth() + 1,
      day = value.getDate();
    if (/^\d$/.test(value.getMonth())) {
      month = (value.getMonth() + 1).toString().padStart(2, "0");
    }
    if (/^\d$/.test(value.getDate())) {
      day = value.getDate().toString().padStart(2, "0");
    }

    const body = {
      patientId: id.patientid,
      DoctorId: props.id,
      startSlotTime: startTime,
      endSlotTime: endTime,
      date: value.getFullYear().toString() + month.toString() + day.toString(),
      problem: para,
      expirity: "false",
    };

    console.log(body);

    axios
      .post(`${api_url}appointment/create/`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("currentapp", res.data.appointment._id);
        toast.success("Booked successfully!!");
      })
      .catch((err) => {
        toast.error(err.response.data);
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
            Book your Appointment
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
        </DialogTitle>
        <DialogContent style={{ marginTop: "3vh" }}>
          <DialogContentText
            style={{
              color: "#707070",
              fontFamily: "Amaranth",
              fontSize: "20px",
            }}
          >
            Fill the below fields according to the time slot of doctor
          </DialogContentText>
          <div
            style={{
              marginTop: "2vh",
              fontFamily: "Amaranth",
              display: "flex",
              justifyContent: "space-between",
            }}
            className="mobile"
          >
            <DatePicker2 value={value} setValue={setValue} />
            <div className="mob">
              <TimeSlot startTime={startTime} setstartTime={setstartTime} />{" "}
              <span> till</span>{" "}
              <EndTimeSlot endTime={endTime} setendTime={setendTime} />
            </div>
          </div>

          <label
            style={{
              marginTop: "3vh",
              fontFamily: "Amaranth",
              color: "#707070",
            }}
          >
            Problems
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="4"
            style={{
              color: "grey",
              marginTop: "1vh",
              borderRadius: "16px",
              background: "#FEFEDF",
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
              bookReview();
            }}
          >
            Book Appointment
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
