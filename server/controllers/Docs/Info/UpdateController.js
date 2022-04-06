const { isValidObjectId } = require("mongoose");
const Doctors = require("../../../models/Doctors");

// Update Description Of Doctor

const updateController = async (req, res) => {
  try {
    console.log(req.body);
    const decodedValue = req.user;
    if (!decodedValue)
      return res.status(403).json("No Authorization Token Sent");
    const id = decodedValue._id;
    if (!isValidObjectId(id)) return res.status(403).json("Invalid User");
    const doctor = await Doctors.findOne({ _id: id });
    if (!doctor) return res.status(403).json("No Such User has Logged In");
    if(!req.body) return res.status(400).json("No updates are sent")
    if (doctor._id == id) {
      await doctor.updateOne({ $set: req.body });
      return res.status(200).json("Doctor Information Is Updated");
    } else {
      return res.status(403).json("You can update your own info");
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// Update Profile Picture Of Doctor

const SlotTimeController = async (req, res) => {
  try {
    const decodedValue = req.user;
    if (!decodedValue)
      return res.status(403).json("No Authorization Token Sent");
    const id = decodedValue._id;
    if (!isValidObjectId(id)) return res.status(403).json("Invalid User");
    const doctor = await Doctors.findOne({ _id: id });
    if (!doctor) return res.status(403).json("No Such User has Logged In");
    if (doctor._id == id) {
      if (req.body.startslotTime) {
        const slotTiming = req.body.startslotTime.split(":");
        doctor.startTimeHours = parseInt(slotTiming[0]);
        doctor.startTimeMinutes = parseInt(slotTiming[1]);
      }
      if (req.body.endslotTime) {
        const endslotTiming = req.body.endslotTime.split(":");
        doctor.endTimeHours = parseInt(endslotTiming[0]);
        doctor.endTimeMinutes = parseInt(endslotTiming[1]);
      }
      await doctor.save();
      return res.status(200).json("Doctor Start Timing Is updated");
    } else {
      return res.status(403).json("You can update your own info");
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { updateController, SlotTimeController };
