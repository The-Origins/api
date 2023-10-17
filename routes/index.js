const router  = require("express").Router()

router.use("/api", require("./api"))

router.get("*", (req, res, next) =>
{
    res.statusCode = 404
    next(new Error(`Can't ${req.method} ${req.url}`))
})

router.use(require("../middleware/errorHandler"))

module.exports = router