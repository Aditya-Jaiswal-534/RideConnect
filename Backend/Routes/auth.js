const express = require('express');
const router  = express.Router();
const User = require('../Models/UserSchema')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const errorHandler = require('../Middlewares/errorHandler.js');
const authTokenHandler = require('../MiddleWares/authTokenHandler.js');
const JWT_SECRET_KEY = 'adi123'
const JWT_REFRESH_SECRET_KEY ='adi123'
//rokk rwlq xgcp fprp

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'anime.vbh@gmail.com',
        pass:'rokkrwlqxgcpfprp'
    }

})

router.get('/', async (req,res)=>{
    res.json({message:'auth api is working'})
})

router.post('/sendotp', async (req,res,next)=>{
    const {email} = req.body;
    const otp = Math.floor(100000 + Math.random() *900000);
    try{
         const mailOptions = {
            from:'process.env.COMPANY_EMAIL',
            to:email,
            subject:'OTP',
            text:`your otp is ${otp}`
        }
        transporter.sendMail(mailOptions, async (err,info)=>{
            if(err){
                return res.status(401).json({ok:false,error:'something went wrong'})
            }
            else{
                res.status(200).json({ok:true,message:"OTP sent succsessfully!",otp: otp})
            }

        })
    }
    catch{
        next(err);
    }

})

router.post('/register', async (req,res,next)=>{
try{
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        return res.status(401).json({ok:false,error:'please add all the fields'})}
        const existinguser = await User.findOne({ email
    });
    if(existinguser){
        return res.status(422).json({ok:false,error:'user already exist'})
    }
    const newuser = new User({
        name,
        email,
        password

    })
     await newuser.save();
    res.status(201).json({ok:true,message:'user created successfully'});

} catch(err){
    next(err);
}

})


router.post('/login', async (req, res,next) => {
    try{
        const {email,password} = req.body;
        if(!email||!password){
            return res.status(401).json({ok:false,error:'please add all the fields'});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(422).json({ok:false,error:'user does not exist '});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        console.log(isMatch);
        if(!isMatch){
            return res.status(422).json({ok:false,error:'invalid password'});
        }
        const authToken = jwt.sign({userId:user._id},JWT_SECRET_KEY,{expiresIn: '10m'})
        const refreshToken = jwt.sign({userId:user._id},JWT_REFRESH_SECRET_KEY,{expiresIn: '40m'})
        

        res.cookie('authToken',authToken,{httpOnly:true});
        res.cookie('refreshToken',refreshToken,{httpOnly:true});
        res.status(201).json({ok:true,message:'user logged in successfully',user:req.userId,token:authToken});
       
    
    }
    catch(err){
        next(err);
    }
})
router.use(errorHandler);
router.get('/checkLogin',authTokenHandler,async (req,res)=>{
try{res.json({ok:true,message:'user logged in successfully'});} catch(err){
    res.json({ok:false,error:err.message})
}

});
router.get('/logout',authTokenHandler,async (req,res)=>{
    try{
            res.clearCookie('authToken');
            res.clearCookie('refreshToken');
            res.json({ok:true,message:'user logged out successfully',authtoken:authToken});
    } catch(err){
        res.json({ok:false,error:err.message})
    }
    
    });

module.exports = router;