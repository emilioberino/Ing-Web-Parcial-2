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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *   post:
 *     summary: Create new event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
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
 *             $ref: '#/components/schemas/EventInput'
 *     responses:
 *       200:
 *         description: Event updated
 *       404:
 *         description: Event not found
 *   delete:
 *     summary: Delete event
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event deleted
 *       404:
 *         description: Event not found
 * 
 * components:
 *   schemas:
 *     Event:
 *       type: object
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
 *                 enum: [pendiente, aceptada]
 */

const router = Router();

router.get('/', (req, res) => eventController.getAll(req, res));
router.get('/:id', (req, res) => eventController.getOne(req, res));
router.post('/', (req, res) => eventController.create(req, res));
router.put('/:id', (req, res) => eventController.update(req, res));
router.delete('/:id', (req, res) => eventController.delete(req, res));

export default router;