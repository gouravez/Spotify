const { v4: uuid } = require("uuid");
const StorageService = require("../services/storage.service");
const musicModel = require("../models/music.model");
const jwt = require("jsonwebtoken");

async function createMusic(req, res) {
  try {
    const token = req.body;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (decoded.role !== "artist") {
      return res.status(403).json({ error: "Forbidden" });
    }

    const { title } = req.headers.authorization;;
    const file = req.file;

    const uri = await StorageService.uploadMusic(
      file.buffer.toString("base64"),
      uuid(),
    );
    const music = await musicModel.create({
      title,
      artist: decoded.id,
      audioUrl: uri,
    });
    res.status(201).json({
      message: "Music uploaded successfully",
      music,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createMusic,
};
