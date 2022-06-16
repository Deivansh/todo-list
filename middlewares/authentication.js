const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const jwtSecret = process.env.JWT_SECRET;
  const token = req.header(process.env.TOKEN_HEADER_NAME);
  const verified = jwt.verify(token, jwtSecret);
  if (verified) return next();
  return res.status(401).send("Unauthorized");
};
