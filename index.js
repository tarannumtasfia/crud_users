import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import authUserRoutes from './routes/authUserRoute.js';

dotenv.config();
const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'https://yourfrontenddomain.vercel.app'],
  credentials: true,
}));
app.use(express.json());  // <-- use built-in JSON parser

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL).then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.log("Error connecting to MongoDB:", err);
});


app.use('/api/auth', authRoutes);
app.use('/api/authuser', authUserRoutes);