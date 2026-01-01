import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/backend/utils/db.util';

/**
 * GET /api/user-answers?user_id=1&quiz_type=css&difficulty=easy
 * Returns the latest answers for a user for a quiz type and difficulty
 */
export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('user_id');
  const quizType = request.nextUrl.searchParams.get('quiz_type');
  const difficulty = request.nextUrl.searchParams.get('difficulty');

  if (!userId || !quizType || !difficulty) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  try {
    // Get the latest attempt_at for this user/quiz/difficulty
    const [latest] = await executeQuery<any[]>(
      `SELECT MAX(attempt_at) as latest FROM user_quiz_answers WHERE user_id = ? AND quiz_type = ? AND difficulty = ?`,
      [userId, quizType, difficulty]
    );
    if (!latest?.latest) {
      return NextResponse.json({ answers: [] });
    }
    // Get all answers for that attempt
    const answers = await executeQuery<any[]>(
      `SELECT question_id, selected_answer FROM user_quiz_answers WHERE user_id = ? AND quiz_type = ? AND difficulty = ? AND attempt_at = ?`,
      [userId, quizType, difficulty, latest.latest]
    );
    return NextResponse.json({ answers });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch answers' }, { status: 500 });
  }
}
