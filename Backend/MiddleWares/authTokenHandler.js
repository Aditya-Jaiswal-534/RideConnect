const jwt = require('jsonwebtoken')
const JWT_SECRET_KEY = 'adi123'
const JWT_REFRESH_SECRET_KEY ='adi123'
function authTokenHandler(req,res,next){
    const authToken =req.cookies.authToken;
    const refreshToken = req.cookies.refreshToken;
    
    if(!authToken ||!refreshToken){
        return res.status(401).json({
            message:'unauthenticated entry , no tokens provided'
        })
    }
    jwt.verify(authToken,JWT_SECRET_KEY,(err,decoded)=>{
       if(err){
        jwt.verify(refreshToken,JWT_REFRESH_SECRET_KEY,(refreshErr,refreshDecoded)=>{
            if(refreshErr){
                
                return res.json({message:'Authentication failed both tokens are invalid'});
            }
            else{
                 const newAuthToken = jwt.sign({userId:refreshDecoded.userId},JWT_SECRET_KEY,{expiresIn:'10m'});
                 const newRefreshToken = jwt.sign({userId:refreshDecoded.userId},JWT_REFRESH_SECRET_KEY,{expiresIn:'40m'});
                 res.cookie('authToken',newAuthToken,{httpOnly:true})
                 res.cookie('refreshToken',newRefreshToken,{httpOnly:true});
                 req.userId = refreshDecoded.userId;
                 next()
                
            }




        })
       } 
       else{
        req.userId = decoded.userId;
        next();
       }
    })


}
module.exports = authTokenHandler;