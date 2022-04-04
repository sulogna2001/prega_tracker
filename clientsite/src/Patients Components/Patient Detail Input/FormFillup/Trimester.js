import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import './PatientForm.css'

const Trimester = () => {
    return (
        <div className='trimester-dropdown'>
            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic"
                style={{
                    backgroundColor: "#FEFEDF",
                    color: "black",
                    border: "2px solid black",
                    borderRadius: "10px"
                }}
                >
                    Choose
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">1st</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">2nd</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">3rd</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default Trimester