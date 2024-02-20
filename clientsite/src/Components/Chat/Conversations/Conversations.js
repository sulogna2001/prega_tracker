import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import dummy from "../../assets/upload2.png";

const Conversations = (props) => {
  return (
    <>
      <Card
        style={{ width: "100%", borderRadius: "30px" }}
        onClick={() => props.onClick(props.conversation._id)}
      >
        <Card.Body
          style={{
            display: "flex",
            background: "cornsilk",
            borderRadius: "30px",
            cursor: "pointer",
            alignItems:'center'
          }}
        >
          <img
            src={dummy}
            width="79"
            height="81"
            style={{
              borderRadius: "75px",
              filter: "drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.121))",
            }}
            alt="im"
          />
          <div style={{ marginLeft: "2vw" }}>
            <Typography style={{ fontFamily: "Amaranth" }}>
              {props.conversation?.name}
            </Typography>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default Conversations;
