import React from 'react'
import './PatientForm.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Typography } from '@material-ui/core'
import Trimester from './Trimester'
import PatienCountries from '../Countries/PatientCountires'
import { Button } from '@material-ui/core'


const PatientForm = () => {
    return (
        <div className='patient-form'>
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
                        <Col className="trimester-col">
                            <Typography variant="h6" component="h2" className='trimester-text'>
                                Trimester -
                            </Typography>
                            <Trimester />
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className='form-part-two'>
                <Container>
                    <Row>
                        <Col sm={2}>
                            <Typography variant="h6" component="h2">
                                Problems <br />(if any)
                            </Typography>
                        </Col>
                        <Col sm={10}>
                            <textarea
                                type="message"
                                placeholder='If you are facing any problems....'
                                className="form-control"
                                rows="4"
                                style={{
                                    marginLeft: "12%",
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
                                Country and City - <PatienCountries />
                            </Typography>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className='form-part-three'>
                <Container>
                    <Row>
                        <Col>
                            <Button variant="contained" disableElevation className='submit-button'>
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default PatientForm