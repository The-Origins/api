const router = require("express").Router();
const mongoose = require("mongoose");
const GridFs = require("gridfs-stream");
const multer = require("multer");
const storage = require("../../config/storage")

const upload = multer({storage})
const connection = require("../../config/database");

let gfs;
connection.once("open", () => {
  gfs = GridFs(connection.db, mongoose.mongo);
  gfs.collection("content");
});


router.get("/", (req, res, next) => {
  gfs.files
    .find()
    .toArray()
    .then((files) => {
      if (!files) {
        next(new Error(`No files found`));
      }
      res.json({
        success: true,
        data: files,
        actions: [],
        messages: `retrived all files`,
      });
    })
    .catch((err) => next(err));
});

router.post("/upload", upload.single("file"), (req, res, next) =>
{
    res.json({success:true, data:req.file, actions:[], message:"successfully uploaded"})
})

router.get("/:id", (req, res, next) =>
{
  gfs.files
    .findOne({filename:req.params.id})
    .then((file) => {
      if (!file) {
        next(new Error(`file:${req.params.id} found`));
      }
      res.json({
        success: true,
        data: file,
        actions: [],
        messages: `retrived file ${file.filename}`,
      });
    })
    .catch((err) => next(err));
})

module.exports = router