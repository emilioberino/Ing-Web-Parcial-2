import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  contactos: [{
    type: String,
    trim: true,
    lowercase: true
  }]
});

export const User = mongoose.model('User', userSchema);