import express from 'express';
import indexRouter from './routes/index.routes';

const app = express();
const port = 3000;

app.use(express.json());
app.use("/", indexRouter);
app.listen(port, () => console.log("La aplicación está corriendo en el puerto 3000"));