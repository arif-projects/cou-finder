const express = require("express");
const router = express.Router();
const LostItem = require("../models/LostItem");

// POST: Report lost item
router.post("/", async (req, res) => {
  try {
    const newItem = new LostItem(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Failed to add lost item", details: err.message });
  }
});

// GET: All lost items
router.get("/", async (req, res) => {
  try {
    const items = await LostItem.find();
    res.json(items);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch lost items", details: err.message });
  }
});

module.exports = router;
