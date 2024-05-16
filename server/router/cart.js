const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const User = require("../models/user.models");
const Product = require("../models/Product_schema");

router.post("/add-to-cart", authenticate, async (req, res) => {
  const { productName, productPrice, productDescription } = req.body;
  const userId = req.userID;

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
