const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Doctors = require("../../../models/Doctors");

const logincontroller = async (req, res) => {
  try {

    
    

    const user = await Doctors.findOne({ email: req.body.email });

    if (!user) return res.status(404).json("User Not Found");

    // if (!user.verified) return res.status(403).json("Email is not verified");

    const password = await bcrypt.compare(req.body.password, user.password);
    if (!password) return res.status(403).json("Password Doesnt Match");

    const jwttoken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    }); // generating a JWT token with payload of the user id

    return res.status(200).json({
      token: jwttoken,
      user: user,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = { logincontroller };