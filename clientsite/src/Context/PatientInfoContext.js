import axios from "axios";
import { React, createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api_url } from "../Urls/Api";

export const PatientInfoContext = createContext({});

export const usePatientInfo = () => useContext(PatientInfoContext);

export default function PatientInfoContextProvider(props) {
  const history = useNavigate();

  const token = window.localStorage.getItem("token")

  const [patientInfo, setpatientInfo] = useState("");
//   const [patientdetails,setpatientdetails] = useState([])
//   const [patientNumber,setpatientNumber] = useState("")
  
  useEffect(()=>{
    axios.get(`${api_url}patient/patientinfo/`, { headers: {"Authorization" : `Bearer ${token}`} })
    .then(res => {
        setpatientInfo(res.data);
    //    setpatientNumber(res.data.patients.length)
    })
    .catch((err)=>{
        console.log(err)
    })
  },[])



  const value = {
    patientInfo,
  };

  return (
    <PatientInfoContext.Provider value={value}>{props.children}</PatientInfoContext.Provider>
  );
}
