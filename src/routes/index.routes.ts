<<<<<<< Updated upstream
// src/routes/index.routes.ts
import { Router } from 'express';
import userRoutes from './user.routes';
import eventRoutes from './event.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
=======
import { Router } from "express";

const router = Router();

//Esto por ahora es dummy esto evidenetemente se va a cambiar
router.get("/", (req, res) => {
    res.send("Hello World");
});
>>>>>>> Stashed changes

export default router;