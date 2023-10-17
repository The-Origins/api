const router = require("express").Router();
const mongoose = require("mongoose");
const GridFs = require("gridfs-stream");

const connection = require("../../config/database");

let gfs, gridfsBucket;
connection.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(connection.db, {
    bucketName: "content"
  })
  gfs = GridFs(connection.db, mongoose.mongo);
  gfs.collection("content")
});

router.get("/:id", (req, res, next) =>
{
  gfs.files
  .findOne({filename:req.params.id})
  .then((file) => {
    if (!file) {
      next(new Error(`file:${req.params.id} not found`));
    }
    const readStream = gridfsBucket.openDownloadStream(file._id)
    readStream.pipe(res)

  })
  .catch((err) => next(err));
})

module.exports = router