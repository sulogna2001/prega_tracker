const mongoose = require("mongoose");
const PatientsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
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
    slot: {
      type: Date,
    },
    doctors: {
      type: Array,
      default: [],
    },
    city: {
      type: String,
      max: 50,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patients", PatientsSchema);
