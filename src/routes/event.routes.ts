<<<<<<< Updated upstream
import { Router } from 'express';
import { eventController } from '../controller/eventController';

/**
 * @openapi
 * tags:
 *   - name: Events
 *     description: Event management endpoints
 * 
 * /events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of events
=======
// src/routes/event.routes.ts
import { Router } from 'express';
import { eventController } from '../controllers/event.controller';

const router = Router();

/**
 * @openapi
 * /api/eventos:
 *   get:
 *     summary: Obtiene todos los eventos
 *     tags: [Eventos]
 *     responses:
 *       200:
 *         description: Lista de eventos
>>>>>>> Stashed changes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
<<<<<<< Updated upstream
 *   post:
 *     summary: Create new event
 *     tags: [Events]
=======
 */
router.get('/', eventController.getEvents);

/**
 * @openapi
 * /api/eventos/{id}:
 *   get:
 *     summary: Obtiene un evento por ID
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Evento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Evento no encontrado
 */
router.get('/:id', eventController.getEventById);

/**
 * @openapi
 * /api/eventos:
 *   post:
 *     summary: Crea un nuevo evento
 *     tags: [Eventos]
>>>>>>> Stashed changes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
<<<<<<< Updated upstream
 *             $ref: '#/components/schemas/EventInput'
 *     responses:
 *       201:
 *         description: Event created
 * 
 * /events/{id}:
 *   get:
 *     summary: Get event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event found
 *       404:
 *         description: Event not found
 *   put:
 *     summary: Update event
 *     tags: [Events]
=======
 *             type: object
 *             required:
 *               - anfitrion
 *               - descripcion
 *               - inicio
 *               - duracion
 *             properties:
 *               anfitrion:
 *                 type: string
 *               descripcion:
 *                 type: string
 *                 maxLength: 50
 *               inicio:
 *                 type: string
 *                 format: date-time
 *               duracion:
 *                 type: number
 *               invitados:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                     estado:
 *                       type: string
 *                       enum: [aceptada, pendiente]
 *     responses:
 *       201:
 *         description: Evento creado
 *       400:
 *         description: Datos inválidos
 */
router.post('/', eventController.createEvent);

/**
 * @openapi
 * /api/eventos/{id}:
 *   put:
 *     summary: Actualiza un evento
 *     tags: [Eventos]
>>>>>>> Stashed changes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
<<<<<<< Updated upstream
 *             $ref: '#/components/schemas/EventInput'
 *     responses:
 *       200:
 *         description: Event updated
 *       404:
 *         description: Event not found
 *   delete:
 *     summary: Delete event
 *     tags: [Events]
=======
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Evento actualizado
 *       404:
 *         description: Evento no encontrado
 */
router.put('/:id', eventController.updateEvent);

/**
 * @openapi
 * /api/eventos/{id}:
 *   delete:
 *     summary: Elimina un evento
 *     tags: [Eventos]
>>>>>>> Stashed changes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
<<<<<<< Updated upstream
 *         description: Event deleted
 *       404:
 *         description: Event not found
 * 
=======
 *         description: Evento eliminado
 *       404:
 *         description: Evento no encontrado
 */
router.delete('/:id', eventController.deleteEvent);

/**
 * @openapi
>>>>>>> Stashed changes
 * components:
 *   schemas:
 *     Event:
 *       type: object
<<<<<<< Updated upstream
 *       properties:
 *         _id:
 *           type: string
 *         anfitrion:
 *           type: string
 *         descripcion:
 *           type: string
 *           maxLength: 50
 *         inicio:
 *           type: string
 *           format: date-time
 *         duracion:
 *           type: number
 *         invitados:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               estado:
 *                 type: string
 *                 enum: [pendiente, aceptada]
 *     EventInput:
 *       type: object
=======
>>>>>>> Stashed changes
 *       required:
 *         - anfitrion
 *         - descripcion
 *         - inicio
 *         - duracion
 *       properties:
 *         anfitrion:
 *           type: string
 *         descripcion:
 *           type: string
 *           maxLength: 50
 *         inicio:
 *           type: string
 *           format: date-time
 *         duracion:
 *           type: number
 *         invitados:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               estado:
 *                 type: string
<<<<<<< Updated upstream
 *                 enum: [pendiente, aceptada]
 */

const router = Router();

router.get('/', (req, res) => eventController.getAll(req, res));
router.get('/:id', (req, res) => eventController.getOne(req, res));
router.post('/', (req, res) => eventController.create(req, res));
router.put('/:id', (req, res) => eventController.update(req, res));
router.delete('/:id', (req, res) => eventController.delete(req, res));

=======
 *                 enum: [aceptada, pendiente]
 */

>>>>>>> Stashed changes
export default router;