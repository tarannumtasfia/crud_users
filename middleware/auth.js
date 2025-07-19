import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AuthUser from '../model/AuthUser.js';
import User from '../model/AuthUser.js';  // Import your user model

const router = express.Router();


// auth.js or authUserRoute.js

router.post('/register', async (req, res) => {
  try {
    const { username, password, email, address } = req.body;
     

    const existing = await AuthUser.findOne({ username });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);

    // Save all fields
    
    const newAuthUser = new AuthUser({
      username,
      password: hashed,
      email,      
    });
    

    await newAuthUser.save();

    res.status(201).json({ message: 'User registered successfully', user: newAuthUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
