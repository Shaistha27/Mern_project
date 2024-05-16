// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   phone: {
//     type: Number,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   cpassword: {
//     type: String,
//     required: true,
//   },
//   isAdmin: {
//     type: Number,
//     default: 0, // set to true for admin users
//   },
//   tokens: [
//     {
//       token: {
//         type: String,
//         required: true,
//       },
//     },
//   ],
//   cart: [
//     {
//       productId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Product",
//       },
//       quantity: Number,
//     },
//   ],
// });

// // password hashing
// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     try {
//       const hashedPassword = await bcrypt.hash(this.password, 12);
//       this.password = hashedPassword;
//     } catch (err) {
//       return next(err);
//     }
//   }
//   next();
// });

// // we are generating tokens
// userSchema.methods.generateToken = async function () {
//   try {
//     let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
//     this.tokens = this.tokens.concat({ token: token });
//     await this.save();
//     return token;
//   } catch (err) {
//     console.error(err);
//   }
// };
// const User = mongoose.model("USER", userSchema);
// module.exports = User;

//sana codde
const crypto = require("crypto");

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString("hex");
console.log(secretKey);

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Number,
    default: 0, // set to true for admin users
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// password hashing
userSchema.pre("save", async function (next) {
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

// we are generating tokens
userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, secretKey);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.error(err);
  }
};
const User = mongoose.model("USER", userSchema);
module.exports = User;
