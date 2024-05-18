const jwt = require("jsonwebtoken");
const User = require("../models/user.models.js");

const SECRET_KEY = process.env.SECRET_KEY;

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;

    if (!token) {
      return res.status(401).send("Unauthorized: No token provided");
    }

    const verifyToken = jwt.verify(token, SECRET_KEY);

    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      return res.status(401).send("Unauthorized: User not found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).send("Unauthorized: Token has expired");
    } else if (err.name === "JsonWebTokenError") {
      return res.status(401).send("Unauthorized: Invalid token");
    } else {
      return res.status(401).send("Unauthorized: No token found");
    }
    console.log(err);
  }
};

module.exports = authenticate;

// const jwt = require("jsonwebtoken");
// const User = require("../models/user.models.js");

// const SECRET_KEY = "MYNAMEISSHAISTHATABASSUMPERSUINGECEINMJCET";
// const authenticate = async (req, res, next) => {
//   try {
//     const token = req.cookies.jwtoken;
//     const verifyToken = jwt.verify(token, SECRET_KEY);

//     const rootUser = await User.findOne({
//       _id: verifyToken._id,
//       "tokens.token": token,
//     });

//     if (!rootUser) {
//       throw new Error("User not found");
//     }

//     req.token = token;
//     req.rootUser = rootUser;
//     req.userID = rootUser._id;
//     next();
//   } catch (err) {
//     res.status(401).send("Unauthorized : No token found");
//     console.log(err);
//   }
// };

// module.exports = authenticate;
