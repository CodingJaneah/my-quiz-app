import { NextRequest, NextResponse } from 'next/server';
import { getAllUsers, deleteUser } from '@/backend/services/user.service';

/**
 * GET /api/admin/users
 * Fetches all users from the database
 */
export async function GET() {
    try {
        const users = await getAllUsers();

        return NextResponse.json({
            success: true,
            users: users
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/admin/users
 * Deletes a user by ID
 * Query params: id (user ID to delete)
 */
export async function DELETE(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const userId = searchParams.get('id');

        if (!userId) {
            return NextResponse.json(
                { success: false, error: 'User ID is required' },
                { status: 400 }
            );
        }

        const deleted = await deleteUser(parseInt(userId));

        if (!deleted) {
            return NextResponse.json(
                { success: false, error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete user' },
            { status: 500 }
        );
    }
}
