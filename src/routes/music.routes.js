const express = require("express");
const router = express.Router();

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const musicController = require("../controllers/music.controller");

router.post("/createMusic", upload.single("file"), musicController.createMusic);
module.exports = router;
