import axios from "axios";
import { React, createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api_url } from "../Urls/Api";
import { toast } from "react-toastify";
export const PatientInfoContext = createContext({});

export const usePatientInfo = () => useContext(PatientInfoContext);

export default function PatientInfoContextProvider(props) {
  const history = useNavigate();

  const token = window.localStorage.getItem("patientToken");

  const [patientInfo, setpatientInfo] = useState("");
  const [appointmentList, setappointmentList] = useState([]);
  const [appointmentListAll, setappointmentListAll] = useState([]);

  useEffect(() => {
    if (token) {
      axios
        .get(`${api_url}patient/patientinfo/`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setpatientInfo(res.data);
          //    setpatientNumber(res.data.patients.length)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios
        .get(`${api_url}appointment/getperpatientdate/`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setappointmentList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios
        .get(`${api_url}appointment/get/patient/`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setappointmentListAll(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const updatePatientInfo = (body) => {
    console.log(body);
    axios
      .put(`${api_url}patient/updatepatient`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res1) => {
        axios
          .get(`${api_url}patient/patientinfo`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            setpatientInfo(res.data);
            // console.log(res.data)
            history("/patientdashboard");
            // toast.success("Updated successfully!!");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const value = {
    patientInfo,
    appointmentList,
    appointmentListAll,
    updatePatientInfo,
  };

  return (
    <PatientInfoContext.Provider value={value}>
      {props.children}
    </PatientInfoContext.Provider>
  );
}
