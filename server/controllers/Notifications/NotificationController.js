const Notifications = require("../../models/Notifications");
const { isValidObjectId } = require("mongoose");

const getNotificationOfDoc = async (req, res) => {
  try {
    const decodedValue = req.user;
    if (!decodedValue)
      return res.status(403).json("No Authorization Token Sent");
    const id = decodedValue._id;
    if (!isValidObjectId(id)) return res.status(403).json("Invalid User");

    const notification = await Notifications.find({ doctorId: id });

    return res.status(200).json(notification);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getNotificationOfPatient = async (req, res) => {
  try {
    const decodedValue = req.user;
    if (!decodedValue)
      return res.status(403).json("No Authorization Token Sent");

    const id = decodedValue.patientid;

    if (!isValidObjectId(id)) return res.status(403).json("Invalid User");
    const notification = await Notifications.find({ patientId: id });

    return res.status(200).json(notification);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { getNotificationOfDoc ,getNotificationOfPatient};
