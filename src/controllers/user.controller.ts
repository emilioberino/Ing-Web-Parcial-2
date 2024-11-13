// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import { User } from '../models/User';

export const userController = {
  // Get all users
  getUsers: async (req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get user by email
  getUserByEmail: async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await User.findOne({ email: req.params.email });
      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
        return;
      }
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create user
  createUser: async (req: Request, res: Response) => {
    const user = new User({
      email: req.body.email,
      nombre: req.body.nombre,
      contactos: []
    });
    try {
      const newUser = await user.save();
      res.status(201).json(newUser);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  // Update user
  updateUser: async (req: Request, res: Response):Promise<void> => {
    try {
      const user = await User.findOneAndUpdate(
        { email: req.params.email },
        { nombre: req.body.nombre },
        { new: true }
      );
      if (!user){
        res.status(404).json({ message: 'Usuario no encontrado' });
        return;
      }
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete user
  deleteUser: async (req: Request, res: Response):Promise<void> => {
    try {
      const user = await User.findOneAndDelete({ email: req.params.email });
      if (!user){
        res.status(404).json({ message: 'Usuario no encontrado' });
        return;
      }
      res.json({ message: 'Usuario eliminado' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get user contacts
  getUserContacts: async (req: Request, res: Response):Promise<void> => {
    try {
      const user = await User.findOne({ email: req.params.email });
      if (!user){
        res.status(404).json({ message: 'Usuario no encontrado' });
        return;
      }
      res.json(user.contactos);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  // Add contact
  addContact: async (req: Request, res: Response):Promise<void> => {
    try {
      const user = await User.findOneAndUpdate(
        { email: req.params.email },
        { $addToSet: { contactos: req.body.email } },
        { new: true }
      );
      if (!user){
        res.status(404).json({ message: 'Usuario no encontrado' });
        return;
      } 
      res.status(201).json(user.contactos);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete contact
  deleteContact: async (req: Request, res: Response):Promise<void> => {
    try {
      const user = await User.findOneAndUpdate(
        { email: req.params.email },
        { $pull: { contactos: req.params.contactEmail } },
        { new: true }
      );
      if (!user){
        res.status(404).json({ message: 'Usuario no encontrado' });
        return;
      }
      res.json(user.contactos);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
};