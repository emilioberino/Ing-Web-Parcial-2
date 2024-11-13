import { Request, Response } from 'express';
import { User } from '../models/Users';

export const userController = {
    // Get all users
    getAll: async (_req: Request, res: Response) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching users' });
        }
    },

    // Get single user
    getOne: async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await User.findOne({ email: req.params.email });
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user' });
        }
    },

    // Create user
    create: async (req: Request, res: Response) => {
        try {
            const user = new User(req.body);
            await user.save();
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ message: 'Error creating user' });
        }
    },

    // Update user
    update: async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await User.findOneAndUpdate(
                { email: req.params.email },
                req.body,
                { new: true }
            );
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.json(user);
        } catch (error) {
            res.status(400).json({ message: 'Error updating user' });
        }
    },

    delete: async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await User.findOneAndDelete({ email: req.params.email });
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.json({ message: 'User deleted' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting user' });
        }
    },

    getContacts: async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await User.findOne({ email: req.params.email });
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.json(user.contactos);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching contacts' });
        }
    },

    addContact: async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await User.findOneAndUpdate(
                { email: req.params.email },
                { $addToSet: { contactos: req.body.email } },
                { new: true }
            );
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.json(user.contactos);
        } catch (error) {
            res.status(400).json({ message: 'Error adding contact' });
        }
    },

    deleteContact: async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await User.findOneAndUpdate(
                { email: req.params.email },
                { $pull: { contactos: req.params.contactEmail } },
                { new: true }
            );
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.json({ message: 'Contact deleted' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting contact' });
        }
    }
};