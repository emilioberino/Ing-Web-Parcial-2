import express from 'express';
import indexRouter from './src/routes/index.routes';
import dotenv from 'dotenv';
import { connectDB } from './src/config/database';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // O fallback => Puerto :3000

app.use(express.json());
app.use("/", indexRouter);

//Conexion a la Base de Datos Mongo Atlas
const startServer = async() => {
    try {
        await connectDB();

        app.listen(port, () => {
            console.log(`Servidor corriendo en el puerto ${port}`);
            console.log(`MongoDB conectado a: ${process.env.MONGO_URI}`);
        })
    } catch (error) {
        console.error('Error al conectar a la base de datos', error);
        process.exit(1);
    }
}
startServer();