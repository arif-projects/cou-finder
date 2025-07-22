// backend/routes/reviewRoutes.js
const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

// POST /api/reviews - Store a new review
router.post("/", async (req, res) => {
  try {
    const { name, photo, role, rating, text } = req.body;

    const newReview = new Review({
      name,
      photo,
      role,
      rating,
      text,
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ message: "Error storing review", error: err });
  }
});

// GET /api/reviews - Fetch all reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find(); // Fetch all reviews from MongoDB
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reviews", error: err });
  }
});

module.exports = router;
