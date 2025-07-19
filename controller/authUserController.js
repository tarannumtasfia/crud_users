import AuthUser from '../model/AuthUser.js';
import bcrypt from 'bcryptjs';
// Get all users (exclude password)
export const fetch = async (req, res) => {
  try {
    const users = await AuthUser.find({}, '-password'); // exclude password only
   
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error fetching users' });
  }
};


// Create user (optional — you already have register)
export const create = async (req, res) => {
  try {
    const { username, password, email, address } = req.body;
    
    const existing = await AuthUser.findOne({ username });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new AuthUser({ username, password: hashed, email, address });
    const savedUser = await newUser.save();
  console.log("Saved User:", savedUser);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update user by id
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const userExist = await AuthUser.findOne({ _id: id });
    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedUser = await AuthUser.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete user by id
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userExist = await AuthUser.findOne({ _id: id });
    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }
    await AuthUser.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
