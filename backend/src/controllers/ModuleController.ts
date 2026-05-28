import { Request, Response } from 'express';
import { ModuleRepository } from '../repositories/ModuleRepository';

const moduleRepository = new ModuleRepository();

export class ModuleController {
  async getAll(req: Request, res: Response) {
    try {
      const modules = await moduleRepository.getAll();
      res.json(modules);
    } catch (error) {
      console.error('Error fetching modules:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const module = await moduleRepository.getById(id);
      
      if (!module) {
        return res.status(404).json({ error: 'Module not found' });
      }
      
      res.json(module);
    } catch (error) {
      console.error('Error fetching module:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
