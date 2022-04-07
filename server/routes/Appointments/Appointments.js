//biuBAIUB

const {
  createAppointment,
  getAppointmentOfDoc,
  AppointmentCompletedController,
  CancelAppointment,
  getAppointmentOfDocPerDay,
  getAppointmentOfPatient,
  getAppointmentOfPatientPerDay,
} = require("../../controllers/Appointments/Appointment");
const { verifyPatientJWT } = require("../../middlewares/Patient/VerifyJwt");
const { verifyDocJWT } = require("../../middlewares/Doctors/VerifyJwt");

const router = require("express").Router();

router.post("/create", verifyPatientJWT, createAppointment);

router.get("/get", verifyDocJWT, getAppointmentOfDoc);

router.get("/getperdate", verifyDocJWT, getAppointmentOfDocPerDay);

router.get("/get/patient/", verifyPatientJWT, getAppointmentOfPatient);

router.get(
  "/getperpatientdate",
  verifyPatientJWT,
  getAppointmentOfPatientPerDay
);

router.put("/complete", verifyDocJWT, AppointmentCompletedController);

router.put("/cancel", verifyPatientJWT, CancelAppointment);

module.exports = router;
