function tripIdHandler(err,req,res,next){
    try{
        res.tripId = req.tripId;
        next();

    }catch(err){
        throw(err);
    }
}
module.exports = tripIdHandler;