const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.models.js");
const Admin = require("../models/admin.models.js");
const asyncHandler = require("../utils/asyncHandler");

router.use(express.json());

router.get("/", (req, res) => {
  res.send("This is Home Page of router!");
});

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, phone, password, cpassword } = req.body;
    if (!name || !email || !phone || !password || !cpassword) {
      return res.status(422).json({ error: "please fill all fields" });
    }

    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already exists" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Password doesn't match" });
    } else {
      const user = new User({
        name,
        email,
        phone,
        password,
        cpassword,
      });

      const SaveUser = await user.save();
      if (SaveUser) {
        res.status(201).json({ msg: "data entered successfully" });
      } else {
        res.status(500).json({ msg: "Failed to register" });
      }
    }
  } catch (err) {
    res.status(500).json({ msg: "server error" });
  }
});

// const loginUser = asyncHandler(async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ msg: "Please fill in all the details" });
//     }

//     // Find the user by email
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ msg: "Invalid Credentials" });
//     }

//     // Check if the password matches
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ msg: "Invalid Credentials" });
//     }

//     // Generate token based on user type
//     const token = await user.generateAuthToken();

//     // Set the token in cookie
//     res.cookie("jwtoken", token, {
//       expires: new Date(Date.now() + 25892000000),
//       httpOnly: true,
//     });

//     // Respond with success message and user type
//     if (user.isAdmin === 1) {
//       return res.status(201).json({ msg: "Admin login successful" });
//     } else {
//       return res.status(200).json({ msg: "User login successful" });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: "Server Error" });
//   }
// });

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Please fill in all the details" });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Generate token based on user type
    const token = await user.generateAuthToken();

    // Set the token in cookie (optional, for server-side sessions)
    res.cookie("jwtoken", token, {
      expires: new Date(Date.now() + 25892000000), // About 30 days
      httpOnly: true,
    });

    // Respond with success message, token, and user ID
    const response = {
      message:
        user.isAdmin === 1 ? "Admin login successful" : "User login successful",
      token,
      userId: user._id.toString(),
    };

    // Set status based on user type
    const status = user.isAdmin === 1 ? 201 : 200;
    return res.status(status).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

const profilePage = asyncHandler(async (req, res) => {
  res.send(req.rootUser);
});
const getData = asyncHandler(async (req, res) => {
  res.send(req.rootUser);
});

module.exports = {
  router: router,
  registerUser: registerUser,
  loginUser: loginUser,
  profilePage: profilePage,
  getData: getData,
};
