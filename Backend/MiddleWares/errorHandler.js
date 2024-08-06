function errorHandler (err,req,res,next)  {
    console.error(err);
    if(res.headersSent){
        next(err);
    }
    console.log('ERROR MIDDLE WARE HAS BEEN CALLED')
    res.status(500).json({
        error:{
            message:err.message
        }
    })

}
module.exports = errorHandler;
