const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = require("./models/user_schema.js");

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(require("./router/auth"));

dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT;
require("./db/conn.js");
// const middleware = (req, res, next) => {
//   console.log("middleware");
//   next();
// };

// app.get("/", (req, res) => {
//   res.send("This is Home Page of app!");
// });
// app.get("/about", (req, res) => {
//   console.log("About");
//   res.send("This is About Page!");
// });
app.get("/contact", (req, res) => {
  res.cookie("Test", "thapa", {
    domain: "yourdomain.com", // Replace with your domain
    path: "/contact", // Replace with the path you're setting the cookie for
    secure: true, // Set this if your site uses HTTPS
    sameSite: "strict", // You can set 'strict', 'lax', or 'none' based on your requirements
  });
  res.send("This is Contact Page!");
});
app.get("/signin", (req, res) => {
  res.send("This is Login Page!");
});
app.get("/signup", (req, res) => {
  res.send("This is Registration Page!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
