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
import { makeStyles } from "@material-ui/core";
import axios from "axios";

// Material Ui Styles
const useStyles = makeStyles({
  root: {},
  paper: { borderRadius: 5, width: "100%" },
});

export default function AddAppModal(props) {
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

  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="customized-dialog-title"
        classes={{
          root: classes.root,
          paper: classes.paper,
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
            style={{ color: "#707070", fontFamily: "Amaranth",fontSize:'20px' }}
          >
            Fill the below fields
          </DialogContentText>
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
          >
            Book Appointment
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
