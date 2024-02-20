const mongoose = require("mongoose");
const ReviewSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctors",
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patients",
  },
  ratings: {
    type: String,
    enum: ["1", "2", "3", "4", "5"],
    default: "1",
  },
  review: {
    type: String,
  },
});

module.exports = mongoose.model("Reviews", ReviewSchema);
