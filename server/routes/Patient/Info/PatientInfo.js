const {getPatientInfo} = require('../../../controllers/Patient/Info/GetPatient');
const {updatePatientInfo}= require('../../../controllers/Patient/Info/UpdatePatient');

const router = require("express").Router();

const {verifyPatientJWT}=require("../../../middlewares/Patient/VerifyJwt");

router.get("/patientinfo",verifyPatientJWT,getPatientInfo);
router.put("/updatepatient", verifyPatientJWT , updatePatientInfo);

module.exports = router