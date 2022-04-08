const Notifications = require("../../models/Notifications");
const { isValidObjectId } = require("mongoose");

const getNotificationOfDoc = async (req, res) => {
  try {
    const decodedValue = req.user;
    if (!decodedValue)
      return res.status(403).json("No Authorization Token Sent");
    const id = decodedValue._id;
    if (!isValidObjectId(id)) return res.status(403).json("Invalid User");

    const notification = await Notifications.find({ doctorId: id }).sort({createdAt: -1});

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
   Notifications.find({ patientId: id }).sort({createdAt: -1}).exec((err, docs) => { 
     if(err)return res.status(400).json(err.message)
     return res.status(200).json(docs)
    })

  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { getNotificationOfDoc ,getNotificationOfPatient};
