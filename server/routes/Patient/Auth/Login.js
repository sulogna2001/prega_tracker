const { loginPatient } = require("../../../controllers/Patient/Auth/login");

const router = require("express").Router();

router.post("/login", loginPatient);

module.exports = router;
