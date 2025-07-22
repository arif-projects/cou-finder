// backend/models/Review.js
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true },
  role: { type: String, required: true },
  rating: { type: Number, required: true },
  text: { type: String, required: true },
});

module.exports = mongoose.model("Review", reviewSchema);
