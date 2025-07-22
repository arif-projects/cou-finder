const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load env variables
dotenv.config();

// Initialize app
const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const claimRoutes = require("./routes/claimRoutes");
app.use("/api/claims", claimRoutes); // 🔒 Admin-Protected Claim Routes

const lostItemRoutes = require("./routes/lostItemRoutes");
app.use("/api/lost-items", lostItemRoutes); // 🧾 Public + Admin Lost Items

const claimPublicRoutes = require("./routes/claimPublicRoutes");
app.use("/api/claim", claimPublicRoutes); // 🧾 Public Claim Submission Route

const reviewRoutes = require("./routes/reviewRoutes"); // Correct path to reviewRoutes file
app.use("/api/reviews", reviewRoutes); // Ensure it's being used correctly

const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admins", adminRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Server is running and connected to MongoDB!");
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});
