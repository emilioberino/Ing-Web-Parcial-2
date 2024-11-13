import mongoose from "mongoose";
const invitadoSchema = new mongoose.Schema({
    usuario: {
        type: String,
        ref: 'Usuario',
        required: true
    },
    estado: {
        type: Boolean,
        default: false
    }
});
const eventSchema = new mongoose.Schema({
    anfitrion:{
        type: String,
        required: true
    },
    descripcion:{
        type: String,
        required: true,
        maxlength: 50
    },
    inicio:{
        type: Date,
        required: true,
        validate: {
            validator: function(v: Date){
                const minutes = v.getMinutes();
                //Checkear intervalos de 15 minutos
                return minutes % 15 === 0;
            },
            message: 'La hora de inicio debe ser un múltiplo de 15 minutos'
        }
    },
    duracion:{
        type: Number,
        required: true,
        min: 15,
        validate:{
            validator: function(v: number){
                return v % 15 === 0;
            },
            message: 'La duración debe ser un múltiplo de 15 minutos'
        }
    },
    invitados: [
        invitadoSchema
    ]
});

export const Evento = mongoose.model('Evento', eventSchema);