const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.Skey);

const authenticate = require("../middleware/authenticate.js");
// require("../db/conn.js");
// this line is throwing an error
const User = require("../models/user.models.js");
const cookieParser = require("cookie-parser");
const { model } = require("mongoose");

router.use(cookieParser());
router.get("/", (req, res) => {
  res.send("This is Home Page of router!");
});
// Add this line for debugging
// console.log("Request Body:", req.body);
// res.json({ message: "Received your request" });
// res.json({ message: req.body });

// using promises
router.post("/register", (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;
  if (!name || !email || !phone || !password || !cpassword) {
    return res.status(422).json({ error: "Please fill all fields" });
  }
  User.findOne({ email: email })
    .then((userExist) => {
      if (userExist) {
        return res.status(422).json({ error: "Email already exists" });
      } else {
        const user = new User({
          name,
          email,
          phone,
          password,
          cpassword,
        });
        user
          .save()
          .then(() => {
            res.status(201).json({ msg: "Data entered successfully" });
          })
          .catch((err) => {
            console.error("Error saving user:", err);
            res.status(500).json({ error: "Error saving user data" });
          });
      }
    })
    .catch((err) => {
      console.error("Error finding user:", err);
      res.status(500).json({ error: "Server error" });
    });
});

// using async await
// router.post("/register", async (req, res) => {
//   const { name, email, work, phone, password, cpassword } = req.body;
//   console.log(name, email, work, phone, password, cpassword);
//   if (!name || !email || !work || !phone || !password || !cpassword) {
//     return res.status(422).json({ error: "please fill all fields" });
//   }
//   try {
//     const userExist = await User.findOne({ email: email });
//     if (userExist) {
//       return res.status(422).json({ error: "Email already exists" });
//     } else if (password != cpassword) {
//       return res.status(422).json({ error: "Email already exists" });
//     } else {
//       const user = new User({
//         name,
//         email,
//         phone,
//         work,
//         password,
//         cpassword,
//       });

//       const userRegister = await user.save();
//       if (userRegister) {
//         res.status(201).json({ msg: "data entered successfully" });
//       } else {
//         res.status(500).json({ msg: "Failed to register" });
//       }
//     }
//   } catch (err) {
//     res.status(500).json({ msg: "server error" });
//   }
// });
// login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "please fill the details" });
    }
    const userLogin = await User.findOne({ email: email });
    console.log(userLogin);

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      const token = await userLogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      console.log("Input password:", password);
      console.log("Stored hashed password:", userLogin.password);
      console.log("isMatch:", isMatch);
      if (isMatch) {
        res.json({
          message: "User signin successful",
          token: await userLogin.generateAuthToken(),
          userId: userLogin._id.toString(),
        });
      } else {
        res.status(400).json({ error: "Invalid Credentials" });
      }
    } else {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

// dynamic about us page

router.get("/profile", authenticate, (req, res) => {
  // console.log("About");
  res.send(req.rootUser);
});

router.get("/getData", authenticate, (req, res) => {
  res.json(req.rootUser);
  // console.log(req.rootUser.name);
});
// router.get("/logout", (req, res) => {
//   console.log("Logout Page");
//   res.clearCookie("jwttoken", { path: "/" });
//   res.status(200).send("User logged out");
// });

// payment gateway

// router.post("/payment", async (req, res) => {
//   try {
//     const product = await stripe.products.create({
//       name: "cloud-computing",
//     });

//     if (!product) {
//       return res.status(500).send({ error: "Product creation failed" });
//     }

//     const price = await stripe.prices.create({
//       product: product.id,
//       unit_amount: 100 * 100, // assuming this is in the smallest currency unit (cents for USD)
//       currency: "inr",
//     });

//     if (!price) {
//       return res.status(500).send({ error: "Price creation failed" });
//     }

//     const session = await stripe.checkout.sessions.create({
//       line_items: [
//         {
//           price: price.id,
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       success_url: `${req.protocol}://${req.get("host")}/success`,
//       cancel_url: `${req.protocol}://${req.get("host")}/cancel`,
//       customer_email: "demo@example.com",
//     });

//     if (!session) {
//       return res.status(500).send({ error: "Session creation failed" });
//     }

//     res.status(200).send({ sessionId: session.id });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: "Internal Server Error" });
//   }
// });
router.post("/add-to-cart", authenticate, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cartItem = user.cart.find(
      (item) => item.productId.toString() === productId
    );

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      user.cart.push({ productId, quantity });
    }

    await user.save();

    res.status(200).json({ message: "Product added to cart" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
