const jwt = require("jsonwebtoken");
const { default: app } = require("../../src/firebase/firebase.config");

app.post("/jwt", (req, res) => {
  const user = req.body; // expects email or user info
  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.send({ token });
});
