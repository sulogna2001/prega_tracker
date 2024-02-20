import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "./Home.css";
import { useDoctorInfo } from "../../../Context/DoctorInfoContext";
import axios from "axios";
import { api_url } from "../../../Urls/Api";
import { Calender } from "../../../Patients Components/PatientDashboard/Calender/Calender";
import Image1 from "../../assets/appointment.svg";
import Image2 from "../../assets/noresults.svg";
import TodayApp from "./TodayApp";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  const { patientNumber, patientdetails } = useDoctorInfo();
  const token = window.localStorage.getItem("token");

  const [appointment, setappointment] = useState("");

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = dd + "-" + mm + "-" + yyyy;

  useEffect(() => {
    axios
      .get(`${api_url}appointment/getperdate/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setappointment(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Get Appointment Of Today

  const [options, setoptions] = useState({
    colors: ["#845ec2", "#4576b5"],
    chart: {
      height: 350,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "70%",
        },
      },
    },
    labels: ["Patients"],
  });

  //   this.state = {
  //     series: [5],
  //     options: {
  //       colors: ["#845ec2", "#4576b5"],
  //       chart: {
  //         height: 350,
  //         type: "radialBar",
  //       },
  //       plotOptions: {
  //         radialBar: {
  //           hollow: {
  //             size: "70%",
  //           },
  //         },
  //       },
  //       labels: ["Patients"],
  //     },
  //   };
  // }

  return (
    <div class="container">
      <div class="row" style={{ gap: "12px", marginTop: "2vh" }}>
        <div class="col gridStats">
          <Card className="patientCard">
            <CardContent>
              <Typography className="patientTypo" align="center">
                Quantity
              </Typography>
              <Typography align="center" variant="subtitle1">
                You have
              </Typography>
              <ReactApexChart
                options={options}
                series={[patientNumber]}
                type="radialBar"
                height={350}
                style={{ textAlign: "center" }}
              />
              <Typography align="center" variant="subtitle1">
                Patients
              </Typography>
            </CardContent>
          </Card>
        </div>
        <div class="col gridStats">
          <Card className="patientCard">
            <CardContent>
              <Typography className="patientTypo" align="center">
                Today's Date
              </Typography>
              <Calender />
            </CardContent>
          </Card>
        </div>
      </div>
      <div class="row" style={{ gap: "12px", marginTop: "2vh" }}>
        <div class="col gridStats">
          <Card className="patientCard">
            <CardContent>
              <Typography className="patientTypo" align="center">
                Today's Appointment
              </Typography>
              {appointment &&
                appointment?.length > 0 &&
                appointment?.map((res) => <TodayApp doc={res} />)}
              {!appointment ||
                (appointment?.length < 0 && (
                  <Typography
                    className="appointmentTypo"
                    align="center"
                    style={{ marginTop: "2vh" }}
                  >
                    No Appointments For Today
                    <img src={Image1} alt="image" />
                  </Typography>
                ))}
            </CardContent>
          </Card>
        </div>
        <div class="col gridStats">
          <Card className="patientCard">
            <CardContent>
              <Typography className="patientTypo" align="center">
                Patients List
              </Typography>
              {!patientdetails && (
                <Typography
                  className="appointmentTypo"
                  align="center"
                  style={{ marginTop: "2vh" }}
                >
                  No Patients Yet
                  <img src={Image2} alt="imag" />
                </Typography>
              )}
              {patientdetails &&
                patientdetails?.map((res) => (
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
                      <Typography className="cardTypo">
                        Patient Name - {res.name}
                      </Typography>
                      <Typography className="cardTypo">
                        Region - {res.city}
                      </Typography>
                    </CardContent>
                    <CardContent
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingTop: "0",
                      }}
                    >
                      <Typography className="cardTypo">
                        Id - {res._id}
                      </Typography>
                      <Typography className="cardTypo">
                        Trimester - {res.trimester}
                      </Typography>
                    </CardContent>

                    <div style={{ textAlign: "center" }}>
                      <Link to={`/patientdetails/${res._id}`}>
                        <Button
                          style={{
                            color: "#845ec2",
                            textTransform: "capitalize",
                            fontFamily: "Amaranth",
                          }}
                        >
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
