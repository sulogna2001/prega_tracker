const {
  updateController,
  SlotTimeController,
} = require("../../../controllers/Docs/Info/UpdateController");
const { verifyDocJWT } = require("../../../middlewares/Doctors/VerifyJwt");
const {
  getController,
} = require("../../../controllers/Docs/Info/GetController");
const router = require("express").Router();

// Update Doctor Info

router.put("/updateSlotTime", verifyDocJWT, SlotTimeController);
router.put("/updateInfo", verifyDocJWT, updateController);
router.get("/getInfo", verifyDocJWT, getController);

module.exports = router;
