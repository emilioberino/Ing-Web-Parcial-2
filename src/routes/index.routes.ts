// src/routes/index.routes.ts
import { Router } from 'express';
import userRoutes from './user.routes';
import eventRoutes from './event.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/events', eventRoutes);

export default router;