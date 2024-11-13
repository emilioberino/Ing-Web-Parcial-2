import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    contactos: [{
        type: String,  // Storing email addresses
        trim: true
    }]
});

export const User = mongoose.model('User', userSchema);