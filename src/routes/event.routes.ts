import { Router } from 'express';
import eventController from '../controllers/event.controller';

const eventRouter = Router();

/**
 * @swagger
 * /api/events/invite:
 *   post:
 *     summary: Invitar a un contacto a un evento
 *     tags: [Eventos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventId:
 *                 type: string
 *                 description: ID del evento
 *               email:
 *                 type: string
 *                 description: Email del anfitrión
 *               contactoEmail:
 *                 type: string
 *                 description: Email del contacto a invitar
 *             required:
 *               - eventId
 *               - email
 *               - contactoEmail
 *     responses:
 *       200:
 *         description: Invitado añadido correctamente
 *       400:
 *         description: Bad request
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Evento o contacto no encontrado
 *       500:
 *         description: Error en el servidor
 */
eventRouter.post('/invite', eventController.addInvitado);
/**
 * @swagger
 * /api/events/{eventId}/accept:
 *   put:
 *     summary: Aceptar una invitación a un evento
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del evento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email del usuario que acepta la invitación
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Invitación aceptada
 *       400:
 *         description: Bad request
 *       404:
 *         description: Evento o invitación no encontrada
 *       500:
 *         description: Error en el servidor
 */
eventRouter.put('/:eventId/accept', eventController.acceptInvitation);
/**
 * @swagger
 * /api/events/{eventId}/reschedule:
 *   put:
 *     summary: Reprogramar un evento pasado
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del evento a reprogramar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               days:
 *                 type: number
 *               weeks:
 *                 type: number
 *               months:
 *                 type: number
 *               years:
 *                 type: number
 *             description: Tiempo para desplazar la fecha del evento
 *     responses:
 *       201:
 *         description: Evento reprogramado
 *       400:
 *         description: Bad request o evento no pasado
 *       404:
 *         description: Evento no encontrado
 *       500:
 *         description: Error en el servidor
 */
eventRouter.put('/:eventId/reschedule', eventController.rescheduleEvent);
/**
 * @swagger
 * /api/events/agenda/{email}:
 *   get:
 *     summary: Obtener la agenda de un usuario
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email del usuario
 *     responses:
 *       200:
 *         description: Lista de eventos del usuario
 *       400:
 *         description: Bad request
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
eventRouter.get('/agenda/:email', eventController.getUserAgenda);

export default eventRouter;