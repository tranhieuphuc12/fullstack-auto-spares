const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

// Set up storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads")); // make sure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

router.post("/", upload.array("images"), (req, res) => {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://mvpauto.id.vn"
      : req.protocol + "://" + req.get("host");

  const urls = req.files.map((file) => `${baseUrl}/uploads/${file.filename}`);
  res.status(200).json({ urls });
});

module.exports = router;
