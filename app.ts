import express from 'express';
import { connectDB } from './src/config/database';
import userRoutes from './src/routes/user.routes';
import eventRoutes from './src/routes/event.routes';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { specs } from './src/config/swagger';

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});