// Model for user_quiz_answers table
import { RowDataPacket } from 'mysql2/promise';

export interface UserQuizAnswer extends RowDataPacket {
  id?: number;
  user_id: number;
  quiz_type: string;
  difficulty: string;
  question_id: number;
  selected_answer: string;
  attempt_at?: Date;
}

export interface UserQuizAnswerInsert {
  user_id: number;
  quiz_type: string;
  difficulty: string;
  question_id: number;
  selected_answer: string;
}
