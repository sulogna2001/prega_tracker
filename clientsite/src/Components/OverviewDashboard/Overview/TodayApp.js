import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useEffect, useState } from "react";
import axios from "axios";
import { api_url } from "../../../Urls/Api";
import moment from "moment";

const TodayApp = ({ doc }) => {
  const [res, setpatientdata] = useState("");
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${api_url}patient/${doc.patientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setpatientdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [doc.patientId]);

  return (
    <Card
      style={{ borderRadius: "12px", marginTop: "2vh" }}
      className="cardPat"
    >
      <CardContent
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: "0",
        }}
      >
        <Typography className="cardTypo">Patient Name - {res.name}</Typography>
        <Typography className="cardTypo">City - {res.city}</Typography>
      </CardContent>
      <CardContent
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "0",
          paddingBottom: "0",
        }}
      >
        <Typography className="cardTypo">Id - {res._id}</Typography>
        <Typography className="cardTypo">
          Trimester - {res.trimester}
        </Typography>
      </CardContent>
      <CardContent
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "0",
          paddingBottom: "0",
        }}
      >
        <Typography className="cardTypo">Status - {doc?.Status}</Typography>
        <Typography className="cardTypo">Expirity - {doc?.expirity}</Typography>
      </CardContent>
      <CardContent
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "0",
          paddingBottom: "0",
        }}
      >
        <Typography className="cardTypo">Price - {doc?.Price}</Typography>
        <Typography className="cardTypo">
          Date -{" "}
          {doc?.Date.toString().replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")}
        </Typography>
      </CardContent>
      <CardContent
        style={{
          paddingTop: "0",
          paddingBottom: "0",
        }}
      >
        <Typography className="cardTypo">Problem - {doc?.problem}</Typography>
      </CardContent>
    </Card>
  );
};
export default TodayApp;
