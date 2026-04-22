import { IDatabase } from './IDatabase';
import { SQLiteDatabase } from './SQLiteDatabase';

// Aqui aplicamos a injeção/desacoplamento.
// Quando fomos migrar para Postgres, basta criar a classe PostgresDatabase 
// e mudar a instância retornada aqui, baseando-se em variáveis de ambiente.

const dbType = process.env.DB_TYPE || 'sqlite';

let dbInstance: IDatabase;

if (dbType === 'sqlite') {
  dbInstance = new SQLiteDatabase();
} else {
  // Placeholder para futuro banco geral (ex: PostgreSQL)
  // dbInstance = new PostgresDatabase();
  throw new Error(`Database type ${dbType} is not supported yet.`);
}

export const db = dbInstance;
