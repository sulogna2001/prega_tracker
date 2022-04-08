const Patients = require("../../../models/Patients");
const Reviews = require("../../../models/Reviews");
const { isValidObjectId } = require("mongoose");
const Doctors = require("../../../models/Doctors");

const addreviewController = async (req, res) => {
  try {
    const decodedValue = req.user;
    if (!decodedValue)
      return res.status(403).json("No Authorization Token Sent");

    const id = decodedValue.patientid;


    if (!isValidObjectId(id)) return res.status(403).json("Invalid User");

    const doctorId = req.body.doctorId;

    if (!isValidObjectId(doctorId))
      return res.status(403).json("Invalid Doctor User");

    const reviewObj = {
      doctorId: doctorId,
      patientId: id,
      ratings: req.body.ratings,
      review: req.body.review,
    };

    const Review = new Reviews(reviewObj);

    await Review.save();

    await Doctors.findByIdAndUpdate(
      { _id: doctorId },
      { $push: { reviews: Review } }
    );

    return res.status(201).json("Review added");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// Get Review Of A Doc

const getReviewOfDoc = async (req, res) => {
  try {

    console.log(req.body)

    const doctorId = req.body.doctorId;

    console.log(doctorId)


    if (!isValidObjectId(doctorId))
      return res.status(403).json("Invalid Doctor User");

    const doctor = await Doctors.find({ _id: doctorId });

    if (!doctor) return res.status(400).json("No Such User is present");

    const reviews = await Reviews.find({ doctorId: doctorId });

    if (!reviews) return res.status(400).json("No reviews yet");

    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// Delete A Review Of A Doc By A Patient

const deleteReviewOfDoc = async (req, res) => {
  try {
    const doctorId = req.body.doctorId;

    if (!isValidObjectId(doctorId))
      return res.status(403).json("Invalid Doctor User");

    const doctor = await Doctors.find({ _id: doctorId });

    if (!doctor) return res.status(400).json("No Such User is present");

    await Reviews.findByIdAndDelete({ _id: req.body.reviewId });

    await Doctors.findByIdAndUpdate(
      { _id: doctorId },
      { $pull: { reviews: req.body.reviewId } }
    );

    return res.status(204).json("Review is Deleted");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { addreviewController, getReviewOfDoc, deleteReviewOfDoc };
