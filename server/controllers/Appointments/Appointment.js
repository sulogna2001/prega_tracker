// Appointment Creation
const { isValidObjectId } = require("mongoose");
const Appointments = require("../../models/Appointments");
const Doctors = require("../../models/Doctors");
const Patient = require("../../models/Patients");
const sgMail = require("@sendgrid/mail");
const { generateEmailTemplater } = require("./mails");

// Booking An Appointment By A Patient
const createAppointment = async (req, res) => {
  try {
    const { patientId, DoctorId, price, startSlotTime, endSlotTime, date } =
      req.body;
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
       if(patient.appointment) return res.status(403).json("Book One Appointment At A Time")
      const slotTiming = startSlotTime.split(":");
      const endslotTiming = endSlotTime.split(":");
      if (
        parseInt(slotTiming[0]) < doctor.startTimeHours ||
        parseInt(endslotTiming[0]) > doctor.endTimeHours
      )
        return res.status(403).json("Please booked between the doctor timings");
      const AppointmentObject = {
        doctorId: DoctorId,
        patientId: patientId,
        startTimeHours: parseInt(slotTiming[0]),
        startTimeMinutes: parseInt(slotTiming[1]),
        endTimeHours: parseInt(endslotTiming[0]),
        endTimeMinutes: parseInt(endslotTiming[1]),
        Price: price,
        Date: new Date(date),
      };


      const API_KEY = process.env.SEND_GRID_API;

      sgMail.setApiKey(API_KEY);

      const Appointment = new Appointments(AppointmentObject);

      await Appointment.save();

      console.log(patient.email)

      const msg = {
         to: patient.email,
         from: "geekaprojects@gmail.com", // Use the email address or domain you verified above
         subject: "Verify your Email",
         text: "Your Appointment Confirmation",
         html: generateEmailTemplater(startSlotTime,endSlotTime,date,price),
         
       };

   
       try {
         await sgMail.send(msg);
       } catch (error) {
         console.error(error);
   
         if (error.response) {
           console.error(error.response.body);
         }
       }

      await Doctors.findByIdAndUpdate(
        { _id: DoctorId },
        { $push: { appointments: Appointment } }
      );

      await Patient.findByIdAndUpdate(
        {
          _id: patientId,
        },
        { appointment: Appointment }
      );
    }
    return res
      .status(200)
      .json(
        `Your appointment has been booked from ${startSlotTime} till ${endSlotTime} at ${date}`
      );
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { createAppointment };
