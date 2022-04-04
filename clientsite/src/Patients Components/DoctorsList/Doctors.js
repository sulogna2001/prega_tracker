import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';
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
import Button from "react-bootstrap/Button"
import {api_url} from '../../Urls/Api'
import "./doctors.css"

export const Doctors = () => {
  const _id = useParams().docId;
  const [docData, setDocData] = useState([]);
  const [doctorProfile,setDoctorProfile]=useState();
  
  useEffect(() => {
    const getProfileData = async () => {
      try {
        
        const response = await axios.get(
          `${api_url}/doc/${_id}`,
        );

        if (response.status === 200) {
          setDoctorProfile(response.data);
          
        }
      } catch (error) {
        console.log(error);
      }
    };
    const getData = async () => {
      const url = "http://localhost:5000/doc/getdoc";

      try {
        const resp = await fetch(url);
        const data = await resp.json();
        setDocData(data);
      } catch (err) {
        console.error(err);
      }
    };

    getData();
    getProfileData();
  }, [_id]);
  return (
    <>
      <NavbarAll />

      <div style={{ margin: "20px" }}>
        <Row xs={1} md={3} className="g-4">
          {docData.map((doc) => (
            <Col>
              <Card style={{ backgroundColor: "cornsilk",borderRadius:'30px'}}>
                {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
                <Card.Body>
                  <Card.Title style={{textAlign:'center',marginBottom:'2vh'}}>{doc.name}</Card.Title>
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

                    <p>
                      <AiFillStar />
                      <span style={{ margin: "10px" }}>{doc.reviews}</span>
                    </p>
                  </Card.Text>
                  <div style={{textAlign:'center'}}>
                  <Button variant="outline-secondary buttonBook" style={{margin:"10px",paddingLeft:'20px',paddingRight:'20px' }}>Book</Button>{' '}
                  
                 <Button variant="outline-secondary buttonBook" >View Profile</Button>{' '}
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
