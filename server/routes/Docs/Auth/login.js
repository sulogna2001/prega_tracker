const {
  logincontroller,
} = require("../../../controllers/Docs/Auth/logincontroller");

const router = require("express").Router();

router.post("/login", logincontroller);

module.exports = router;
