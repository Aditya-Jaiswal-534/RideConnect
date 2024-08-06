require('dotenv').config();
const express = require('express');
const authTokenHandler = require('../MiddleWares/authTokenHandler');
const router  = express.Router();

const TWILIO_ACCOUNT_SID='AC54a7ea22b8facf1e9451397f7d0ae1d5'
const TWILIO_AUTH_TOKEN = '84573452bf1063d93c84d47d068eef01'
const TWILIO_FROM_NUMBER = '+17073143845'
const TO_NUMBER = '+917058835050'
const accountSid =TWILIO_ACCOUNT_SID;
const authToken = TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid,authToken);
const sendSms = async (body) =>{
  const  nbody = JSON.stringify(body)
    let msgOptions = {
        from : TWILIO_FROM_NUMBER,
        to : body.companionPhoneNumber,
        body:nbody,
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