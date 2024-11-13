// src/controllers/event.controller.ts
import { Request, Response } from 'express';
import { Event } from '../models/Events';

export const eventController = {
  getEvents: async (req: Request, res: Response) => {
    try {
      const events = await Event.find();
      res.json(events);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  getEventById: async (req: Request, res: Response):Promise<void> => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event){
        res.status(404).json({ message: 'Evento no encontrado' });
        return;
      }
      res.json(event);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  createEvent: async (req: Request, res: Response) => {
    const event = new Event({
      anfitrion: req.body.anfitrion,
      descripcion: req.body.descripcion,
      inicio: req.body.inicio,
      duracion: req.body.duracion,
      invitados: req.body.invitados || []
    });
    try {
      const newEvent = await event.save();
      res.status(201).json(newEvent);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  updateEvent: async (req: Request, res: Response):Promise<void> => {
    try {
      const event = await Event.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!event){
        res.status(404).json({ message: 'Evento no encontrado' });
        return;
      }
      res.json(event);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteEvent: async (req: Request, res: Response):Promise<void> => {
    try {
      const event = await Event.findByIdAndDelete(req.params.id);
      if (!event){
        res.status(404).json({ message: 'Evento no encontrado' });
        return;
      } 
      res.json({ message: 'Evento eliminado' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
};