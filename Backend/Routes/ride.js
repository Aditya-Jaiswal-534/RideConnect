const express = require('express');
const router  = express.Router();
const app = express();
const Ride = require('../Models/RideSchema')
const User = require('../Models/UserSchema.js')
const errorHandler = require('../Middlewares/errorHandler.js');
const authTokenHandler = require('../MiddleWares/authTokenHandler.js');
const tripIdHandler = require('../MiddleWares/tripIdhandler.js');
router.use(errorHandler);
router.get('/test',async(req,res)=>{
   try{
    res.status(200).json({
        message: "this ride api is working correctly",
    })
   }catch(err){
     throw(err);
   }
})
router.get('/getData',async(req,res)=>{
    try{
        const user_id = req.userId;
        const person = User.findById({
            _id:user_id
        })
        console.log(person)
        const data ={
            name : person.name,
            email : person.email,

        }
     res.status(200).json({
         data:data
     })
    }catch(err){
      throw(err);
    }
 })

router.get('/',authTokenHandler,async (req,res,next)=>{
    try{
      const user_id = req.userId;
      const rides = await Ride.find({
        traveler:user_id
      }).sort({createdAt:-1});
      if(!rides){
        return res.status(404).json({ msg: 'No past rides found' });
      }
      res.status(200).json({ok:true,data:rides,message:"following are your rides"});
    }
    catch(err){
        next(err);
    }

})
router.put('/updateRide',authTokenHandler,async (req,res,next)=>{
    try{
        const {_id} = req.body;
        console.log(_id);
       
        const ride =  await Ride.findByIdAndUpdate(_id,{
            
            status:1

    
        })
       
     
       
        
        res.status(201).json({ok:true,message:'ride updated successfully'});
        next();
    
    } catch(err){
        next(err);
    }

})
router.post('/createride',authTokenHandler,async (req,res,next)=>{
    try{
        const {driverName,driverPhoneNumber,cabNumber,traveler=req.userId,source ,destination,companion,companionPhoneNumber} = req.body;
       
        const newride = new Ride({
            driverName,
            driverPhoneNumber,
            cabNumber,
            traveler,
            source,
            destination,
            companion,
            companionPhoneNumber

    
        })
         await newride.save();
        const tripId = newride._id;
        res.setHeader('tripId',tripId)
        res.status(201).json({ok:true,message:'ride created successfully',tripId:tripId});
        next();
    
    } catch(err){
        next(err);
    }

})
router.get('/allSharedrides',authTokenHandler,async (req,res,next)=>{
    try{
       const rides = await Ride.find();
       if(!rides){
        res.json({
            message:"No rides found"
        })
       }
        res.status(201).json({ok:true,rides:rides});
    
    } catch(err){
        next(err);
    }

})


module.exports = router;