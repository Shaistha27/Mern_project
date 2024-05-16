const mongoose = require("mongoose");
const DB =
  "mongodb+srv://sana:sana%402004@cluster0.ec4jcyz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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
