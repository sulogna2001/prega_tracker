const Doctors = require("../../../models/Doctors");
const Notifications = require("../../../models/Notifications");
const Patients = require("../../../models/Patients");
const { isValidObjectId } = require("mongoose");

const addDoctorController = async (req, res) => {
  try {
    const doctorId = req.body.doctorId;

    if (!isValidObjectId(doctorId)) return res.status(403).json("Invalid User");

    const doctor = await Doctors.findById({ _id: doctorId });

    const decodedValue = req.user;
    if (!decodedValue)
      return res.status(403).json("No Authorization Token Sent");

    const id = decodedValue.patientid;

    if (!isValidObjectId(id)) return res.status(403).json("Invalid User");

    if (doctor.patients.includes(id)) {
      return res.status(400).json("You are already added");
    }

    const patient = await Patients.findById({ _id: id });

    const NotificationObj = {
      doctorId: req.body.doctorId,
      patientId: id,
      context: `Hello ${doctor.name} you have been sent invite for subscription by ${patient.name}`,
    };

    const Notification = new Notifications(NotificationObj);

    await Notification.save();

    return res.status(201).json("Invite Sent");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// Accept Invitation

const acceptInvitation = async (req, res) => {
  try {
    const decodedValue = req.user;
    if (!decodedValue)
      return res.status(403).json("No Authorization Token Sent");
    const id = decodedValue._id;
    if (!isValidObjectId(id)) return res.status(403).json("Invalid User");

    const doctor = await Doctors.findById({ _id: id });

    if (!doctor) return res.status(400).json("No Such Doctor user is present");

    const notification = await Notifications.findById({
      _id: req.body.notificationId,
    });

    

    if (!notification)
      return res.status(403).json("No such notification is present");

      const patient = await Patients.findById({
        _id: notification.patientId,
      });

    if (notification.accept == "accepted")
      return res.status(403).json("Already Accepted");

    if (doctor.patients.includes(notification.patientId)) {
      return res.status(400).json("You are already added");
    }

    if (patient.doctors.includes(id)) {
      return res.status(400).json("You are already added");
    }

    notification.accept = "accepted";

    await notification.save();

    await Doctors.findByIdAndUpdate(
      { _id: id },
      { $push: { patients: notification.patientId } }
    );

    await Patients.findByIdAndUpdate(
      { _id: notification.patientId },
      { $push: { doctors: id } }
    );

    const NotificationObj = {
      patientId: patient._id,
      doctorId: id,
      context: `Hello ${patient.name} your invitation for ${doctor.name} has been accepted`,
    };

    const Notification = new Notifications(NotificationObj);

    await Notification.save();

    return res.status(200).json("Invitation accepted");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// Remove Subscription

const removeSubscription = async(req,res) => {
  try {
    const decodedValue = req.user;
    if (!decodedValue)
      return res.status(403).json("No Authorization Token Sent");

    const id = decodedValue.patientid;

    if (!isValidObjectId(id)) return res.status(403).json("Invalid User");

    const doctor = await Doctors.findById({_id : req.body.doctorId})

    const patient = await Patients.findById({_id : id})

   
    await Doctors.findByIdAndUpdate(
      { _id: req.body.doctorId },
      { $pull: {patients : patient._id } }
    );

    await Patients.findByIdAndUpdate(
      { _id: id },
      { $pull: { doctors: req.body.doctorId } }
    );

    const NotificationObj = {
      doctorId: req.body.doctorId,
      patientId: id,
      context: `Hello ${patient.name} your subscription for ${doctor.name} has been terminated`,
    };

    const Notification = new Notifications(NotificationObj);

    await Notification.save();

    return res.status(200).json("Subscription Removed")

  } catch (error) {
    return res.status(500).json(error.message);
  }
}

module.exports = { addDoctorController, acceptInvitation,removeSubscription };
