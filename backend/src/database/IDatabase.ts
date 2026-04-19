export interface IDatabase {
  query<T>(sql: string, params?: any[]): T[];
  execute(sql: string, params?: any[]): void;
  get<T>(sql: string, params?: any[]): T | undefined;
}
