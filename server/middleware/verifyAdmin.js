const verifyAdmin = (req, res, next) => {
  const user = req.user;

  if (user?.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Forbidden: Admin access required" });
  }

  next();
};

module.exports = verifyAdmin;
