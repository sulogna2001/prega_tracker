const mongoose = require("mongoose");
const DoctorsSchema = new mongoose.Schema(
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
    profilePicture: {
      data: Buffer,
      contentType: String
    },
    startTime: {
      type: Date,
    },
    endTime : {
      type : Date
    },
    appointments: [
      {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Appointments'
      }
    ],
    desc: {
      type: String,
      max: 1000,
    },
    price: {
      type: Number,
    },
    patients: {
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

module.exports = mongoose.model("Doctors", DoctorsSchema);
