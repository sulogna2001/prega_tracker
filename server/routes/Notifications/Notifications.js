const { getNotificationOfDoc, getNotificationOfPatient } = require("../../controllers/Notifications/NotificationController");
const { verifyDocJWT } = require("../../middlewares/Doctors/VerifyJwt");
const { verifyPatientJWT } = require("../../middlewares/Patient/VerifyJwt");

const router = require("express").Router();

router.get("/doc",verifyDocJWT,getNotificationOfDoc)
router.get("/patient",verifyPatientJWT,getNotificationOfPatient)

module.exports = router