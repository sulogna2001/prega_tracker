import React,{useState,useEffect} from 'react'
import NavbarAll from '../../Components/Navbar/Navbar'
import { Typography } from '@material-ui/core'
import { Row } from 'react-bootstrap'
import { api_url } from '../../Urls/Api'
import AppointmentsAll from './AppointmentsAll'

const Appointments = () => {
    const token = window.localStorage.getItem("patientToken")

    const [appointmentdetails,setappointmentdetails] = useState("")
  return (
    <>
      <NavbarAll />
      <Typography
        className="patientTypo"
        align="center"
        style={{ marginTop: "2vh" }}
      >
        Your Appointments
      </Typography>
      <div style={{ margin: "20px" }}>
        <Row xs={1} md={2} className="g-4">
        {/* {appointmentdetails &&( appointmentdetails?.map((doc) => (
           <AppointmentLists doc={doc}/>
        )))} */}
        <AppointmentsAll/>
        </Row>
      </div>
    </>
  )
}

export default Appointments