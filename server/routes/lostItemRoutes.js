const express = require("express");
const router = express.Router();
const LostItem = require("../models/LostItem");

// ✅ POST: Report lost item
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

// ✅ GET: All lost items
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

// ✅ NEW: PUT /lost-items/:id — Update status of a lost item
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updatedItem = await LostItem.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: "Lost item not found" });
    }

    res.json({ message: "Status updated", item: updatedItem });
  } catch (error) {
    console.error("Error updating lost item status:", error);
    res.status(500).json({ error: "Failed to update item status" });
  }
});

module.exports = router;
