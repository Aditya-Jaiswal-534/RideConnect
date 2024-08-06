const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const rideSchema = new mongoose.Schema(
    {
        
          driverName: {
            type: String,
            required: true,
          },
          driverPhoneNumber: {
            type: String,
            required: true,
          },
          cabNumber: {
            type: String,
            required: true,
          },
          traveler: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
          },
          source: {
            type: String,
            required: true,
          },
          destination: {
            type: String,
            required: true,
          },
          shared:{
            type:Boolean,
            default: false,
          },
          companion:{
            type:String,
            
            
          },
          companionPhoneNumber:{
            type : String,
           
          },
          status:{
            type:Number,
            default:0,
          }

    },{
        timestamps:true,
        
    }
)

const Ride = mongoose.model('Ride', rideSchema)
module.exports = Ride;
