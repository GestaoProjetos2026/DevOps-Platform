import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthRouter from './routes/health';
import modulesRouter from './routes/modules';
import ordersRouter from './routes/orders';
import { connectDB } from './database/PostgresDatabase';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
const allowedOrigins = [
  'https://app.devops-platform.40.82.176.176.nip.io'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy does not allow access from this origin'));
    }
  }
}));
app.use(express.json());

// Rotas
app.use('/health', healthRouter);
app.use('/api/modules', modulesRouter);
app.use('/api/orders', ordersRouter);

// Função assíncrona para iniciar a aplicação com segurança
const startServer = async () => {
  // 1. Garante a conexão com o PostgreSQL primeiro
  await connectDB();

  // 2. Inicia o servidor Express
  app.listen(PORT, () => {
    console.log(`🚀 DevOps Platform Backend está a correr em http://localhost:${PORT}`);
    console.log(`👉 Healthcheck: http://localhost:${PORT}/health`);
    console.log(`👉 Modules API: http://localhost:${PORT}/api/modules`);
    console.log(`👉 Orders API: http://localhost:${PORT}/api/orders`);
  });
};

startServer();
