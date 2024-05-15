const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const User = require("./models/user_schema.js");
const paymentRouter = require("./router/auth.js");
const cartRoutes = require("./router/cart");
app.use(express.json());
app.use(cookieParser());
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

app.get("/signin", (req, res) => {
  res.send("This is Login Page!");
});
app.get("/register", (req, res) => {
  res.send("This is Registration Page!");
});

app.use("/api/cart", cartRoutes);

app.use("/payment", paymentRouter);

// Simple routes for success and cancel pages
app.get("/success", (req, res) => {
  res.send("Payment successful!");
});

app.get("/cancel", (req, res) => {
  res.send("Payment canceled!");
});
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
