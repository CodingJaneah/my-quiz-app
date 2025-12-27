/**
 * User model representing a registered user in the database
 */
export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
}

/**
 * Data transfer object for creating a new user
 * Note: confirm_password is validated on the frontend, not stored in DB
 */
export interface CreateUserDto {
    username: string;
    email: string;
    password: string;
}
