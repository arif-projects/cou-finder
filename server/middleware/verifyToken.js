const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if Authorization header is present
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Token missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  // Verify the JWT token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Forbidden: Invalid or expired token" });
    }

    req.user = decoded; // Attach user data from token to request
    next();
  });
};

module.exports = verifyToken;
