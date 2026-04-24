import Database from 'better-sqlite3';
import { IDatabase } from './IDatabase';
import path from 'path';
import fs from 'fs';

export class SQLiteDatabase implements IDatabase {
  private db: Database.Database;

  constructor() {
    const dbPath = path.resolve(__dirname, '../../data/devops.db');
    // Ensure data directory exists
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    this.db = new Database(dbPath);
    this.initialize();
  }

  private initialize() {
    // Create initial table for MVP
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS modules (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        squad TEXT NOT NULL,
        status TEXT NOT NULL,
        description TEXT
      );

      CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        customer_name TEXT NOT NULL,
        customer_email TEXT NOT NULL,
        total_amount REAL NOT NULL,
        status TEXT NOT NULL,
        created_at TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS order_items (
        id TEXT PRIMARY KEY,
        order_id TEXT NOT NULL,
        module_id TEXT NOT NULL,
        module_name TEXT NOT NULL,
        price REAL NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders (id)
      );
    `);

    // Seed some mock data if empty
    const count = this.db.prepare('SELECT COUNT(*) as count FROM modules').get() as { count: number };
    if (count.count === 0) {
      const insert = this.db.prepare('INSERT INTO modules (id, name, squad, status, description) VALUES (?, ?, ?, ?, ?)');
      insert.run('1', 'Core Engine & Authentication', 'Squad 1', 'active', 'Gestão de usuários e autenticação');
      insert.run('2', 'Financeiro & Fiscal', 'Squad 2', 'active', 'Módulo de faturamento e notas fiscais');
      insert.run('3', 'CRM & Growth', 'Squad 3', 'development', 'Gestão de relacionamento com clientes');
      insert.run('4', 'Service Desk', 'Squad 4', 'planned', 'Atendimento de chamados e suporte');
      insert.run('5', 'Plataforma DevOps', 'Squad 5', 'active', 'Gerenciamento de infra e automação');
    }
  }

  query<T>(sql: string, params: any[] = []): T[] {
    const stmt = this.db.prepare(sql);
    return stmt.all(...params) as T[];
  }

  execute(sql: string, params: any[] = []): void {
    const stmt = this.db.prepare(sql);
    stmt.run(...params);
  }

  get<T>(sql: string, params: any[] = []): T | undefined {
    const stmt = this.db.prepare(sql);
    return stmt.get(...params) as T | undefined;
  }
}
