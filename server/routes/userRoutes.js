const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");
const User = require("../models/User");

// ✅ GET all users from DB
router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// ✅ PATCH user role (promote/demote)
router.patch("/:id/role", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { role: req.body.role },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User role updated", user: updated });
  } catch (err) {
    res.status(500).json({ error: "Failed to update role" });
  }
});

// ✅ Add a new user
router.post("/", async (req, res) => {
  try {
    const { name, email, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = new User({ name, email, role });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to create user", details: err });
  }
});

module.exports = router;
