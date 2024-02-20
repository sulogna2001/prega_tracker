const bcrypt = require("bcrypt");
const Doctors = require("../../../models/Doctors");

const registerController = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const NewUser = new Doctors({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      phone: req.body.phone,
    });

    const user = await NewUser.save();

    return res.status(201).json(user);
  } catch (error) {
    return res.status(403).json(error.message);
  }
};

module.exports = { registerController };
