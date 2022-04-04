const {
  createAppointment,
  getAppointmentOfDoc,
  AppointmentCompletedController,
  CancelAppointment,
} = require("../../controllers/Appointments/Appointment");
const { verifyPatientJWT } = require("../../middlewares/Patient/VerifyJwt");
const { verifyDocJWT } = require("../../middlewares/Doctors/VerifyJwt");

const router = require("express").Router();

router.post("/create", verifyPatientJWT, createAppointment);

router.get("/get", verifyDocJWT, getAppointmentOfDoc);

router.put("/complete", verifyDocJWT, AppointmentCompletedController);

router.delete("/cancel", verifyPatientJWT, CancelAppointment);

module.exports = router;
