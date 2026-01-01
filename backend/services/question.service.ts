import { executeUpdate } from '../utils/db.util';

/**
 * Deletes a question by its ID from the database.
 * @param questionId - The ID of the question to delete
 * @returns Promise<boolean> - True if deleted, false otherwise
 */
export async function deleteQuestionById(questionId: number): Promise<boolean> {
    try {
        // Use id to delete a single question (matches your table schema)
        const deleteQuery = 'DELETE FROM questions WHERE id = ?';
        const result = await executeUpdate(deleteQuery, [questionId]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('[deleteQuestionById] Error deleting question:', error);
        return false;
    }
}
