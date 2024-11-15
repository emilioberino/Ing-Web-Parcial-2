// src/routes/user.routes.ts

import { Router } from 'express';
import userController from '../controllers/user.controller';

const userRouter = Router();

/**
 * @swagger
 * /api/users/{email}/contacts/search:
 *   get:
 *     summary: Buscar contactos de un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email del usuario
 *       - in: query
 *         name: search
 *         required: true
 *         schema:
 *           type: string
 *         description: Término de búsqueda para filtrar contactos
 *     responses:
 *       200:
 *         description: Lista de contactos filtrados
 *       400:
 *         description: Bad request
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
userRouter.get('/:email/contacts/search', userController.searchContacto);

export default userRouter;