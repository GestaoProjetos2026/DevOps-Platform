import { db } from '../database';
import { Module } from '../models/Module';

export class ModuleRepository {
  async getAll(): Promise<Module[]> {
    // Usando a instância de banco de dados injetada, não importa se é SQLite ou Postgres
    const result = db.query<Module>('SELECT * FROM modules');
    return result;
  }

  async getById(id: string): Promise<Module | undefined> {
    const result = db.get<Module>('SELECT * FROM modules WHERE id = ?', [id]);
    return result;
  }
}
