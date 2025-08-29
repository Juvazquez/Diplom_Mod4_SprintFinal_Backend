// src/models/User.mjs
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { type } from 'os';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  }
}, { timestamps: true });

// Exportar el modelo con export default
const User = mongoose.model('User', userSchema);
export default User;
