// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const ProductSchema = new Schema({
//   name: String,
//   price: Number,
//   description: String,
// });

// module.exports = mongoose.model("Product", ProductSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Product", ProductSchema);
