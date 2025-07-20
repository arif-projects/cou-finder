const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");

// 🔐 GET all admins
router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const admins = await Admin.find({}, { _id: 0, email: 1 });
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch admins" });
  }
});

// ➕ Add admin
router.post("/", verifyToken, verifyAdmin, async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    const exists = await Admin.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: "Admin already exists" });
    }

    const newAdmin = new Admin({ email });
    await newAdmin.save();
    res.status(201).json({ message: "Admin added", email });
  } catch (error) {
    res.status(500).json({ error: "Failed to add admin" });
  }
});

// ❌ Remove admin
router.delete("/:email", verifyToken, verifyAdmin, async (req, res) => {
  const { email } = req.params;

  try {
    const deleted = await Admin.findOneAndDelete({ email });
    if (!deleted) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.json({ message: "Admin removed", email });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove admin" });
  }
});

module.exports = router;
