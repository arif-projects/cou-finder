const mongoose = require("mongoose");

const lostItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  date: { type: Date, required: true },
  location: String,
  description: String,
  image: String,
  userEmail: String,
  userName: String,
  status: {
    type: String,
    enum: ["pending", "claimed", "matched"],
    default: "pending",
  },
});

module.exports = mongoose.model("LostItem", lostItemSchema);
