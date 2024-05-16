// Middleware to check if user is an admin
const User = require("../models/video.models.js");

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Unauthorized" });
};

module.exports = { isAdmin };
