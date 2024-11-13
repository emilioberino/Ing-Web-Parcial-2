import { Usuario } from "../models/user.model";
import { MongoError } from "mongodb";
export class UserService {

    errorHandling(error: any) {
        if (error instanceof MongoError) {
            throw new Error(`Error de MongoDB: ${error.message}`);
        }
        throw new Error(`Error inesperado: ${error}`);
    }

    //Crear un usuario
    async createUser(email: string, nombre: string) {
        try {
            const usuario = new Usuario({ email, nombre });
            return await usuario.save();
        } catch (error) {
            this.errorHandling(error);
        }
    }

    //Obtener todos los usuarios.
    async getUsers() {
        try {
            return await Usuario.find();
        } catch (error) {
            this.errorHandling(error);
        }
    }

    //Obtener un usuario por email y sus contactos
    async getUser(email: string) {
        try {
            return await Usuario.findOne({
                email
            }).populate('contactos');
        } catch (error) {
            this.errorHandling(error);
        }
    }

    //Actualizar un usuario
    async updateUser(email: string, nombre: string) {
        try {
            return await Usuario.findOneAndUpdate(
                { email },
                { nombre },
                { new: true } //Devuelve el documento actualizado
            );
        } catch (error) {
            this.errorHandling(error);
        }
    }

    //Eliminar un usuario
    async deleteUser(email: string) {
        try {
            return await Usuario.findOneAndDelete({ email });
        } catch (error) {
            this.errorHandling(error);
        }
    }

    //Agregar un contacto a un usuario
    async addContact(email: string, contacto: string) {
        try {
            const user = await Usuario.findOne({ email }); //Notacion shorthand
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            if (!user.contactos.includes(email)) {
                user.contactos.push(contacto);
                return await user.save();
            }
            return user;
        } catch (error) {
            this.errorHandling(error);
        }
    }

    //Eliminar un contacto de un usuario.
    /**
     * filter() => Crea un nuevo array con todos los elementos que cumplan la condición implementada por la función dada.
     * En este caso, se filtran los contactos que no sean iguales al contacto que se desea eliminar.
     * Por último, se guarda el usuario con los contactos filtrados.
     */
    async removeContact(useremail: string, contactoEmail: string) {
        try {
            const usuario = await Usuario.findOne({ email: useremail }); //Notacion normal
            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }

            usuario.contactos = usuario.contactos.filter(contact => contact !== contactoEmail);
            return await usuario.save();
        } catch (error) {
            this.errorHandling(error);
        }
    }

    async getContacts(email: string) {
        try {
            const usuario = await Usuario.findOne({ email });
            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }
            return usuario.contactos;
        } catch (error) {
            this.errorHandling(error);
        }
    }

}