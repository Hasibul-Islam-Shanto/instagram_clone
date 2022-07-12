const jwt = require("jsonwebtoken");
const User = require("../models/user");
module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "You must login first.." });
  }
  const token = authorization.replace("Bearer ", "");
  const userData = jwt.verify(token, process.env.JWT_SECRET);
  if (userData) {
    const { _id } = userData;
    const verifiedUser = await User.findById({ _id });
    req.user = verifiedUser;
  } else {
    res.status(400).json({ error: "You must login first." });
  }
  next();
};
