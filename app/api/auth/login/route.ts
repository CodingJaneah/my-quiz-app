import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail } from '@/backend/services/user.service';
import bcrypt from 'bcrypt';

/**
 * Request body interface for login
 */
interface LoginRequestBody {
    email: string;
    password: string;
}

/**
 * POST handler for user login
 * @param request - Contains email and password in the body
 * @returns JSON response with success status and user data or error message
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const body: LoginRequestBody = await request.json();
        const { email, password } = body;

        // Validate required fields
        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Find user by email
        const user = await findUserByEmail(email);

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Compare password with hashed password in database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { success: false, message: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Login successful - return user data (excluding password)
        const { password: _, ...userWithoutPassword } = user;

        // Set user_id cookie for session
        const response = NextResponse.json({
            success: true,
            message: 'Login successful',
            user: userWithoutPassword
        });
        response.headers.append('Set-Cookie', `user_id=${user.id}; Path=/; HttpOnly; SameSite=Lax`);
        return response;

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { success: false, message: 'An error occurred during login' },
            { status: 500 }
        );
    }
}
