const mongoose = require("mongoose");
const AppointmentSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctors",
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patients",
    },
    Time: {
      type: Date,
    },
    Price: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Appointments",AppointmentSchema)
