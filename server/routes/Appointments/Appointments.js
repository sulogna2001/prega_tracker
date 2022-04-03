const { createAppointment } = require("../../controllers/Appointments/Appointment")
const { verifyPatientJWT } = require("../../middlewares/Patient/VerifyJwt")

const router = require("express").Router()

router.post("/create",verifyPatientJWT,createAppointment)

module.exports = router