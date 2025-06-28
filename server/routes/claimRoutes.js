const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");

const Claim = require("../models/Claim"); // 🔄 Mongoose model (create if not exists)

// ✅ GET all claims (Admin only)
router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const claims = await Claim.find().sort({ createdAt: -1 });
    res.json(claims);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch claims" });
  }
});

// ✅ PUT /claims/:id/approve
router.put("/:id/approve", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const claim = await Claim.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    if (!claim) return res.status(404).json({ error: "Claim not found" });
    res.json({ message: "Claim approved", claim });
  } catch (error) {
    res.status(500).json({ error: "Failed to approve claim" });
  }
});

// ✅ PUT /claims/:id/reject
router.put("/:id/reject", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const claim = await Claim.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );
    if (!claim) return res.status(404).json({ error: "Claim not found" });
    res.json({ message: "Claim rejected", claim });
  } catch (error) {
    res.status(500).json({ error: "Failed to reject claim" });
  }
});

// ✅ POST a new claim (Public)
router.post("/", async (req, res) => {
  try {
    const newClaim = new Claim(req.body);
    const savedClaim = await newClaim.save();
    res.status(201).json(savedClaim);
  } catch (error) {
    res.status(400).json({ error: "Failed to submit claim", details: error });
  }
});

module.exports = router;
