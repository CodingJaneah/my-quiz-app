import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail } from '@/backend/services/user.service';

/**
 * POST /api/admin/login
 * Authenticates admin user with email and password
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;
        console.log('Admin login attempt:', { email });

        // Validate required fields
        if (!email || !password) {
            console.log('Missing email or password');
            return NextResponse.json(
                { success: false, error: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Find user by email
        const user = await findUserByEmail(email);
        console.log('User found:', user);

        if (!user) {
            console.log('User not found');
            return NextResponse.json(
                { success: false, error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Check password (plain text comparison for now)
        // TODO: Use bcrypt.compare() if passwords are hashed
        if (user.password !== password) {
            console.log('Password mismatch');
            return NextResponse.json(
                { success: false, error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Return user data (without password) and always include role
        console.log('Admin login successful:', user.id);
        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: 'admin',
            }
        });

    } catch (error) {
        console.error('Admin login error:', error);
        return NextResponse.json(
            { success: false, error: 'An error occurred during login' },
            { status: 500 }
        );
    }
}
