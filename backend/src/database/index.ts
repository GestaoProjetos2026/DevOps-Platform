import { IDatabase } from './IDatabase';
import { SQLiteDatabase } from './SQLiteDatabase';
import { PostgresDatabase } from './PostgresDatabase';

// Injeção/desacoplamento: seleciona implementação com base em env
const dbType = process.env.DB_TYPE || 'sqlite';

let dbInstance: IDatabase;

if (dbType === 'sqlite') {
  dbInstance = new SQLiteDatabase();
} else if (dbType === 'postgres') {
  dbInstance = new PostgresDatabase();
} else {
  throw new Error(`Database type ${dbType} is not supported.`);
}

export const db = dbInstance;
