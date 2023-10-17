const router = require("express").Router();
//returns file data
router.use("/files", require("./files"))

//reads files and returns a readable stream
router.use("/content", require("./content"))

module.exports = router;
