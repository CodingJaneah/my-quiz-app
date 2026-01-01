import { executeUpdate } from '../../../../../../backend/utils/db.util';
import { deleteQuestionById } from '../../../../../../backend/services/question.service';
/**
 * DELETE handler for removing a question by its ID.
 * Expects questionId in the request body.
 * @param request - NextRequest object
 * @returns NextResponse with success or error message
 */
export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json();
        const { questionId } = body;
        if (!questionId) {
            return NextResponse.json({ success: false, message: 'questionId is required' }, { status: 400 });
        }
        const deleted = await deleteQuestionById(Number(questionId));
        if (deleted) {
            return NextResponse.json({ success: true, message: 'Question deleted successfully' });
        } else {
            return NextResponse.json({ success: false, message: 'Question not found or could not be deleted' }, { status: 404 });
        }
    } catch (error) {
        console.error('[DELETE /api/admin/quizzes/[quizId]/questions] Error:', error);
        return NextResponse.json({ success: false, message: 'Failed to delete question', error: error instanceof Error ? error.message : error }, { status: 500 });
    }
}

/**
 * POST handler for adding a new question to a quiz.
 * @param request - NextRequest object
 * @param context - Contains params (Promise) with quizId
 * @returns NextResponse with success or error message
 */
export async function POST(request: NextRequest, context: { params: Promise<{ quizId: string }> }) {
    const { quizId } = await context.params;
    try {
        const body = await request.json();
        // Log the received body and quizId for debugging
        console.log('[POST /api/admin/quizzes/[quizId]/questions] Received:', { quizId, body });
        const { question, option_a, option_b, option_c, option_d, correct_answer, difficulty } = body;
        // Validate all fields strictly
        if (
            !quizId ||
            !question ||
            !option_a ||
            !option_b ||
            !option_c ||
            !option_d ||
            !correct_answer ||
            !difficulty
        ) {
            console.warn('[POST /api/admin/quizzes/[quizId]/questions] Missing required field(s)', { quizId, question, option_a, option_b, option_c, option_d, correct_answer, difficulty });
            return NextResponse.json({ success: false, message: 'All fields are required' }, { status: 400 });
        }
        // Insert the new question into the questions table
        const insertQuery = `
            INSERT INTO questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_answer, difficulty)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        await executeUpdate(insertQuery, [quizId, question, option_a, option_b, option_c, option_d, correct_answer, difficulty]);
        console.log('[POST /api/admin/quizzes/[quizId]/questions] Inserted successfully');
        return NextResponse.json({ success: true, message: 'Question added successfully' });
    } catch (error) {
        // Log the error with stack trace for debugging
        console.error('[POST /api/admin/quizzes/[quizId]/questions] Error adding question:', error);
        return NextResponse.json({ success: false, message: 'Failed to add question', error: error instanceof Error ? error.message : error }, { status: 500 });
    }
}

import { NextResponse, NextRequest } from 'next/server';
import { getQuestionsByQuizIdAndDifficulty } from '../../../../_db/quiz.service';

// API handler to get questions by quizId and difficulty
/**
 * GET handler for fetching questions by quizId and difficulty.
 * @param request - NextRequest object
 * @param context - Contains params (Promise) with quizId
 * @returns NextResponse with questions or error message
 */
export async function GET(request: NextRequest, context: { params: Promise<{ quizId: string }> }) {
    // Unwrap params promise as required by Next.js App Router
    const { quizId } = await context.params;
    const { searchParams } = new URL(request.url);
    const difficulty = searchParams.get('difficulty');
    try {
        if (!difficulty) {
            return NextResponse.json({ success: false, message: 'Difficulty is required' }, { status: 400 });
        }
        // Debug log
        console.log('[API] Fetching questions for quizId:', quizId, 'difficulty:', difficulty);
        const questions = await getQuestionsByQuizIdAndDifficulty(quizId, difficulty);
        console.log('[API] Questions fetched:', questions.length);
        return NextResponse.json({ success: true, questions });
    } catch (error) {
        console.error('Error fetching questions:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch questions' }, { status: 500 });
    }
}
