const express = require("express");
const router = express.Router();
const User = require("../models/user.models.js");
//  const adminAuthenticate = require("../middleware/adminAuthenticate.js");
const {
  registerUser,
  loginUser,
  profilePage,
  getData,
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

router.get("/profile", authenticate, profilePage);
router.get("/getData", authenticate, getData);

// Admin dashboard route
// router.get("/dashboard", adminAuthenticate, (req, res) => {
//   res.send("Welcome to the admin dashboard!");
// });

module.exports = router;
