import React from 'react'
import './FormFillup.css'
import { Typography } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import TimeSlot from './TimeSlot'
import PriceBox from './PriceBox'
import Country from './Country'
import { Button } from '@material-ui/core'

const FormFillup = () => {
  return (
    <div className='form-section'>
      <div className='profile-pic'>
        <label htmlFor="upload-button">
          <FontAwesomeIcon icon={faUserPlus} className="add-icon" />
        </label>
      </div>
      <input
        type="file"
        id="upload-button"
        style={{ display: "none" }}
      />

      <div className='form-part-one'>
        <Container>
          <Row>
            <Col>
              <Typography variant="h6" component="h2">
                Name - Sumeli Debdas
              </Typography>
            </Col>
            <Col>
              <Typography variant="h6" component="h2">
                Email - sumeli.debdas22@gmail.com
              </Typography>
            </Col>
          </Row>

          <Row>
            <Col>
              <Typography variant="h6" component="h2">
                Phone Number - 9832136974
              </Typography>
            </Col>
            <Col>
              <Typography variant="h6" component="h2">
                Choose a Time Slot -
              </Typography>
              <TimeSlot /> till <TimeSlot />
            </Col>
          </Row>
        </Container>
      </div>

      <div className='form-part-two'>
        <Container>
          <Row>
            <Col sm={2}>
              <Typography variant="h6" component="h2">
                Description
              </Typography>
            </Col>
            <Col sm={10}>
              <textarea
                type="message"
                placeholder='Provide the necessary details about you....'
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="4"
                style={{
                  marginLeft: "1%",
                  borderRadius: "16px",
                }}
              />
            </Col>
          </Row>
        </Container>
      </div>

      <div className='form-part-three'>
        <Container>
          <Row>
            <Col>
              <Typography variant="h6" component="h2">
                Fees - <PriceBox />
              </Typography>
            </Col>
            <Col>
              <Typography variant="h6" component="h2">
                Country and City - <Country />
              </Typography>
            </Col>
          </Row>
        </Container>
      </div>
      <Button variant="contained" disableElevation className='submit-button'>
        Submit 
      </Button>
    </div>
  )
}

export default FormFillup