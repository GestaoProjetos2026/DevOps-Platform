import { Router } from 'express';
import { db } from '../database';

const router = Router();

router.get('/', (req, res) => {
  try {
    // Tenta fazer uma query simples no banco para confirmar que a conexão está saudável
    db.query('SELECT 1');
    
    res.json({
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      database: 'disconnected',
      error: (error as Error).message,
      timestamp: new Date().toISOString(),
    });
  }
});

export default router;
