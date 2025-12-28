import { NextRequest, NextResponse } from 'next/server';
import { getUserQuizResults } from '@/backend/services/quiz.service';

// GET /api/user-results?user_id=123
export async function GET(request: NextRequest) {
    const userId = request.nextUrl.searchParams.get('user_id');
    if (!userId) {
        return NextResponse.json({ error: 'Missing user_id' }, { status: 400 });
    }
    try {
        const results = await getUserQuizResults(Number(userId));
        return NextResponse.json({ success: true, results });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch user results' }, { status: 500 });
    }
}
