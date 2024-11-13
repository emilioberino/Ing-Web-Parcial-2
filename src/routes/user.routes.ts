// src/routes/user.routes.ts
import { Router } from 'express';
<<<<<<< Updated upstream
import { userController } from '../controller/userController';

/**
 * @openapi
 * tags:
 *   - name: Users
 *     description: User management endpoints
 *   - name: Contacts
 *     description: Contact management endpoints
 * 
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
=======
import { userController } from '../controllers/user.controller';

const router = Router();

/**
 * @openapi
 * /api/usuarios:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
>>>>>>> Stashed changes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
<<<<<<< Updated upstream
 *   post:
 *     summary: Create new user
 *     tags: [Users]
=======
 */
router.get('/', userController.getUsers);

/**
 * @openapi
 * /api/usuarios/{email}:
 *   get:
 *     summary: Obtiene un usuario por email
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:email', userController.getUserByEmail);

/**
 * @openapi
 * /api/usuarios:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuarios]
>>>>>>> Stashed changes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
<<<<<<< Updated upstream
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: User created
 * 
 * /users/{email}:
 *   get:
 *     summary: Get user by email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 *   put:
 *     summary: Update user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: User updated
 *       404:
 *         description: User not found
 *   delete:
 *     summary: Delete user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 * 
 * /users/{email}/contacts:
 *   get:
 *     summary: Get user contacts
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of contacts
 *       404:
 *         description: User not found
 *   post:
 *     summary: Add contact
 *     tags: [Contacts]
=======
 *             type: object
 *             required:
 *               - email
 *               - nombre
 *             properties:
 *               email:
 *                 type: string
 *               nombre:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado
 *       400:
 *         description: Datos inválidos
 */
router.post('/', userController.createUser);

/**
 * @openapi
 * /api/usuarios/{email}:
 *   put:
 *     summary: Actualiza un usuario
 *     tags: [Usuarios]
>>>>>>> Stashed changes
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
<<<<<<< Updated upstream
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact added
 *       404:
 *         description: User not found
 * 
 * /users/{email}/contacts/{contactEmail}:
 *   delete:
 *     summary: Delete contact
 *     tags: [Contacts]
=======
 *               nombre:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       404:
 *         description: Usuario no encontrado
 */
router.put('/:email', userController.updateUser);

/**
 * @openapi
 * /api/usuarios/{email}:
 *   delete:
 *     summary: Elimina un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/:email', userController.deleteUser);

/**
 * @openapi
 * /api/usuarios/{email}/contactos:
 *   get:
 *     summary: Obtiene los contactos de un usuario
 *     tags: [Contactos]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de contactos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.get('/:email/contactos', userController.getUserContacts);

/**
 * @openapi
 * /api/usuarios/{email}/contactos:
 *   post:
 *     summary: Añade un contacto a un usuario
 *     tags: [Contactos]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contacto añadido
 *       404:
 *         description: Usuario no encontrado
 */
router.post('/:email/contactos', userController.addContact);

/**
 * @openapi
 * /api/usuarios/{email}/contactos/{contactEmail}:
 *   delete:
 *     summary: Elimina un contacto de un usuario
 *     tags: [Contactos]
>>>>>>> Stashed changes
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: contactEmail
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
<<<<<<< Updated upstream
 *         description: Contact deleted
 *       404:
 *         description: User not found
 * 
=======
 *         description: Contacto eliminado
 *       404:
 *         description: Usuario o contacto no encontrado
 */
router.delete('/:email/contactos/:contactEmail', userController.deleteContact);

/**
 * @openapi
>>>>>>> Stashed changes
 * components:
 *   schemas:
 *     User:
 *       type: object
<<<<<<< Updated upstream
 *       properties:
 *         email:
 *           type: string
 *         nombre:
 *           type: string
 *         contactos:
 *           type: array
 *           items:
 *             type: string
 *     UserInput:
 *       type: object
=======
>>>>>>> Stashed changes
 *       required:
 *         - email
 *         - nombre
 *       properties:
 *         email:
 *           type: string
 *         nombre:
 *           type: string
<<<<<<< Updated upstream
 */

const router = Router();

router.get('/', (req, res) => userController.getAll(req, res));
router.get('/:email', (req, res) => userController.getOne(req, res));
router.post('/', (req, res) => userController.create(req, res));
router.put('/:email', (req, res) => userController.update(req, res));
router.delete('/:email', (req, res) => userController.delete(req, res));
router.get('/:email/contacts', (req, res) => userController.getContacts(req, res));
router.post('/:email/contacts', (req, res) => userController.addContact(req, res));
router.delete('/:email/contacts/:contactEmail', (req, res) => userController.deleteContact(req, res));

=======
 *         contactos:
 *           type: array
 *           items:
 *             type: string
 */

>>>>>>> Stashed changes
export default router;