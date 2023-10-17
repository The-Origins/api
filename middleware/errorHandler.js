module.exports = (err, req, res, next) =>
{
    if(err)
    {
        res.status(res.statusCode).json({success:false, data:{}, actions:[], message: err.message})
    }
    next()
}