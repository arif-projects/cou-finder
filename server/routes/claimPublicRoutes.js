const express = require("express");
const router = express.Router();
const Claim = require("../models/Claim");

// POST: Submit claim
router.post("/", async (req, res) => {
  try {
    const newClaim = new Claim(req.body);
    const saved = await newClaim.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: "Failed to submit claim", details: err });
  }
});

module.exports = router;
