import mongoose from "mongoose";
import { IEventoData, ReScheduleParams } from "../interfaces/event.interface";
import { Evento } from "../models/event.model";
import { MongoError } from "mongodb";

export class EventService {
    private errorHandling(error: any) {
        if (error instanceof MongoError) {
            throw new Error(`Error de MongoDB: ${error.message}`);
        }
        throw new Error(`Error inesperado: ${error}`);
    }

    //Crear un evento

    async createEvent(anfitrion: string, descripcion: string, inicio: Date, duracion: number) {
        try {
            const evento = new Evento({
                anfitrion,
                descripcion,
                inicio,
                duracion,
                invitados: [] // Inicialmente no hay invitados
            });
            return await evento.save();
        } catch (error) {
            this.errorHandling(error);
        }
    }

    //Obtener todos los eventos
    async getEvents() {
        try {
            return await Evento.find();
        } catch (error) {
            this.errorHandling(error);
        }
    }

    //Obtener un evento por id
    async getEvent(id: string) {
        try {
            return await Evento.findById(id);
        } catch (error) {
            this.errorHandling(error);
        }
    }

    //Actualizar un evento
    async updateEvent(id: string, updateData: Partial<IEventoData>) {
        try {
            // Check if event exists
            const event = await Evento.findById(id);
            if (!event) {
                throw new Error('Evento no encontrado');
            }

            // Validate update data
            if (updateData.inicio && updateData.inicio.getMinutes() % 15 !== 0) {
                throw new Error('El inicio debe ser en intervalos de 15 minutos');
            }
            if (updateData.duracion && updateData.duracion % 15 !== 0) {
                throw new Error('La duración debe ser múltiplo de 15 minutos');
            }

            return await Evento.findByIdAndUpdate(
                id,
                updateData,
                {
                    new: true,
                    runValidators: true // Important: Run schema validators
                }
            ).populate('invitados.usuario');

        } catch (error) {
            this.errorHandling(error);
        }
    }

    //Eliminar un evento
    async deleteEvent(id: string) {
        try {
            return await Evento.findByIdAndDelete(id);
        } catch (error) {
            this.errorHandling(error);
        }
    }

    //Agregar un invitado a un evento

    async addInvitado(eventId: string, usuarioEmail: string) {
        try {
            const event = await Evento.findById(eventId);
            if (!event) {
                throw new Error('Evento no encontrado');
            }
            const invitadoId = new mongoose.Types.ObjectId(usuarioEmail);

            const isInvited = event.invitados.find(inv => inv.usuario.equals(invitadoId));
            if (isInvited) {
                throw new Error('El usuario ya ha sido invitado');
            }

            event.invitados.push({
                usuario: invitadoId,
                estado: false
            });

        } catch (error) {
            this.errorHandling(error);
        }
    }

    //Eliminar un invitado de un evento
    async deleteInvitado(eventId: string, usuarioEmail: string) {
        try {
            const event = await Evento.findById(eventId);
            if (!event) {
                throw new Error('Evento no encontrado');
            }

            event.invitados.pull({
                usuario: usuarioEmail
            });

            return await event.save();
        } catch (error) {
            this.errorHandling(error);
        }
    }

    async updateEstadoInvitado(eventId: string, usuarioEmail: string, estado: boolean) {
        try {
            const event = await Evento.findById(eventId);

            if (!event) {
                throw new Error('Evento no encontrado');
            }

            const invitadoId = new mongoose.Types.ObjectId(usuarioEmail);
            const invitado = event.invitados.find(inv => inv.usuario.equals(invitadoId));

            if (!invitado) {
                throw new Error('Invitado no encontrado');
            }

            invitado.estado = estado;

        } catch (error) {
            this.errorHandling(error);
        }
    }

    async rescheduleEvent(eventId: string, timeShift: ReScheduleParams) {
        try {
            const event = await Evento.findById(eventId);
            if (!event) {
                throw new Error('Evento no encontrado');
            }

            // Comprobar si el evento no ha pasado
            if (event.inicio > new Date()) {
                throw new Error('No se puede reprogramar un evento pasado');
            }

            // Calcular la nueva fecha
            const newDate = new Date(event.inicio);
            if (timeShift.days) {
                newDate.setDate(newDate.getDate() + timeShift.days);
            }
            if (timeShift.weeks) {
                newDate.setDate(newDate.getDate() + timeShift.weeks * 7);
            }
            if (timeShift.months) {
                newDate.setMonth(newDate.getMonth() + timeShift.months);
            }
            if (timeShift.years) {
                newDate.setFullYear(newDate.getFullYear() + timeShift.years);
            }

            const newEvent = new Evento({
                anfitrion: event.anfitrion,
                descripcion: event.descripcion,
                inicio: newDate,
                duracion: event.duracion,
                invitados: event.invitados
            });
            return await newEvent.save();
        } catch (error) {
            this.errorHandling(error);
        }
    }

    async getUserAgenda(email: string) {
        try {

            const ownEvents = await Evento.find({ anfitrion: email});

            const invitedEvents = await Evento.find({ 'invitados.usuario': email });

            const allEvents = [...ownEvents, ...invitedEvents].sort((a, b) => a.inicio.getTime() - b.inicio.getTime());

        } catch (error) {
            this.errorHandling(error);
        }
    }
}