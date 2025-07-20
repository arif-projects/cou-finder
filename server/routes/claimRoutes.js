// server/routes/claimRoutes.js (UPDATED - COPY THIS ENTIRE CONTENT)

const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");

const Claim = require("../models/Claim"); // 🔄 Mongoose model

// ✅ GET all claims (Admin only)
// Requires: JWT token and Admin role
router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const claims = await Claim.find().sort({ createdAt: -1 });
    res.json(claims);
  } catch (error) {
    console.error("Error fetching claims:", error); // Added for better debugging
    res.status(500).json({ error: "Failed to fetch claims" });
  }
});

// ✅ PUT /claims/:id/approve (Admin only)
// Requires: JWT token and Admin role
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
    console.error("Error approving claim:", error); // Added for better debugging
    res.status(500).json({ error: "Failed to approve claim" });
  }
});

// ✅ PUT /claims/:id/reject (Admin only)
// Requires: JWT token and Admin role
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
    console.error("Error rejecting claim:", error); // Added for better debugging    res.status(500).json({ error: "Failed to reject claim" });
  }
});

// IMPORTANT: The public POST claim route (for submitting new claims)
// is handled by `server/routes/claimPublicRoutes.js`.
// This POST route was removed from here to avoid duplication and
// to keep this file focused on admin-specific claim management actions.
// If you intended for admins to also create claims via this route,
// you would add a protected POST route here.
// For now, it's assumed all new claim submissions come through the public route.

module.exports = router;
