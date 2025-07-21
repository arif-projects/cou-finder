const express = require("express");
const router = express.Router();

const Claim = require("../models/Claim");

// 🔓 GET all claims (No login required)
router.get("/", async (req, res) => {
  try {
    const claims = await Claim.find().sort({ createdAt: -1 });
    res.json(claims);
  } catch (error) {
    console.error("Error fetching claims:", error);
    res.status(500).json({ error: "Failed to fetch claims" });
  }
});

// 🔓 PUT /claims/:id/approve (No login required)
router.put("/:id/approve", async (req, res) => {
  try {
    const claim = await Claim.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    if (!claim) return res.status(404).json({ error: "Claim not found" });
    res.json({ message: "Claim approved", claim });
  } catch (error) {
    console.error("Error approving claim:", error);
    res.status(500).json({ error: "Failed to approve claim" });
  }
});

// 🔓 PUT /claims/:id/reject (No login required)
router.put("/:id/reject", async (req, res) => {
  try {
    const claim = await Claim.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );
    if (!claim) return res.status(404).json({ error: "Claim not found" });
    res.json({ message: "Claim rejected", claim });
  } catch (error) {
    console.error("Error rejecting claim:", error);
    res.status(500).json({ error: "Failed to reject claim" });
  }
});

module.exports = router;
