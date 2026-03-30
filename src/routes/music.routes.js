const express = require("express");
const router = express.Router();

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const musicController = require("../controllers/music.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/createMusic",
  authMiddleware.authArtist,
  upload.single("music"),
  musicController.createMusic,
);

router.post(
  "/createAlbum",
  authMiddleware.authArtist,
  musicController.createAlbum,
);

router.get("/getMusic", authMiddleware.authUser, musicController.getAllMusics);

router.get("/getAlbum", authMiddleware.authUser, musicController.getAllAlbums);

module.exports = router;
