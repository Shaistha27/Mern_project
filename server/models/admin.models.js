// Admin model
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// password hashing
AdminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const hashedPassword = await bcrypt.hash(this.password, 12);
      this.password = hashedPassword;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

// generating tokens
AdminSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.error(err);
  }
};
router.get("/profile", authenticate, (req, res) => {
  // console.log("About");
  res.send(req.rootUser);
});

router.get("/getData", authenticate, (req, res) => {
  res.json(req.rootUser);
  // console.log(req.rootUser.name);
});
const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
