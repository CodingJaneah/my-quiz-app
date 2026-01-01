import mysql, { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';

const requiredEnvVars = ['DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASSWORD', 'DB_DATABASE'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingEnvVars.length > 0) {
  console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

const pool: Pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: { rejectUnauthorized: false },
});

export async function executeQuery<T extends RowDataPacket[]>(
  query: string,
  params: (string | number | boolean | null)[] = []
): Promise<T> {
  const [results] = await pool.execute<T>(query, params);
  return results;
}

export async function executeUpdate(
  query: string,
  params: (string | number | boolean | null)[] = []
): Promise<ResultSetHeader> {
  const [result] = await pool.execute<ResultSetHeader>(query, params);
  return result;
}
