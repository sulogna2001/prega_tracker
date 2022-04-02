const bcrypt = require("bcrypt");
const Patients = require("../../../models/Patients");

const signupPatient = async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    const result = await Patients.create({
      email,
      password: encryptedPassword,
      name,
      phone,
    });

    res.status(201).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { signupPatient };
