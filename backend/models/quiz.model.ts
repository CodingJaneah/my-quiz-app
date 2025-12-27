import { RowDataPacket } from 'mysql2/promise';

/**
 * Interface representing a quiz question from the database
 * Maps to JOIN of questions and quizzes tables
 */
export interface QuizQuestion extends RowDataPacket {
    question_id: number;      // questions.id
    quiz_id: number;          // questions.quiz_id
    quiz_type: string;        // quizzes.quiz_type ('html', 'css', 'javascript')
    difficulty: string;       // quizzes.difficulty ('easy', 'medium', 'hard')
    question_text: string;    // questions.question
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    correct_answer: string;   // 'A', 'B', 'C', or 'D'
}

/**
 * Interface for quiz answer submission
 */
export interface QuizAnswerSubmission {
    question_id: number;
    selected_answer: string;
}

/**
 * Interface for quiz result
 */
export interface QuizResult {
    total_questions: number;
    correct_answers: number;
    score_percentage: number;
    passed: boolean;
}
