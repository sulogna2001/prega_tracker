import axios from "axios";
import { React, createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api_url } from "../Urls/Api";

export const DoctorInfoContext = createContext({});

export const useDoctorInfo = () => useContext(DoctorInfoContext);

export default function DoctorInfoContextProvider(props) {
  const history = useNavigate();

  const token = window.localStorage.getItem("token")

  const [doctorInfo, setdoctorInfo] = useState("");
  const [patientdetails,setpatientdetails] = useState([])
  const [patientNumber,setpatientNumber] = useState("")
  
  useEffect(()=>{
    axios.get(`${api_url}doc/getInfo/`, { headers: {"Authorization" : `Bearer ${token}`} })
    .then(res => {
        setdoctorInfo(res.data);
       setpatientNumber(res.data.patients.length)
    })
    .catch((err)=>{
        console.log(err)
    })
  },[])

  useEffect(()=>{
    axios.get(`${api_url}doc/patients/`, { headers: {"Authorization" : `Bearer ${token}`} })
    .then(res => {
      setpatientdetails(res.data)
    })
    .catch((err)=>{
        console.log(err)
    })
  },[])



  const value = {
     doctorInfo,
     patientNumber,
     patientdetails
  };

  return (
    <DoctorInfoContext.Provider value={value}>{props.children}</DoctorInfoContext.Provider>
  );
}
