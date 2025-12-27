import mysql, { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';

/**
 * MySQL connection pool instance
 * Configured using Aiven credentials for secure cloud database connection
 */
const pool: Pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 23681,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: true,
  },
});

/**
 * Executes a SELECT query and returns the results
 * @param query - SQL query string
 * @param params - Query parameters for prepared statements
 * @returns Array of rows matching the query
 */
export async function executeQuery<T extends RowDataPacket[]>(
  query: string,
  params: (string | number | boolean | null)[] = []
): Promise<T> {
  const [results] = await pool.execute<T>(query, params);
  return results;
}

/**
 * Executes an INSERT, UPDATE, or DELETE query
 * @param query - SQL query string
 * @param params - Query parameters for prepared statements
 * @returns ResultSetHeader containing affected rows, insertId, etc.
 */
export async function executeUpdate(
  query: string,
  params: (string | number | boolean | null)[] = []
): Promise<ResultSetHeader> {
  const [result] = await pool.execute<ResultSetHeader>(query, params);
  return result;
}

/**
 * Tests the database connection
 * @returns True if connection is successful, throws error otherwise
 */
export async function testConnection(): Promise<boolean> {
  const connection = await pool.getConnection();
  try {
    await connection.ping();
    return true;
  } finally {
    connection.release();
  }
}

export default pool;
