/**
 * UserQuizResult model for tracking user quiz attempts
 */
import { RowDataPacket } from 'mysql2/promise';

export interface UserQuizResult extends RowDataPacket {
  id?: number;
  user_id: number;
  quiz_type: string;
  difficulty: string;
  total_questions: number;
  correct_answers: number;
  score_percentage: number;
  passed: boolean;
  taken_at?: Date;
}

// Interface for inserting quiz results (does not extend RowDataPacket)
export interface UserQuizResultInsert {
  user_id: number;
  quiz_type: string;
  difficulty: string;
  total_questions: number;
  correct_answers: number;
  score_percentage: number;
  passed: boolean;
}
