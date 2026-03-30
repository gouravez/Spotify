const { v4: uuid } = require("uuid");
const StorageService = require("../services/storage.service");
const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const jwt = require("jsonwebtoken");

async function createMusic(req, res) {
  try {
    const { title } = req.body;
    const file = req.file;

    const uploadResponse = await StorageService.uploadMusic(
      file.buffer.toString("base64"),
      uuid(),
    );

    const uri = uploadResponse.url;

    const music = await musicModel.create({
      title,
      artist: req.user.id,
      uri,
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

async function createAlbum(req, res) {
  try {
    try {
      const { title, musics } = req.body;

      const album = await albumModel.create({
        title,
        musics: musics,
        artist: req.user.id,
      });

      res.status(201).json({
        message: "Album created successfully",
        album,
      });
    } catch (err) {
      console.error(err);
      res.status(401).json({ error: "Invalid token" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

async function getAllMusics(req, res) {
  try {
    const musics = await musicModel
      .find()
      .limit(2)
      .populate("artist", "username email");
    populate("artist");
    res.status(200).json(musics);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

async function getAllAlbums(req, res) {
  try {
    const albums = await albumModel
      .find()
      .select("title artist")
      .populate("artist musics");

    res.status(200).json(albums);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createMusic,
  createAlbum,
  getAllMusics,
  getAllAlbums,
};
