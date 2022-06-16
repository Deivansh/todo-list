const express = require("express");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();

authRouter.get("/token", async (req, res) => {
  try {
    let jwtSecret = process.env.JWT_SECRET;
    let data = {
      time: new Date(),
      username: "admin",
    };
    const token = jwt.sign(data, jwtSecret, { expiresIn: "600s" });
    return res.send(token);
  } catch (error) {
    return res.send(error);
  }
});

module.exports = authRouter;
