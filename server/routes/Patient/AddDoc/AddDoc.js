const {
  addDoctorController,
  acceptInvitation,
  removeSubscription,
} = require("../../../controllers/Patient/Info/AddDoctor");
const { verifyDocJWT } = require("../../../middlewares/Doctors/VerifyJwt");
const { verifyPatientJWT } = require("../../../middlewares/Patient/VerifyJwt");

const router = require("express").Router();

router.post("/sendInvite", verifyPatientJWT, addDoctorController);
router.post("/acceptInvitation", verifyDocJWT, acceptInvitation);
router.post("/removeSubscription", verifyPatientJWT, removeSubscription);

module.exports = router;
