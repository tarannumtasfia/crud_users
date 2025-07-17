import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import route from './routes/userRoute.js';

const app=express();
app.use(bodyParser.json());
dotenv.config();

const PORT=process.env.PORT || 5000;
const MONGOURL=process.env.MONGO_URL;

mongoose.connect(MONGOURL).then(()=>{
    console.log("Connected to MongoDB");
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err)=>{
    console.log("Error connecting to MongoDB:", err);
})

app.use('/api/user', route);

