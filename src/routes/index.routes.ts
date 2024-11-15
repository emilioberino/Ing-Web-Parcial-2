// routes/index.routes.ts

import { Router } from 'express';
import eventRouter from './event.routes';
import userRouter from './user.routes';

const router = Router();

// API routes
router.use('/api/events', eventRouter);
router.use('/api/users', userRouter);

// Health check route
/**
 * @swagger
 * /:
 *   get:
 *     summary: Salud del servidor
 *     tags: [Salud]
 *     responses:
 *       200:
 *         description: El servidor está funcionando correctamente
 */
router.get('/', (req, res) => {
    res.send('API is running');
});

export default router;