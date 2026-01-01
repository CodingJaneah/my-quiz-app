import { NextResponse } from 'next/server';
import { getAllQuizzes } from '../../_db/quiz.service';

/**
 * GET /api/admin/quizzes
 * Returns a list of quizzes for admin management from the database
 */
export async function GET() {
    try {
        const quizzes = await getAllQuizzes();
        return NextResponse.json({ success: true, quizzes });
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch quizzes' }, { status: 500 });
    }
}
