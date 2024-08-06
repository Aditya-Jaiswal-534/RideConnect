const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const feedbackSchema = new mongoose.Schema(
    {
        rating :{
            type : Number,
            required: true,

        },
        feedback:{
            type: String,
            required:true,
        },
        traveler:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
            required: true,
        },
        trip_id :{
           type:String,
            required:true,
        }
        

    },{
        timestamps:true,
        
    }
)

const Feedback = mongoose.model('Feedback', feedbackSchema)
module.exports = Feedback;
