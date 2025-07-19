import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AuthUser from '../model/AuthUser.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, password, email, address } = req.body;

    const existing = await AuthUser.findOne({ username });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = new AuthUser({
      username,
      password: hashed,
      email,
      address,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await AuthUser.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid username or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid username or password' });

    // Create JWT token (use your secret from .env)
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email, address: user.address } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
