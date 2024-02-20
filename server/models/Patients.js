const mongoose = require("mongoose");
const PatientsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    problems: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
      max: 10,
    },
    password: {
      type: String,
      required: true,
      min: 3,
    },
    appointments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointments",
      },
    ],
    trimester: {
      type: String,
      enum: ["1st", "2nd", "3rd"],
    },
    doctors: {
      type: Array,
      default: [],
    },
    city: {
      type: String,
      max: 50,
    },
    country: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Patients", PatientsSchema);
