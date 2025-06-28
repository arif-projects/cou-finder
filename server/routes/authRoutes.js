// routes/authRoutes.js (create this if needed)
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Temporary route to simulate login & generate token
router.post("/generate-token", (req, res) => {
  const { email, role } = req.body;

  const user = {
    email,
    role: role || "user",
  };

  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ token });
});

module.exports = router;
