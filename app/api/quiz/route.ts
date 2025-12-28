import { NextRequest, NextResponse } from 'next/server';
import { getQuizQuestions, validateQuizAnswers, saveUserQuizResult } from '@/backend/services/quiz.service';
import { QuizAnswerSubmission } from '@/backend/models/quiz.model';
import { UserQuizResult } from '@/backend/models/user_quiz_result.model';

/**
 * GET /api/quiz
 * Fetches quiz questions by type and difficulty
 * Query params: type (html|css|javascript), difficulty (easy|medium|hard)
 */
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const quizType = searchParams.get('type');
        const difficulty = searchParams.get('difficulty');

        // Validate required parameters
        if (!quizType || !difficulty) {
            return NextResponse.json(
                { error: 'Missing required parameters: type and difficulty' },
                { status: 400 }
            );
        }

        // Validate quiz type
        const validTypes = ['html', 'css', 'javascript'];
        if (!validTypes.includes(quizType)) {
            return NextResponse.json(
                { error: 'Invalid quiz type. Must be: html, css, or javascript' },
                { status: 400 }
            );
        }

        // Validate difficulty
        const validDifficulties = ['easy', 'medium', 'hard'];
        if (!validDifficulties.includes(difficulty)) {
            return NextResponse.json(
                { error: 'Invalid difficulty. Must be: easy, medium, or hard' },
                { status: 400 }
            );
        }

        const questions = await getQuizQuestions(quizType, difficulty);

        // Remove correct_answer from response to prevent cheating
        const questionsWithoutAnswers = questions.map(({ correct_answer, ...rest }) => rest);

        return NextResponse.json({
            success: true,
            quiz_type: quizType,
            difficulty: difficulty,
            total_questions: questions.length,
            questions: questionsWithoutAnswers
        });

    } catch (error) {
        console.error('Error fetching quiz questions:', error);
        return NextResponse.json(
            { error: 'Failed to fetch quiz questions' },
            { status: 500 }
        );
    }
}

/**
 * POST /api/quiz
 * Submits quiz answers and returns the score
 * Body: { answers: [{ question_id: number, selected_answer: string }] }
 */
// POST /api/quiz
// Body: { answers: QuizAnswerSubmission[], user_id: number, quiz_type: string, difficulty: string }
export async function POST(request: NextRequest) {
    try {

        const body = await request.json();
        const { answers, user_id, quiz_type, difficulty } = body as { answers: QuizAnswerSubmission[], user_id: number, quiz_type: string, difficulty: string };

        // Validate request body
        if (!answers || !Array.isArray(answers) || answers.length === 0 || !user_id || !quiz_type || !difficulty) {
            return NextResponse.json(
                { error: 'Invalid request body. Expected: { answers, user_id, quiz_type, difficulty }' },
                { status: 400 }
            );
        }

        // Validate each answer submission
        for (const answer of answers) {
            if (!answer.question_id || !answer.selected_answer) {
                return NextResponse.json(
                    { error: 'Each answer must have question_id and selected_answer' },
                    { status: 400 }
                );
            }

            const validAnswers = ['A', 'B', 'C', 'D'];
            if (!validAnswers.includes(answer.selected_answer.toUpperCase())) {
                return NextResponse.json(
                    { error: 'Invalid answer. Must be: A, B, C, or D' },
                    { status: 400 }
                );
            }
        }


        const result = await validateQuizAnswers(answers);

        // Save the result to the database
        const userQuizResult: UserQuizResult = {
            user_id,
            quiz_type,
            difficulty,
            total_questions: result.total_questions,
            correct_answers: result.correct_answers,
            score_percentage: result.score_percentage,
            passed: result.passed
        };
        await saveUserQuizResult(userQuizResult);

        return NextResponse.json({
            success: true,
            result: result
        });

    } catch (error) {
        console.error('Error validating quiz answers:', error);
        return NextResponse.json(
            { error: 'Failed to validate quiz answers' },
            { status: 500 }
        );
    }
}
