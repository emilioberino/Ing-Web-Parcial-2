// src/app.ts (move app.ts to src folder)
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger';
import userRoutes from './routes/user.routes';
import eventRoutes from './routes/event.routes';

const app = express();
const port = process.env.PORT || 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(express.json());
app.use('/api/usuarios', userRoutes);
app.use('/api/eventos', eventRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;