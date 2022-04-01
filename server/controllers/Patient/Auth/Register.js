const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Patients = require("../../../models/Patients");

const signupPatient = async (req, res) => {
  const { name, email, phone, password, confirmPassword } = req.body;
  try {
    const existingPatient = await Patients.findOne({ email, phone });
    if (existingPatient)
      return res.status(400).json({ message: "Patient already exist" });
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords didnt match!!" });
    const encryptedPassword = await bcrypt.hash(password, 10);
    const result = await Patients.create({
      email,
      password: encryptedPassword,
      name,
      phone,
    });
    const token = jwt.sign({
      name: result.name,
      email: result.email,
      id: result._id,
      phone: result.phone,
    } , process.env.JWT_SECRET_KEY);
    res.status(200).json({ result: result, token: token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { signupPatient };
