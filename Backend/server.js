const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const bodyParser  = require('body-parser');
const dotenv = require('dotenv').config();
const port = 8000;
const connectDb = require('./db.js');
connectDb();
console.log(process.env.PORT);
app.use(bodyParser.json());


const corsOptions = {
    origin: 'http://localhost:5173', // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
  };
  
  app.use(cors(corsOptions));
app.use(cookieParser());
const authRoute = require("./Routes/auth");
const rideRoute = require("./Routes/ride");
const feedbackRoute = require('./Routes/feedback');
const notificationRoute = require('./Routes/notifications.js');

app.get('/',(req,res)=>{
    res.json({
        message:'this rideshare is working properly'
    });
})
app.use('/auth', authRoute);
app.use('/ride',rideRoute);
app.use('/feedback',feedbackRoute);
app.use('/notification',notificationRoute);
app.listen(port,()=>{
    console.log(`sever running on port ${port}`)
})