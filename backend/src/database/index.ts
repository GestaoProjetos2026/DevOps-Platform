import { IDatabase } from './IDatabase';

// Injeção/desacoplamento: seleciona implementação com base em env
const dbType = process.env.DB_TYPE || 'sqlite';

let dbInstance: IDatabase;

if (dbType === 'sqlite') {
  const { SQLiteDatabase } = require('./SQLiteDatabase');
  dbInstance = new SQLiteDatabase();
} else if (dbType === 'postgres') {
  const { PostgresDatabase } = require('./PostgresDatabase');
  dbInstance = new PostgresDatabase();
} else {
  throw new Error(`Database type ${dbType} is not supported.`);
}

export const db = dbInstance;
