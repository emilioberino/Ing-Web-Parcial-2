// src/app.ts

import express from 'express';
import indexRouter from './src/routes/index.routes';
import { connectDB } from './src/config/database';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express'
import { specs } from './src/config/swagger';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/', indexRouter);

// Database connection
connectDB();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));