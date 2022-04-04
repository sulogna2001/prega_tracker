import React from 'react'
import { Chat } from '../../chatBot/Chat'
import NavbarAll from '../../Navbar/Navbar'
import SideBar from '../SideBar/SideBar'
import SideBarForPhone from '../SideBar/SideBarForPhone'

const Overview = () => {
  return (
    <div>
      <Chat/>
        <NavbarAll />
        <SideBar />
        <SideBarForPhone />
    </div>
  )
}

export default Overview