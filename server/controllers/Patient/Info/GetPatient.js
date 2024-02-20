const Patients = require("../../../models/Patients");
const Doctors = require("../../../models/Doctors");

const { isValidObjectId } = require("mongoose");

const getPatientInfo = async (req, res) => {
  try {
    const decodedValue = req.user;

    if (!decodedValue)
      return res.status(403).json("No Authorization Token Sent");
    const id = decodedValue.patientid;

    if (!isValidObjectId(id)) {
      return res.status(403).json("Invalid User");
    }
    const patient = await Patients.findOne({ _id: id });
    if (!patient) return res.status(403).json("No Such User has Logged In");
    return res.status(200).json(patient);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const getPatientById = async (req, res) => {
  try {
    const patientId = req.params.id;
    const findPatient = await Patients.findOne({ _id: patientId });
    if (findPatient) {
      return res.status(200).json(findPatient);
    } else return res.status(403).json("patient not found");
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
const getAllPatient = async (req, res) => {
  try {
    const patient = await Patients.find();

    res.status(200).json(patient);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getAllDocOfAPatient = async (req, res) => {
  try {
    const decodedValue = req.user;

    if (!decodedValue)
      return res.status(403).json("No Authorization Token Sent");
    const id = decodedValue.patientid;

    console.log(req.user);

    if (!isValidObjectId(id)) {
      return res.status(403).json("Invalid User");
    }

    const doctor = await Patients.findById({ _id: id });

    if (!doctor) return res.status(403).json("No Such Doctor is present");

    const records = await Doctors.find({ _id: { $in: doctor.doctors } });

    if (!records) return res.status(400).json("No patients found");

    return res.status(200).json(records);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  getPatientInfo,
  getPatientById,
  getAllPatient,
  getAllDocOfAPatient,
};
