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
    // Removemos o this.initialize() daqui para não termos uma promise não resolvida no construtor
  }

  // Transformamos o initialize no connectDB que o server.ts está à espera
  async connectDB(): Promise<void> {
    const client = await this.pool.connect();
    try {
      console.log('⏳ A conectar ao PostgreSQL e a verificar tabelas...');
      
      // Criar tabelas base se não existirem
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
      
      console.log('✅ PostgreSQL conectado e tabelas validadas com sucesso!');
    } catch (error) {
      console.error('❌ Erro fatal ao conectar/inicializar o PostgreSQL:', error);
      process.exit(1); // Encerra a aplicação se a base de dados falhar no arranque
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

// 1. Exporta uma instância única (Singleton) da sua base de dados para ser usada nos controllers/repositórios
export const db = new PostgresDatabase();

// 2. Exporta a função connectDB para o server.ts poder chamá-la no arranque
export const connectDB = () => db.connectDB();
