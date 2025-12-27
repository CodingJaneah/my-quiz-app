import { NextResponse } from 'next/server';
import { getUserCount } from '@/backend/services/user.service';
import { getQuizCount, getQuestionCount, getQuizzesTakenCount } from '@/backend/services/quiz.service';

/**
 * Interface for dashboard statistics response
 */
interface DashboardStatsResponse {
    totalUsers: number;
    totalQuizzes: number;
    totalQuestions: number;
    quizzesTaken: number;
}

/**
 * GET /api/admin/stats
 * Fetches dashboard statistics for the admin panel
 * @returns Dashboard statistics including user count, quiz count, question count, and quizzes taken
 */
export async function GET(): Promise<NextResponse<DashboardStatsResponse | { error: string }>> {
    try {
        // Fetch all stats in parallel for better performance
        const [totalUsers, totalQuizzes, totalQuestions, quizzesTaken] = await Promise.all([
            getUserCount(),
            getQuizCount(),
            getQuestionCount(),
            getQuizzesTakenCount()
        ]);

        const stats: DashboardStatsResponse = {
            totalUsers,
            totalQuizzes,
            totalQuestions,
            quizzesTaken
        };

        return NextResponse.json(stats);
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        return NextResponse.json(
            { error: 'Failed to fetch dashboard statistics' },
            { status: 500 }
        );
    }
}
