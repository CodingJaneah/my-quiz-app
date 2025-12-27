import { NextRequest, NextResponse } from 'next/server';
import { createUser, emailExists, usernameExists } from '@/backend/services/user.service';
import bcrypt from 'bcrypt';

/**
 * Request body interface for registration
 */
interface RegisterRequestBody {
    username: string;
    email: string;
    address: string;
    password: string;
    confirmPassword: string;
}

/**
 * POST handler for user registration
 * @param request - Contains username, email, address, password, confirmPassword in the body
 * @returns JSON response with success status and user ID or error message
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const body: RegisterRequestBody = await request.json();
        const { username, email, password, confirmPassword } = body;

        // Validate required fields
        if (!username || !email || !password || !confirmPassword) {
            return NextResponse.json(
                { success: false, message: 'All fields are required' },
                { status: 400 }
            );
        }

        // Validate password match
        if (password !== confirmPassword) {
            return NextResponse.json(
                { success: false, message: 'Passwords do not match' },
                { status: 400 }
            );
        }

        // Validate password length
        if (password.length < 6) {
            return NextResponse.json(
                { success: false, message: 'Password must be at least 6 characters' },
                { status: 400 }
            );
        }

        // Check if username already exists
        const usernameIsTaken = await usernameExists(username);
        if (usernameIsTaken) {
            return NextResponse.json(
                { success: false, message: 'Username is already taken' },
                { status: 409 }
            );
        }

        // Check if email already exists
        const emailIsTaken = await emailExists(email);
        if (emailIsTaken) {
            return NextResponse.json(
                { success: false, message: 'Email is already registered' },
                { status: 409 }
            );
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create the user
        const userId = await createUser({
            username,
            email,
            password: hashedPassword
        });

        return NextResponse.json({
            success: true,
            message: 'Registration successful',
            userId: userId
        }, { status: 201 });

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { success: false, message: 'An error occurred during registration' },
            { status: 500 }
        );
    }
}
