import mongoose from 'mongoose';

enum InvitationStatus {
    PENDING = 'pendiente',
    ACCEPTED = 'aceptada'
}

interface Invitado {
    email: string;
    estado: InvitationStatus;
}

const eventSchema = new mongoose.Schema({
    anfitrion: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
        maxLength: 50,
        trim: true
    },
    inicio: {
        type: Date,
        required: true,
        validate: {
            validator: function(v: Date) {
                // Validate 15-minute intervals
                return v.getMinutes() % 15 === 0;
            },
            message: 'El tiempo de inicio debe ser en intervalos de 15 minutos'
        }
    },
    duracion: {
        type: Number,  // Duration in minutes
        required: true,
        validate: {
            validator: function(v: number) {
                return v % 15 === 0 && v > 0;
            },
            message: 'La duración debe ser en intervalos de 15 minutos'
        }
    },
    invitados: [{
        email: {
            type: String,
            required: true,
            trim: true
        },
        estado: {
            type: String,
            enum: Object.values(InvitationStatus),
            default: InvitationStatus.PENDING
        }
    }]
});

export const Event = mongoose.model('Event', eventSchema);