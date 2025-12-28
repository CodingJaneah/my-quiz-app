import { NextRequest, NextResponse } from 'next/server';
import { findUserById } from '@/backend/services/user.service';
import { parse } from 'cookie';

/**
 * GET /api/user-info/me
 * Returns the current authenticated user based on a session cookie or token.
 * For demo: expects ?user_id= in query (replace with real session logic in production)
 */
export async function GET(req: NextRequest) {
    // Try to get user_id from cookie
    const cookieHeader = req.headers.get('cookie');
    let userId = null;
    if (cookieHeader) {
        const cookies = parse(cookieHeader);
        userId = cookies.user_id;
    }
    if (!userId) {
        return NextResponse.json({ user: null }, { status: 200 });
    }
    const user = await findUserById(Number(userId));
    if (!user) {
        return NextResponse.json({ user: null }, { status: 200 });
    }
    // Remove password before sending
    const { password, ...userSafe } = user;
    return NextResponse.json({ user: userSafe }, { status: 200 });
}
