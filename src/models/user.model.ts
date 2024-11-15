import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        _id: true,
        required: true,
        unique: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Please enter a valid email address'
        ]
    },
    nombre: {
        type: String,
        required: true
    },
    contactos: [
        {
            type: mongoose.Schema.Types.ObjectId, // Dado que el contacto se referencia por email: String, el tipo de dato es String
            ref: 'Usuario' // Referencia al modelo User
        }
    ]
}, {
    _id: false
});

export const Usuario = mongoose.model('Usuario', userSchema);