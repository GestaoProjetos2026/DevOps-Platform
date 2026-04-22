import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthRouter from './routes/health';
import modulesRouter from './routes/modules';

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

// Start server
app.listen(PORT, () => {
  console.log(`🚀 DevOps Platform Backend is running on http://localhost:${PORT}`);
  console.log(`👉 Healthcheck: http://localhost:${PORT}/health`);
  console.log(`👉 Modules API: http://localhost:${PORT}/api/modules`);
});
