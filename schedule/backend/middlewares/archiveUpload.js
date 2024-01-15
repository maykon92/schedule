const multer = require("multer");
const path = require("path");

// Destination to store image
const archiveStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/archives/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const archiveUpload = multer({
  storage: archiveStorage,
  fileFilter(req, file, cb) {
    cb(undefined, true);
  },
});

module.exports = { archiveUpload };