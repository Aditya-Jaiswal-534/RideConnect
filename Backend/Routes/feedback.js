const express = require('express');
const router  = express.Router();
const Feedback = require('../Models/feedbackSchema.js')
const errorHandler = require('../Middlewares/errorHandler.js');
const authTokenHandler = require('../MiddleWares/authTokenHandler.js');
const tripIdHandler = require('../MiddleWares/tripIdhandler.js');

router.get('/test',async(req,res)=>{
   try{
    res.status(200).json({
        message: "this feedback api is working correctly",
    })
   }catch(err){
     throw(err);
   }
})
router.get('/allFeedbacks',authTokenHandler,async (req,res,next)=>{
    try{
      
      const feedbacks = await Feedback.find();
      if(!feedbacks){
        return res.status(404).json({ msg: 'no feedbacks found' });
      }
      res.status(200).json({data:feedbacks});
    }
    catch(err){
        next(err);
    }

})

router.get('/:userid',authTokenHandler,async (req,res,next)=>{
    try{
      
      const feedbacks = await Feedback.findById(req.params.userid);
      if(!feedbacks){
        return res.status(404).json({ msg: 'no feedbacks found' });
      }
      res.status(200).json({data:feedbacks});
    }
    catch(err){
        next(err);
    }

})

router.get('/',authTokenHandler,async (req,res,next)=>{
    try{
      const user_id = req.userId;
      const feedbacks = await Feedback.find({
        traveler:user_id,
      });
      if(!feedbacks){
        return res.status(404).json({ msg: 'no feedbacks found' });
      }
      res.status(200).json({data:feedbacks});
    }
    catch(err){
        next(err);
    }

})

router.post('/createFeedback',authTokenHandler,async (req,res,next)=>{
    try{
        console.log(req.tripId);
        const {rating,feedback,traveler=req.userId,trip_id} = req.body;
     
        const newfeedback = new Feedback({
            rating,
            feedback,
            traveler,
            trip_id

    
        })
         await newfeedback.save();
         
        res.status(201).json({ok:true,message:'feedback created successfully'});
    
    } catch(err){
        next(err);
    }

})


router.use(errorHandler);

module.exports = router;