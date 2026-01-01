import { executeQuery } from './db.util';

export async function getAllQuizzes() {
  return await executeQuery<any[]>(
    `SELECT q.id, q.quiz_type, q.difficulty, COUNT(qq.id) as question_count
     FROM quizzes q
     LEFT JOIN questions qq ON qq.quiz_id = q.id
     GROUP BY q.id, q.quiz_type, q.difficulty`
  );
}

/**
 * Fetches questions by quizId and difficulty
 * @param quizId - The quiz ID
 * @param difficulty - The difficulty level
 * @returns Array of questions
 */
/**
 * Fetches questions by quizId and difficulty (difficulty is in quizzes table)
 * @param quizId - The quiz ID
 * @param difficulty - The difficulty level
 * @returns Array of questions
 */
/**
 * Fetches questions by quizId and difficulty (difficulty is in quizzes table)
 * @param quizId - The quiz ID
 * @param difficulty - The difficulty level
 * @returns Array of questions with quiz_type and difficulty
 */
export async function getQuestionsByQuizIdAndDifficulty(quizId: string, difficulty: string) {
  return await executeQuery<any[]>(
    `SELECT q.id, q.quiz_id, z.quiz_type, z.difficulty, q.question AS question, q.option_a, q.option_b, q.option_c, q.option_d, q.correct_answer
     FROM questions q
     JOIN quizzes z ON q.quiz_id = z.id
     WHERE q.quiz_id = ? AND z.difficulty = ?`,
    [quizId, difficulty]
  );
}
