import React, { useState, useEffect } from "react";
import NavbarAll from "../Navbar/Navbar";
import "./DoctorDetails.css";

import { useParams } from "react-router-dom";
import { api_url } from "../../Urls/Api";
import axios from "axios";
import { DoctorCard } from "./DoctorCard";

const DoctorDetails = () => {
  const [docData, setDocData] = useState([]);

  const { id } = useParams();

  // console.log(id);

  const getData = async () => {
    try {
      const response = await axios.get(`${api_url}doc/${id}`);
      if (response.status === 200) {
        setDocData(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <NavbarAll />
      <div className="details-section">
        <>
          <DoctorCard doc={docData} />
        </>
      </div>
    </div>
  );
};

export default DoctorDetails;
