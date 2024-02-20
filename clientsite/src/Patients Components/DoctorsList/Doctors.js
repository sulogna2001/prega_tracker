import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "./doctors.css";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import NavbarAll from "../../Components/Navbar/Navbar";
import { AiFillPlusSquare } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";
import { FaHospital } from "react-icons/fa";
import { AiFillPhone } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import { api_url } from "../../Urls/Api";
import "./doctors.css";
import AddAppModal from "../AddAppointment/AddAppointment";
import { toast } from "react-toastify";

export const Doctors = () => {
  const [docData, setDocData] = useState([]);

  const [id, setid] = useState("");

  const [handleClick, setHandleClick] = useState(false);

  const setOpen = () => {
    setHandleClick(true);
  };

  const setClose = () => {
    setHandleClick(false);
  };

  const token = window.localStorage.getItem("patientToken");

  const [getPatientInfo, setPatientInfo] = useState("");

  useEffect(() => {
    axios
      .get(`${api_url}patient/patientinfo/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);

        setPatientInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getData = () => {
    // const url = "http://localhost:5000/doc/getdoc";

    // try {
    //   const resp = await fetch(`${api_url}doc/getdoc`);
    //   const data = await resp.json();
    //   setDocData(data);
    // } catch (err) {
    //   console.error(err);
    // }
    axios
      .get(`${api_url}doc/getdoc`, {})
      .then((res) => {
        console.log(res.data);

        setDocData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const handleSubcription = (e) => {
    const body = {
      doctorId: e,
    };
    axios
      .post(`${api_url}doc/sendInvite`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        axios
          .get(`${api_url}doc/getdoc`)
          .then((res) => {
            setDocData(res.data);
            toast.success("Sent Subscription successfully!!");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUnSubcription = (e) => {
    const body = {
      doctorId: e,
    };
    axios
      .post(`${api_url}doc/removeSubscription/`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        axios
          .get(`${api_url}doc/getdoc`)
          .then((res) => {
            console.log(res.data);
            setDocData(res.data);
            toast.success("Unsubscribed successfully!!");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(docData);
  return (
    <>
      <NavbarAll />

      <div style={{ margin: "20px" }}>
        <Row xs={1} md={3} className="g-4">
          {docData.map((doc) => (
            <Col>
              <Card
                style={{ backgroundColor: "cornsilk", borderRadius: "30px" }}
              >
                {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
                <Card.Body style={{ borderRadius: "30px" }}>
                  <Card.Title
                    style={{ textAlign: "center", marginBottom: "2vh" }}
                  >
                    {doc.name}
                  </Card.Title>
                  <Card.Text>
                    <p>
                      <AiFillPhone />
                      <span style={{ margin: "10px" }}>{doc.phone}</span>
                    </p>
                    <p>
                      <MdEmail />
                      <span style={{ margin: "10px" }}>{doc.email}</span>
                    </p>
                    <p>
                      <AiFillPlusSquare />
                      <span style={{ margin: "10px" }}>{doc.desc}</span>
                    </p>

                    <p>
                      <HiLocationMarker />
                      <span style={{ margin: "10px" }}>{doc.city}</span>
                    </p>

                    <p>
                      <FaHospital />
                      <span style={{ margin: "10px" }}>{doc.hospital}</span>
                    </p>
                  </Card.Text>
                  <div style={{ textAlign: "center" }}>
                    {doc.patients.includes(getPatientInfo?._id) && (
                      <Button
                        variant="outline"
                        className="buttonBook"
                        style={{
                          margin: "10px",
                          paddingLeft: "20px",
                          paddingRight: "20px",
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          setid(doc?._id);
                          setOpen();
                        }}
                      >
                        Book
                      </Button>
                    )}
                    <Link to={`/doctor/${doc._id}`}>
                      <Button variant="outline" className="buttonBook">
                        View Profile
                      </Button>{" "}
                    </Link>
                    {console.log(doc?.price)}
                    <AddAppModal
                      open={handleClick}
                      onClose={setClose}
                      id={id}
                    />

                    {!doc.patients.includes(getPatientInfo?._id) ? (
                      <Button
                        variant="outline"
                        className="buttonBook"
                        onClick={(e) => {
                          e.preventDefault();
                          handleSubcription(doc?._id);
                        }}
                      >
                        Subscribe
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        className="buttonBook"
                        onClick={(e) => {
                          e.preventDefault();
                          handleUnSubcription(doc?._id);
                        }}
                      >
                        UnSubscribe
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};
