// src/routes/user.routes.ts
import { Router } from 'express';
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *   post:
 *     summary: Create new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
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
 *         description: Contact deleted
 *       404:
 *         description: User not found
 * 
 * components:
 *   schemas:
 *     User:
 *       type: object
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
 *       required:
 *         - email
 *         - nombre
 *       properties:
 *         email:
 *           type: string
 *         nombre:
 *           type: string
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

export default router;