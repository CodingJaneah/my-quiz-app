import { executeQuery } from '../utils/db.util';
import { UserQuizAnswerInsert } from '../models/user_quiz_answer.model';

/**
 * Saves a user's answer for a quiz question
 * @param answer - UserQuizAnswerInsert object
 * @returns The ID of the inserted answer
 */
export async function saveUserQuizAnswer(answer: UserQuizAnswerInsert): Promise<number> {
  const query = `
    INSERT INTO user_quiz_answers
    (user_id, quiz_type, difficulty, question_id, selected_answer, attempt_at)
    VALUES (?, ?, ?, ?, ?, NOW())
  `;
  const params = [
    answer.user_id,
    answer.quiz_type,
    answer.difficulty,
    answer.question_id,
    answer.selected_answer
  ];
  const res = await executeQuery<any>(query, params);
  return res.insertId;
}

/**
 * Bulk insert user answers for a quiz attempt
 * @param answers - Array of UserQuizAnswerInsert
 */
export async function saveUserQuizAnswersBulk(answers: UserQuizAnswerInsert[]): Promise<void> {
  if (!answers.length) return;
  const values = answers.map(a => `(${a.user_id},'${a.quiz_type}','${a.difficulty}',${a.question_id},'${a.selected_answer}',NOW())`).join(',');
  const query = `
    INSERT INTO user_quiz_answers
    (user_id, quiz_type, difficulty, question_id, selected_answer, attempt_at)
    VALUES ${values}
  `;
  await executeQuery<any>(query);
}
