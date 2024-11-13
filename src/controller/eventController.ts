// src/controllers/eventController.ts
import { Request, Response } from 'express';
import { Event } from '../models/Events';

export const eventController = {
    // Get all events
    getAll: async (_req: Request, res: Response) => {
        try {
            const events = await Event.find();
            res.json(events);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching events' });
        }
    },

    // Get single event
    getOne: async (req: Request, res: Response): Promise<void> => {
        try {
            const event = await Event.findById(req.params.id);
            if (!event) {
                res.status(404).json({ message: 'Event not found' });
                return;
            }
            res.json(event);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching event' });
        }
    },

    // Create event
    create: async (req: Request, res: Response) => {
        try {
            const event = new Event(req.body);
            await event.save();
            res.status(201).json(event);
        } catch (error) {
            res.status(400).json({ message: 'Error creating event' });
        }
    },

    // Update event
    update: async (req: Request, res: Response): Promise<void> => {
        try {
            const event = await Event.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!event) {
                res.status(404).json({ message: 'Event not found' });
                return;
            }
            res.json(event);
        } catch (error) {
            res.status(400).json({ message: 'Error updating event' });
        }
    },

    // Delete event
    delete: async (req: Request, res: Response): Promise<void> => {
        try {
            const event = await Event.findByIdAndDelete(req.params.id);
            if (!event) {
                res.status(404).json({ message: 'Event not found' });
                return;
            }
            res.json({ message: 'Event deleted' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting event' });
        }
    }
};