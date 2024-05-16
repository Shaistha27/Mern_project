const express = require("express");
const router = express.Router();
const User = require("../models/user.models.js");
//  const adminAuthenticate = require("../middleware/adminAuthenticate.js");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/users.controllers.js");
const authenticate = require("../middleware/authenticate.js");

// Middleware for parsing JSON request bodies
router.use(express.json());

// Home route
router.get("/", (req, res) => {
  res.send("This is the Home Page of the router!");
});

// Register user route
router.post("/register", registerUser);

// Login user route
router.post("/login", loginUser);

router.get("/profile", authenticate, (req, res) => {
  // console.log("About");
  res.send(req.rootUser);
});

router.get("/getData", authenticate, (req, res) => {
  res.json(req.rootUser);
  // console.log(req.rootUser.name);
});
// Admin dashboard route
// router.get("/dashboard", adminAuthenticate, (req, res) => {
//   res.send("Welcome to the admin dashboard!");
// });

// Logout user route
// router.get("/logout", authenticate, logoutUser);

module.exports = router;
