import axios from "axios";
import { React, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api_url } from "../Urls/Api";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider(props) {
  const history = useNavigate();

  const [data, setdata] = useState("");
  const [patientdata, setPatientData] = useState("");

  const Doctor_signUp = (body) => {
    axios
      .post(`${api_url}doc/register/`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        history("/doctorlogin");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Doctor_login = (body) => {
    axios
      .post(`${api_url}doc/login/`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        setdata(user);
        history("/doctorDetails");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const Patient_signUp = (body) => {
    axios
      .post(`${api_url}patient/register/`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        history("/patientLogin");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Patient_login = (body) => {
    axios
      .post(`${api_url}patient/login/`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const { token, result } = res.data;
        localStorage.setItem("patientToken", token);
        setPatientData(result);
        history("/patientdetailForm");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signOutPatient = () => {
    localStorage.removeItem("patientToken");

    history("/patientLogin");
  };

  const signOut = () => {
    localStorage.removeItem("token");

    history("/doctorlogin");
  };

  const value = {
    Doctor_signUp,
    Doctor_login,
    Patient_signUp,
    Patient_login,
    signOutPatient,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
