require("dotenv").config();
const { ImageKit } = require("@imagekit/nodejs");

const client = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadMusic(file, fileName) {
  return await client.files.upload({
    file,
    folder: "/music",
    fileName,
  });
}

module.exports = { uploadMusic };
