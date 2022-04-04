import React from 'react'

// import NavbarAll from '../../Components/Navbar/Navbar'
// import SideBarForPhone from '../../Components/OverviewDashboard/SideBar/SideBarForPhone'
// import SideBar from '../../Components/OverviewDashboard/SideBar/SideBar'
import Appointment from '../PatientDashboard/Appointment/Appointment'
import { Information } from './Information/Information'
import Sidebar from './Sidebar/Sidebar'
import  {Topbar}  from './Topbar/Topbar'
import { Calender } from './Calender/Calender'

export const DashboardPatient = () => {
  return (
    <div >
        {/* <NavbarAll /> */}
        {/* <SideBar /> */}
        <Topbar/>
        <Sidebar/>
        <Appointment/>
        <Information/>
        <Calender/>

        {/* <SideBarForPhone /> */}
       

    </div>
  )
}
