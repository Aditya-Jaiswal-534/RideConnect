require('dotenv').config();
const express = require('express');
const authTokenHandler = require('../MiddleWares/authTokenHandler');
const router  = express.Router();



const sendSms = async (body) =>{
  const  nbody = JSON.stringify(body)
    let msgOptions = {
        from : TWILIO_FROM_NUMBER,
        to : body.companionPhoneNumber,
        body:nbod
    }
    try{
        const message = await client.messages.create(msgOptions);
        console.log(message);

    }catch(err){
        throw(err);

    }
}
router.get('/test', async (req,res)=>{
  res.json({
    message:"this notification api is working properly"
  })
})
router.post('/send',authTokenHandler,async (req,res)=>{
    try{
          console.log(req.body);
          await sendSms(req.body);
         res.status(200).json({
            ok:true,
            message:"notification sent succesfully"
         });
    }
    catch(err){
        throw(err);
    }
})

module.exports = router;