import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthRouter from './routes/health';
import modulesRouter from './routes/modules';
import ordersRouter from './routes/orders';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors()); // Allow frontend to communicate with backend
app.use(express.json());

// Routes
app.use('/health', healthRouter);
app.use('/api/modules', modulesRouter);
app.use('/api/orders', ordersRouter);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 DevOps Platform Backend is running on http://localhost:${PORT}`);
  console.log(`👉 Healthcheck: http://localhost:${PORT}/health`);
  console.log(`👉 Modules API: http://localhost:${PORT}/api/modules`);
  console.log(`👉 Orders API: http://localhost:${PORT}/api/orders`);
});
