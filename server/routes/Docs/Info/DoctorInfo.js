const {
  updateController,
  SlotTimeController,
} = require("../../../controllers/Docs/Info/UpdateController");
const { verifyDocJWT } = require("../../../middlewares/Doctors/VerifyJwt");
const {
  getController,
  getAllDocController,
  getDoctorById
} = require("../../../controllers/Docs/Info/GetController");
const { getNotificationOfDoc } = require("../../../controllers/Notifications/NotificationController");
const router = require("express").Router();

// Update Doctor Info

router.put("/updateSlotTime", verifyDocJWT, SlotTimeController);
router.put("/updateInfo", verifyDocJWT, updateController);
router.get("/getInfo", verifyDocJWT, getController);
router.get("/getdoc", getAllDocController);
router.get("/:id" , verifyDocJWT, getDoctorById);

module.exports = router;
