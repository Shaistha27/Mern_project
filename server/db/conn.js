const mongoose = require("mongoose");
const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
    // authSource: "admin",
  })
  .then(() => {
    console.log("Connected to Mongo");
  })
  .catch((err) => console.log(err));
