const Doctors = require("../../../models/Doctors");

const addDoctorController = async (req, res) => {
  try {
    const doctorId = req.body.doctorId;

    if (!isValidObjectId(doctorId)) return res.status(403).json("Invalid User");

    const doctor = await Doctors.findById({_id : doctorId});

    const decodedValue = req.user;
    if (!decodedValue)
      return res.status(403).json("No Authorization Token Sent");

    const id = decodedValue.patientid;

    if (!isValidObjectId(id)) 
        return res.status(403).json("Invalid User");

    if(doctor.patients.includes(id)){
        return res.status(400).json("You are already added")
    }    

   


  } catch (error) {
    return res.status(500).json(error.message);
  }
};
