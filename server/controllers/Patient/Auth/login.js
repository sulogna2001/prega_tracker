const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Patients = require("../../../models/Patients");

const loginPatient = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingPatient = await Patients.findOne({ email });
    if (!existingPatient) {
      return res.status(400).json({ message: "Patient not found!!" });
    }
    const passwordCorrect = await bcrypt.compare(
      password,
      existingPatient.password
    );
    if (!passwordCorrect) {
      return res.status(400).json({ message: "Invalid password!!" });
    }
    const jwttoken = jwt.sign(
      { patientid: existingPatient._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    ); // generating a JWT token with payload of the user id
    return res.status(201).json({ result: existingPatient, token: jwttoken });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
module.exports = { loginPatient };
