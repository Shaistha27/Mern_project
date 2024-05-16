const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Changed destination folder to "./Images" for clarity
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname); // This line should be modified to create a unique filename
  },
});

const upload = multer({ storage: storage });

module.exports = { upload }; // Corrected exporting of the upload middleware
