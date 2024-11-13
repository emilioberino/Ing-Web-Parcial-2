import mongoose from 'mongoose';

<<<<<<< Updated upstream
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
=======
const invitadoSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  estado: {
    type: String,
    enum: ['aceptada', 'pendiente'],
    default: 'pendiente'
  }
});

const eventSchema = new mongoose.Schema({
  anfitrion: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
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
      message: 'Inicio must be in 15-minute intervals'
    }
  },
  duracion: {
    type: Number,
    required: true,
    validate: {
      validator: function(v: number) {
        // Validate 15-minute intervals
        return v % 15 === 0 && v > 0;
      },
      message: 'Duración must be in 15-minute intervals and greater than 0'
    }
  },
  invitados: [invitadoSchema]
}, {
  timestamps: true
>>>>>>> Stashed changes
});

export const Event = mongoose.model('Event', eventSchema);