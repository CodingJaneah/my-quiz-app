"use client";

import { useState, useEffect } from "react";
import { getCookie } from "@/frontend/utils/cookie.util";

/**
 * Interface for dashboard statistics
 */
interface DashboardStats {
    totalUsers: number;
    totalQuizzes: number;
    totalQuestions: number;
    quizzesTaken: number;
}

/**
 * Admin Dashboard Page
 * Displays overview statistics and metrics
 */
export default function DashboardPage() {
    const [stats, setStats] = useState<DashboardStats>({
        totalUsers: 0,
        totalQuizzes: 0,
        totalQuestions: 0,
        quizzesTaken: 0,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [sessionChecked, setSessionChecked] = useState(false);
    const [sessionError, setSessionError] = useState<string | null>(null);

    /**
     * Fetches dashboard statistics on component mount
     */
    useEffect(() => {
        // Check for admin session cookie and validate
        if (typeof window !== 'undefined') {
            const adminSessionRaw = getCookie('admin_session');
            let adminSession = null;
            try {
                adminSession = adminSessionRaw ? JSON.parse(adminSessionRaw) : null;
            } catch (e) {
                setSessionError('Session cookie is invalid or corrupted.');
                setSessionChecked(true);
                console.error('Session cookie parse error:', e, adminSessionRaw);
                return;
            }
            if (!adminSession || !adminSession.id || adminSession.role !== 'admin') {
                setSessionError('Session is missing or you are not an admin.');
                setSessionChecked(true);
                console.warn('Session check failed:', adminSession);
                return;
            }
            setSessionChecked(true);
            fetchDashboardStats();
        }
    }, []);

    /**
     * Fetches dashboard statistics from the API
     */
    const fetchDashboardStats = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/admin/stats');
            
            if (!response.ok) {
                throw new Error('Failed to fetch dashboard stats');
            }
            
            const data = await response.json();
            setStats({
                totalUsers: data.totalUsers,
                totalQuizzes: data.totalQuizzes,
                totalQuestions: data.totalQuestions,
                quizzesTaken: data.quizzesTaken,
            });
        } catch (error) {
            console.error("Error fetching dashboard stats:", error);
            // Set default values on error
            setStats({
                totalUsers: 0,
                totalQuizzes: 0,
                totalQuestions: 0,
                quizzesTaken: 0,
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (!sessionChecked) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-(--secondary-color)"></div>
            </div>
        );
    }

    if (sessionError) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-center">
                <div className="text-red-600 font-bold text-lg mb-4">{sessionError}</div>
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                    onClick={() => window.location.replace('/admin/login')}
                >
                    Go to Login
                </button>
            </div>
        );
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
            {isLoading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-(--secondary-color)"></div>
                </div>
            ) : (
                <>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                            <span className="text-2xl font-semibold text-blue-600 mb-2">{stats.totalUsers}</span>
                            <span className="text-gray-700">Total Users</span>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                            <span className="text-2xl font-semibold text-green-600 mb-2">{stats.totalQuizzes}</span>
                            <span className="text-gray-700">Total Quizzes</span>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                            <span className="text-2xl font-semibold text-purple-600 mb-2">{stats.totalQuestions}</span>
                            <span className="text-gray-700">Total Questions</span>
                        </div>
                    </div>
                    {/* Recent Activity Section (placeholder) */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <span className="text-gray-500">Recent activity will appear here.</span>
                    </div>
                </>
            )}
        </div>
    );
}
