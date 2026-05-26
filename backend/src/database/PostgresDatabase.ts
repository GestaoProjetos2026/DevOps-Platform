import { Pool } from 'pg';
import { IDatabase } from './IDatabase';

export class PostgresDatabase implements IDatabase {
  private pool: Pool;

  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = Number(process.env.DB_PORT || 5432);
    const database = process.env.DB_NAME || 'infra_banco';
    const user = process.env.DB_USER || 'user_devops_platform';
    const password = process.env.DB_PASSWORD || '';

    this.pool = new Pool({ host, port, database, user, password });
    this.initialize();
  }

  private async initialize() {
    // Criar tabelas base se não existirem (serão criadas no schema do usuário conectado)
    const client = await this.pool.connect();
    try {
      await client.query(`
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
          total_amount DOUBLE PRECISION NOT NULL,
          status TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );

        CREATE TABLE IF NOT EXISTS order_items (
          id TEXT PRIMARY KEY,
          order_id TEXT NOT NULL,
          module_id TEXT NOT NULL,
          module_name TEXT NOT NULL,
          price DOUBLE PRECISION NOT NULL,
          FOREIGN KEY (order_id) REFERENCES orders (id)
        );
      `);
    } finally {
      client.release();
    }
  }

  async query<T>(sql: string, params: any[] = []): Promise<T[]> {
    const res = await this.pool.query(sql, params);
    return res.rows as T[];
  }

  async execute(sql: string, params: any[] = []): Promise<void> {
    await this.pool.query(sql, params);
  }

  async get<T>(sql: string, params: any[] = []): Promise<T | undefined> {
    const res = await this.pool.query(sql, params);
    return res.rows[0] as T | undefined;
  }
}
