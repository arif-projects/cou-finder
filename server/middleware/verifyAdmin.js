// server/middleware/verifyAdmin.js (UPDATED)

// const Admin = require("../models/Admin"); // <<< Eita lagbe na, comment out koro ba delete koro

const verifyAdmin = async (req, res, next) => {
  // console.log("verifyAdmin middleware: req.user", req.user); // For debugging: check what's in req.user
  // console.log("verifyAdmin middleware: req.user.role", req.user?.role); // For debugging: check the role

  // req.user will be populated by the 'verifyToken' middleware.
  // It should contain the decoded JWT payload, e.g., { email: "admin@example.com", role: "admin" }

  // Check if req.user exists and if its role is exactly "admin" (case-sensitive)
  if (!req.user || req.user.role !== "admin") {
    // If user data is missing or role is not "admin", deny access.
    return res
      .status(403)
      .json({ message: "Forbidden: Admin access required." });
  }

  // If the user has the "admin" role, proceed to the next middleware/route handler
  next();
};

module.exports = verifyAdmin;
