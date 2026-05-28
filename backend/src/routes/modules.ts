import { Router } from 'express';
import { ModuleController } from '../controllers/ModuleController';

const router = Router();
const moduleController = new ModuleController();

router.get('/', moduleController.getAll);
router.get('/:id', moduleController.getById);

export default router;
