import { Request, Response } from 'express';
import { UserService } from '../service/user.service';
const searchContacto = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.params;
        const { search } = req.query;

        if (!email || !search || typeof search !== 'string') {
            res.status(400).json({
                message: 'Bad request'
            });
            return;
        }

        const userService = new UserService();
        const contactos = await userService.searchContacts(email, search);
        res.status(200).json(contactos);
    } catch (error) {
        res.status(500).json({
            message: 'Error en el servidor'
        });
    }
};

export default {searchContacto};