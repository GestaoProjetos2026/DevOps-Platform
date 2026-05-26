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
app.use(cors()); // Permite a comunicação com o frontend
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
