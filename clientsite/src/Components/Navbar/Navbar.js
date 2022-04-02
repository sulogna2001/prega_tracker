import React from 'react'
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Image4 from "../assets/Logo.png";
import { Typography } from "@material-ui/core";
import { HiUserCircle } from "react-icons/hi";
import './Navbar.css'

const NavbarAll = () => {
    return (
        <div>
            <Navbar className="dashboard-navbar">
                <Container>
                    <Navbar.Brand href="#home">
                        <Typography
                            style={{
                                fontSize: "30px",
                                fontFamily: "Luckiest Guy",
                                marginLeft: "3vw",
                                alignItems: "center",
                                justifyContent: "space-around",
                                color: "white",
                            }}
                            noWrap
                            component="div"
                            sx={{ display: { xs: "none", sm: "flex" } }}
                        >
                            <img src={Image4} alt="doctorimg" width="125px" height="125px" className="logoImg" />{" "}
                            <span className="lapi"> PREGBUDDY</span>
                        </Typography>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <HiUserCircle size="60px" style={{ color: 'white' }} />
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavbarAll
