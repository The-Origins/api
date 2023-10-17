require("dotenv").config()
const GridFs = require("gridfs-stream")
const mongoose = require("mongoose")
const path = require("path");
const crypto = require("crypto");
const { GridFsStorage } = require("multer-gridfs-storage");
GridFs.mongo = mongoose.mongo;

module.exports = new GridFsStorage({
    url: process.env.DB_URL,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            reject(err);
          }
          const filename = buf.toString("hex") + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: "content",
          };
          resolve(fileInfo);
        });
      });
    },
  });