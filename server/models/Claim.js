const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema(
  {
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LostItem",
      required: true,
    },
    itemName: {
      type: String,
      required: true,
    },
    claimerName: {
      type: String,
      required: true,
    },
    claimerEmail: {
      type: String,
      required: true,
    },
    claimDetails: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "matched"], // Added "matched" for consistency
      default: "pending",
    },
    // Kept timestamps (better than single claimDate)
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Add index for better query performance
claimSchema.index({ itemId: 1, status: 1 });

module.exports = mongoose.model("Claim", claimSchema);
