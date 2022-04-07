import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
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
        <Typography className="cardTypo">
          City - {res.city }
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
        <Typography className="cardTypo">
          Expirity - {doc?.expirity}
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
        <Typography className="cardTypo">Price - {doc?.Price}</Typography>
        <Typography className="cardTypo">
          Date -  { moment.utc(doc?.Date).format('DD/MM/YYYY')}
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
