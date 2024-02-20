// Appointment Creation
const { isValidObjectId } = require("mongoose");
const Appointments = require("../../models/Appointments");
const Doctors = require("../../models/Doctors");
const Patient = require("../../models/Patients");
const sgMail = require("@sendgrid/mail");
const { generateEmailTemplater } = require("./mails");
const moment = require("moment");
const Patients = require("../../models/Patients");

const compareDates = (date1, date2) => {
  const date = new Date(date1);
  const date3 = new Date(date2);
  if (date.getTime() === date3.getTime()) return true;
  return false;
};

// Booking An Appointment By A Patient
const createAppointment = async (req, res) => {
  try {
    const { patientId, DoctorId, startSlotTime, endSlotTime, date } = req.body;
    if (!isValidObjectId(patientId))
      return res.status(403).json("Not a Valid Patient User");
    if (!isValidObjectId(DoctorId))
      return res.status(403).json("Not a Valid Doctor User");
    const patient = await Patient.findOne({ _id: patientId });
    const doctor = await Doctors.findOne({ _id: DoctorId });

    if (!patient) return res.status(403).json("No such user is logged in");
    if (!doctor) return res.status(403).json("No such user is logged in");
    if (!startSlotTime || !endSlotTime)
      return res.status(403).json("Enter the time of the appointment");
    if (startSlotTime && endSlotTime) {
      let patientExistingAppointments = patient?.appointments;
      for (let i = 0; i < patientExistingAppointments?.length; i++) {
        let particularappointment = await Appointments.findOne({
          _id: patientExistingAppointments[i],
        });
        if (particularappointment?.Status === "notcompleted")
          return res.status(400).json("You already have a booked appointment.");
      }
      const slotTiming = startSlotTime.split(":");
      const endslotTiming = endSlotTime.split(":");
      if (
        parseInt(slotTiming[0]) < doctor.startTimeHours ||
        parseInt(endslotTiming[0]) > doctor.endTimeHours
      )
        return res.status(403).json("Please booked between the doctor timings");

      let doctorAppointments = doctor?.appointments;

      console.log(doctorAppointments);

      for (let i = 0; i < doctorAppointments?.length; i++) {
        let particularappointment = await Appointments.findOne({
          _id: doctorAppointments[i],
        });
        if (!particularappointment) continue;
        let formattedStartTime1 =
          particularappointment.startTimeHours * 60 +
          particularappointment.startTimeMinutes;
        let formattedEndTime1 =
          particularappointment.endTimeHours * 60 +
          particularappointment.endTimeMinutes;

        let formattedStartTime2 =
          parseInt(slotTiming[0]) * 60 + parseInt(slotTiming[1]);
        let formattedEndTime2 =
          parseInt(endslotTiming[0]) * 60 + parseInt(endslotTiming[1]);

        // Conditions To check if there is an appointment

        if (
          particularappointment.Status === "notcompleted" &&
          compareDates(
            date.toString().replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"),
            particularappointment.Date.toString().replace(
              /(\d{4})(\d{2})(\d{2})/,
              "$1-$2-$3",
            ),
          )
        ) {
          if (
            (formattedStartTime1 < formattedStartTime2 &&
              formattedStartTime2 < formattedEndTime1) ||
            (formattedStartTime1 < formattedEndTime2 &&
              formattedEndTime2 < formattedEndTime1) ||
            (formattedStartTime2 < formattedStartTime1 &&
              formattedStartTime1 < formattedEndTime2) ||
            (formattedStartTime2 < formattedEndTime1 &&
              formattedEndTime1 < formattedEndTime2)
          )
            return res
              .status(400)
              .json(
                "Doctor Already Have An Appointment in that scheduled time",
              );
        }
      }

      const AppointmentObject = {
        doctorId: DoctorId,
        patientId: patientId,
        startTimeHours: parseInt(slotTiming[0]),
        startTimeMinutes: parseInt(slotTiming[1]),
        endTimeHours: parseInt(endslotTiming[0]),
        endTimeMinutes: parseInt(endslotTiming[1]),
        Price: doctor?.price,
        Date: date,
        problem: req.body.problem,
        expirity: false,
      };

      const API_KEY = process.env.SEND_GRID_API;

      sgMail.setApiKey(API_KEY);

      const Appointment = new Appointments(AppointmentObject);

      await Appointment.save();

      console.log(patient.email);

      await Doctors.findByIdAndUpdate(
        { _id: DoctorId },
        {
          $push: { appointments: Appointment },
        },
      );

      await Patients.findByIdAndUpdate(
        {
          _id: patientId,
        },
        {
          $push: {
            appointments: Appointment,
          },
        },
      );

      // // const msg = {
      // //   to: patient.email,
      // //   from: "geekaprojects@gmail.com", // Use the email address or domain you verified above
      // //   subject: "Verify your Email",
      // //   text: "Your Appointment Confirmation",
      // //   html: generateEmailTemplater(
      // //     DoctorId,
      // //     patientId,
      // //     doctor.name,
      // //     startSlotTime,
      // //     endSlotTime,
      // //     date,
      // //     price
      // //   ),
      // // };

      // // try {
      // //   await sgMail.send(msg);
      // // } catch (error) {
      // //   console.error(error);

      // //   if (error.response) {
      // //     console.error(error.response.body);
      // //   }
      // // }

      return res.status(200).json({
        message: `Your appointment has been booked from ${startSlotTime} till ${endSlotTime} at ${date}.`,
        appointment: Appointment,
      });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// Get All Appointments Of A doctor

const getAppointmentOfDoc = async (req, res) => {
  try {
    const decodedValue = req.user;

    if (!decodedValue)
      return res.status(403).json("No Authorization Token Sent");
    const id = decodedValue._id;

    if (!isValidObjectId(id)) {
      return res.status(403).json("Invalid User");
    }

    const appointment = await Appointments.find({ doctorId: id });
    if (!appointment) return res.status(400).json("No Appointments Scheduled");

    return res.status(200).json(appointment);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getAppointmentOfPatient = async (req, res) => {
  try {
    const decodedValue = req.user;
    if (!decodedValue)
      return res.status(403).json("No Authorization Token Sent");

    const id = decodedValue.patientid;

    if (!isValidObjectId(id)) return res.status(403).json("Invalid User");

    const appointment = await Appointments.find({ patientId: id });
    if (!appointment) return res.status(400).json("No Appointments Scheduled");

    return res.status(200).json(appointment);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// Get Appointments Of Patients Per day

const getAppointmentOfPatientPerDay = async (req, res) => {
  try {
    const decodedValue = req.user;
    if (!decodedValue)
      return res.status(403).json("No Authorization Token Sent");

    const id = decodedValue.patientid;

    if (!isValidObjectId(id)) return res.status(403).json("Invalid User");
    var today = new Date();

    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    const date = yyyy + "-" + mm + "-" + dd;

    const date1 = yyyy + mm + dd;

    console.log(date.toString());

    let advertisements = await Appointments.findOneAndUpdate(
      {
        expirity: "false",
        Date: {
          $lt: parseInt(date1),
        },
        patientId: id,
      },

      { $set: { expirity: "true" } },
    );

    console.log(advertisements);

    if (advertisements == null) {
      console.log("All older appointments removed");
    } else {
      await Doctors.findByIdAndUpdate(
        { _id: advertisements.doctorId },
        { $pull: { appointments: advertisements._id } },
      );

      Patients.findOne({ _id: advertisements.patientId }, function (err, user) {
        user.appointment = undefined;
        user.save();
      });
    }

    const appointment = await Appointments.find({
      Date: parseInt(date1),
      patientId: id,
    });

    if (!appointment) return res.status(400).json("No Appointments Scheduled");

    return res.status(200).json(appointment);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// Get Appointments Of Doc Per Day

const getAppointmentOfDocPerDay = async (req, res) => {
  try {
    const decodedValue = req.user;

    if (!decodedValue)
      return res.status(403).json("No Authorization Token Sent");
    const id = decodedValue._id;

    if (!isValidObjectId(id)) {
      return res.status(403).json("Invalid User");
    }

    var today = new Date();

    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    const date = yyyy + "-" + mm + "-" + dd;

    console.log(date.toString());

    const date1 = yyyy + mm + dd;

    let advertisements = await Appointments.findOneAndUpdate(
      {
        expirity: "false",
        Date: {
          $lt: parseInt(date1),
        },
        doctorId: id,
      },

      { $set: { expirity: "true" } },
    );

    console.log(advertisements);

    if (advertisements == null) {
      console.log("All older appointments removed");
    } else {
      await Doctors.findByIdAndUpdate(
        { _id: id },
        { $pull: { appointments: advertisements._id } },
      );

      Patients.findOne({ _id: advertisements.patientId }, function (err, user) {
        user.appointment = undefined;
        user.save();
      });
    }

    const appointment = await Appointments.find({
      Date: parseInt(date1),
      doctorId: id,
    });

    if (!appointment) return res.status(400).json("No Appointments Scheduled");

    return res.status(200).json(appointment);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// Appointment Completed

const AppointmentCompletedController = async (req, res) => {
  try {
    const decodedValue = req.user;

    if (!decodedValue)
      return res.status(403).json("No Authorization Token Sent");
    const id = decodedValue._id;

    if (!isValidObjectId(id)) {
      return res.status(403).json("Invalid User");
    }

    const appointment = await Appointments.findOne({ _id: req.body.id });

    console.log(req.body);

    if (!appointment)
      return res.status(400).json("No such appointment is scheduled ");

    if (appointment.Status === "completed")
      return res.status(400).json("Appointment is already completed");

    appointment.Status = req.body.status;

    await appointment.save();

    await Doctors.findByIdAndUpdate(
      { _id: id },
      { $pull: { appointments: appointment._id } },
    );

    Patients.findOne({ _id: appointment.patientId }, function (err, user) {
      user.appointment = undefined;
      user.save();
    });

    return res.status(200).json("Your Appointment is completed.");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// Cancel Appointment

const CancelAppointment = async (req, res) => {
  try {
    const decodedValue = req.user;
    if (!decodedValue)
      return res.status(403).json("No Authorization Token Sent");

    const id = decodedValue.patientid;
    console.log(id);

    if (!isValidObjectId(id)) return res.status(403).json("Invalid User");

    const appointment = await Appointments.findOne({
      _id: req.body.appointmentId,
      patientId: id,
    });
    console.log(appointment);
    const patient = await Patient.find({ _id: id });

    if (!appointment)
      return res.status(403).json("No Such Appointment is being scheduled");

    Patients.findOne({ _id: id }, function (err, user) {
      user.appointment = undefined;
      user.save();
    });

    await Doctors.findByIdAndUpdate(
      { _id: req.body.doctorId },
      { $pull: { appointments: appointment._id } },
    );

    await Appointments.findByIdAndDelete({
      _id: appointment._id,
    });
    console.log(appointment);

    return res.status(200).json("Appointment is Canceled");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  createAppointment,
  getAppointmentOfDoc,
  AppointmentCompletedController,
  CancelAppointment,
  getAppointmentOfDocPerDay,
  getAppointmentOfPatient,
  getAppointmentOfPatientPerDay,
};
