import express from 'express';
import indexRouter from './routes/index.routes';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // O fallback => Puerto :3000

app.use(express.json());
app.use("/", indexRouter);
app.listen(port, () => console.log("La aplicación está corriendo en el puerto 3000"));