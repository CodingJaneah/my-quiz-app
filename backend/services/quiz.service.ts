/**
 * Fetches all quiz results for a user
 * @param userId - The user's ID
 * @returns Array of UserQuizResult
 */
export async function getUserQuizResults(userId: number): Promise<UserQuizResult[]> {
    const query = `
        SELECT * FROM user_quiz_results WHERE user_id = ? ORDER BY taken_at DESC
    `;
    return await executeQuery<UserQuizResult[]>(query, [userId]);
}
import { executeQuery, executeUpdate } from '../utils/db.util';
import { QuizQuestion, QuizResult, QuizAnswerSubmission } from '../models/quiz.model';

import { UserQuizResult, UserQuizResultInsert } from '../models/user_quiz_result.model';
/**
 * Saves a user's quiz result to the database
 * @param result - UserQuizResult object
 * @returns The ID of the inserted result
 */
/**
 * Saves a user's quiz result to the database
 * @param result - UserQuizResultInsert object (for insert only)
 * @returns The ID of the inserted result
 */
export async function saveUserQuizResult(result: UserQuizResultInsert): Promise<number> {
    const query = `
        INSERT INTO user_quiz_results
        (user_id, quiz_type, difficulty, total_questions, correct_answers, score_percentage, passed, taken_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
    `;
    const params = [
        result.user_id,
        result.quiz_type,
        result.difficulty,
        result.total_questions,
        result.correct_answers,
        result.score_percentage,
        result.passed ? 1 : 0
    ];
    const res = await executeUpdate(query, params);
    return res.insertId;
}

/**
 * Fetches quiz questions by type and difficulty
 * @param quizType - The type of quiz ('html', 'css', 'javascript')
 * @param difficulty - The difficulty level ('easy', 'medium', 'hard')
 * @returns Array of quiz questions
 */
export async function getQuizQuestions(
    quizType: string,
    difficulty: string,
    count?: number
): Promise<QuizQuestion[]> {
    // Build base query
    let query = `
        SELECT 
            q.id AS question_id,
            q.quiz_id,
            qz.quiz_type,
            qz.difficulty,
            q.question AS question_text,
            q.option_a,
            q.option_b,
            q.option_c,
            q.option_d,
            q.correct_answer
        FROM questions q
        JOIN quizzes qz ON q.quiz_id = qz.id
        WHERE qz.quiz_type = ? AND qz.difficulty = ?
        ORDER BY RAND()`;

    const params: any[] = [quizType, difficulty];

    // If a count is provided, limit the results; otherwise return all available questions
    if (typeof count === 'number' && Number.isFinite(count) && count > 0) {
        query += `\n        LIMIT ?`;
        params.push(count);
    }

    const questions = await executeQuery<QuizQuestion[]>(query, params);
    return questions;
}

/**
 * Fetches a single quiz question by ID
 * @param questionId - The ID of the question
 * @returns The quiz question or null if not found
 */
export async function getQuizQuestionById(
    questionId: number
): Promise<QuizQuestion | null> {
    const query = `
        SELECT 
            q.id AS question_id,
            q.quiz_id,
            qz.quiz_type,
            qz.difficulty,
            q.question AS question_text,
            q.option_a,
            q.option_b,
            q.option_c,
            q.option_d,
            q.correct_answer
        FROM questions q
        JOIN quizzes qz ON q.quiz_id = qz.id
        WHERE q.id = ?
    `;
    
    const questions = await executeQuery<QuizQuestion[]>(query, [questionId]);
    return questions.length > 0 ? questions[0] : null;
}

/**
 * Validates quiz answers and calculates the score
 * @param submissions - Array of answer submissions
 * @returns Quiz result with score details
 */
export async function validateQuizAnswers(
    submissions: QuizAnswerSubmission[]
): Promise<QuizResult> {
    let correctCount = 0;
    
    for (const submission of submissions) {
        const question = await getQuizQuestionById(submission.question_id);
        if (question && question.correct_answer === submission.selected_answer) {
            correctCount++;
        }
    }
    
    const totalQuestions = submissions.length;
    const scorePercentage = totalQuestions > 0 
        ? Math.round((correctCount / totalQuestions) * 100) 
        : 0;
    
    return {
        total_questions: totalQuestions,
        correct_answers: correctCount,
        score_percentage: scorePercentage,
        passed: scorePercentage >= 70
    };
}

/**
 * Gets quiz statistics for a specific type and difficulty
 * @param quizType - The type of quiz
 * @param difficulty - The difficulty level
 * @returns Count of available questions
 */
export async function getQuizStats(
    quizType: string,
    difficulty: string
): Promise<number> {
    const query = `
        SELECT COUNT(*) as count
        FROM questions q
        JOIN quizzes qz ON q.quiz_id = qz.id
        WHERE qz.quiz_type = ? AND qz.difficulty = ?
    `;
    
    interface CountResult {
        count: number;
    }
    
    const result = await executeQuery<(CountResult & import('mysql2/promise').RowDataPacket)[]>(query, [quizType, difficulty]);
    return result[0]?.count || 0;
}

/**
 * Gets the total count of quizzes
 * @returns Total number of quizzes
 */
export async function getQuizCount(): Promise<number> {
    const query = 'SELECT COUNT(*) as count FROM quizzes';
    
    interface CountResult {
        count: number;
    }
    
    const result = await executeQuery<(CountResult & import('mysql2/promise').RowDataPacket)[]>(query, []);
    return result[0]?.count || 0;
}

/**
 * Gets the total count of questions
 * @returns Total number of questions
 */
export async function getQuestionCount(): Promise<number> {
    const query = 'SELECT COUNT(*) as count FROM questions';
    
    interface CountResult {
        count: number;
    }
    
    const result = await executeQuery<(CountResult & import('mysql2/promise').RowDataPacket)[]>(query, []);
    return result[0]?.count || 0;
}

/**
 * Gets the total count of quiz attempts (from quiz_answers table)
 * @returns Total number of quizzes taken/attempted
 */
export async function getQuizzesTakenCount(): Promise<number> {
    const query = 'SELECT COUNT(DISTINCT user_id, quiz_id) as count FROM quiz_answers';
    
    interface CountResult {
        count: number;
    }
    
    const result = await executeQuery<(CountResult & import('mysql2/promise').RowDataPacket)[]>(query, []);
    return result[0]?.count || 0;
}
