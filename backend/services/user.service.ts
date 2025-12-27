import { executeQuery, executeUpdate } from '../utils/db.util';
import { User, CreateUserDto } from '../models/user.model';
import { RowDataPacket } from 'mysql2';

/**
 * Creates a new user in the database
 * @param userData - User data to insert (username, email, address, password)
 * @returns The ID of the newly created user
 */
export async function createUser(userData: CreateUserDto): Promise<number> {
    const query = `
        INSERT INTO users (username, email, password)
        VALUES (?, ?, ?)
    `;
    const result = await executeUpdate(query, [
        userData.username,
        userData.email,
        userData.password
    ]);
    return result.insertId;
}

/**
 * Finds a user by email address
 * @param email - User's email address
 * @returns User object or null if not found
 */
export async function findUserByEmail(email: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE email = ?';
    const rows = await executeQuery<(User & RowDataPacket)[]>(query, [email]);
    return rows.length > 0 ? rows[0] : null;
}

/**
 * Finds a user by username
 * @param username - User's username
 * @returns User object or null if not found
 */
export async function findUserByUsername(username: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE username = ?';
    const rows = await executeQuery<(User & RowDataPacket)[]>(query, [username]);
    return rows.length > 0 ? rows[0] : null;
}

/**
 * Finds a user by ID
 * @param id - User's ID
 * @returns User object or null if not found
 */
export async function findUserById(id: number): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE id = ?';
    const rows = await executeQuery<(User & RowDataPacket)[]>(query, [id]);
    return rows.length > 0 ? rows[0] : null;
}

/**
 * Checks if a username already exists
 * @param username - Username to check
 * @returns True if username exists, false otherwise
 */
export async function usernameExists(username: string): Promise<boolean> {
    const user = await findUserByUsername(username);
    return user !== null;
}

/**
 * Checks if an email already exists
 * @param email - Email to check
 * @returns True if email exists, false otherwise
 */
export async function emailExists(email: string): Promise<boolean> {
    const user = await findUserByEmail(email);
    return user !== null;
}

/**
 * Gets all users from the database
 * @returns Array of all users (without passwords)
 */
export async function getAllUsers(): Promise<Omit<User, 'password'>[]> {
    const query = 'SELECT id, username, email, created_at, updated_at FROM users ORDER BY created_at DESC';
    const rows = await executeQuery<(Omit<User, 'password'> & RowDataPacket)[]>(query, []);
    return rows;
}

/**
 * Deletes a user by ID
 * @param id - User's ID to delete
 * @returns True if user was deleted, false otherwise
 */
export async function deleteUser(id: number): Promise<boolean> {
    const query = 'DELETE FROM users WHERE id = ?';
    const result = await executeUpdate(query, [id]);
    return result.affectedRows > 0;
}

/**
 * Gets total count of users
 * @returns Total number of users
 */
export async function getUserCount(): Promise<number> {
    const query = 'SELECT COUNT(*) as count FROM users';
    interface CountResult extends RowDataPacket {
        count: number;
    }
    const rows = await executeQuery<CountResult[]>(query, []);
    return rows[0]?.count || 0;
}
