const {signupPatient} = require('../../../controllers/Patient/Auth/Register');

const router = require("express").Router();

router.post("/register", signupPatient);

module.exports = router