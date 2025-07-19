// model/AuthUser.js
import mongoose from 'mongoose';

const authUserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String },       // explicitly define type
  address: { type: String },
});

export default mongoose.model('AuthUsers', authUserSchema);
