import { Request, Response } from 'express';
import { UserService } from '../service/user.service';
import { EventService } from '../service/event.service';
import mongoose from 'mongoose';
import { ReScheduleParams } from '../interfaces/event.interface';
const addInvitado = async (req: Request, res: Response): Promise<void> => {
    try {
        const { eventId, email, contactoEmail } = req.body;

        const usuarioService = new UserService();
        const eventoService = new EventService();
        const usuario = await usuarioService.getUser(email);

        if (!usuario) {
            res.status(404).json({
                message: 'Usuario no encontrado'
            });
            return;
        }

        const evento = await eventoService.getEvent(eventId);

        if (!evento) {
            res.status(404).json({
                message: 'Evento no encontrado'
            });
            return;
        }

        if (evento.anfitrion !== email) {
            res.status(401).json({
                message: 'No tienes permisos para invitar a este evento'
            });
            return;
        }

        const contactos = usuario.contactos;
        const contactoId = new mongoose.Types.ObjectId(contactoEmail.toString());

        if (!contactos.includes(contactoId)) {
            res.status(404).json({
                message: 'Contacto no encontrado'
            });
            return;
        }

        const invitado = {
            usuario: contactoId,
            estado: false
        };

        evento.invitados.push(invitado);
        await evento.save();
        
        res.status(200).json({
            message: 'Invitado añadido correctamente'
        });
        return;

    } catch (error) {
        res.status(500).json({
            message: 'Error en el servidor'
        });
        return;
    }
};

const acceptInvitation = async (req: Request, res: Response): Promise<void> => {
    try {
        const { eventId, email } = req.body;

        if (!eventId || !email) {
            res.status(400).json({
                message: 'Bad request'
            });
        }

        const eventoService = new EventService();
        await eventoService.updateEstadoInvitado(eventId, email, true);

        res.status(200).json({
            message: 'Invitación aceptada'
        });
    }
    catch (error) {
        if (error instanceof Error) {
            switch (error.message) {
                case 'Evento no encontrado':
                case 'Invitado no encontrado':
                    res.status(404).json({ message: error.message });
                default:
                    res.status(500).json({ message: 'Error en el servidor' });
            }
        }
    }
}

const rescheduleEvent = async (req: Request, res: Response) => {
    try {

        const { eventId } = req.params;
        const timeShift: ReScheduleParams = req.body;

        //Object.keys devuelve un array con las propiedades de un objeto. Si el objeto está vacío, el array también lo estará.
        if(!eventId || Object.keys(timeShift).length === 0){
             res.status(400).json({
                message: 'Se requiere ID del evento y parámetros de tiempo'
            })
        }

        const eventoService = new EventService();
        const newEvent = await eventoService.rescheduleEvent(eventId, timeShift);

         res.status(201).json({
            message: 'Evento reprogramado',
            evento: newEvent
        })

    } catch (error) {
        if (error instanceof Error) {
            switch (error.message) {
                case 'Evento no encontrado':
                     res.status(404).json({ message: error.message });
                case 'Evento no es pasado':
                     res.status(400).json({ message: error.message });
                default:
                     res.status(500).json({ message: 'Error en el servidor' });
            }
        }
         res.status(500).json({
            message: 'Error en el servidor'
        });
    }
}

const getUserAgenda = async (req: Request, res: Response) => {
    try {
        const { email } = req.params;

        if(!email){
             res.status(400).json({
                message: 'Se requiere un email'
            });
        }

        const eventoService = new EventService();
        const eventos = await eventoService.getUserAgenda(email);

         res.status(200).json(eventos);
    } catch (error){
        if (error instanceof Error) {
            switch (error.message) {
                case 'Usuario no encontrado':
                     res.status(404).json({ message: error.message });
                default:
                     res.status(500).json({ message: 'Error en el servidor' });
            }
        }
         res.status(500).json({ message: 'Error en el servidor' });

    }
}

export default { addInvitado, acceptInvitation, rescheduleEvent, getUserAgenda };