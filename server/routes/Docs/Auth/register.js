const {
  registerController,
} = require("../../../controllers/Docs/Auth/registercontroller");

const router = require("express").Router();

router.post("/register", registerController);

module.exports = router
