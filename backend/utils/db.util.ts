import mysql, { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';

/**
 * Validate required environment variables
 */
const requiredEnvVars = ['DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASSWORD', 'DB_DATABASE'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

// Log all DB_ prefixed env vars for debugging
console.log('All DB env vars:', {
  DB_HOST: process.env.DB_HOST ? 'SET' : 'NOT SET',
  DB_PORT: process.env.DB_PORT ? 'SET' : 'NOT SET',
  DB_USER: process.env.DB_USER ? 'SET' : 'NOT SET',
  DB_PASSWORD: process.env.DB_PASSWORD ? 'SET' : 'NOT SET',
  DB_DATABASE: process.env.DB_DATABASE ? 'SET' : 'NOT SET',
});

// Log connection info for debugging (without password)
console.log('DB Connection Config:', {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
});

/**
 * MySQL connection pool instance
 * Configured using Aiven credentials for secure cloud database connection
 */
const pool: Pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false,
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
