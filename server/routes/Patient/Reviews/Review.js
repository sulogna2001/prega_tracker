const router = require("express").Router();

const {
  addreviewController,
  getReviewOfDoc,
  deleteReviewOfDoc,
} = require("../../../controllers/Patient/Reviews/Review");
const { verifyPatientJWT } = require("../../../middlewares/Patient/VerifyJwt");

router.post("/add", verifyPatientJWT, addreviewController);
router.put("/get", getReviewOfDoc);
router.delete("/delete", verifyPatientJWT, deleteReviewOfDoc);

module.exports = router;
