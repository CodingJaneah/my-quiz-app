"use client";

import { useState, useEffect } from "react";

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

    /**
     * Fetches dashboard statistics on component mount
     */
    useEffect(() => {
        fetchDashboardStats();
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm">Total Users</p>
                                    <p className="text-3xl font-bold">{stats.totalUsers}</p>
                                </div>
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-blue-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm">Total Quizzes</p>
                                    <p className="text-3xl font-bold">{stats.totalQuizzes}</p>
                                </div>
                                <div className="bg-green-100 p-3 rounded-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-green-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm">Total Questions</p>
                                    <p className="text-3xl font-bold">{stats.totalQuestions}</p>
                                </div>
                                <div className="bg-yellow-100 p-3 rounded-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-yellow-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm">Quizzes Taken</p>
                                    <p className="text-3xl font-bold">{stats.quizzesTaken}</p>
                                </div>
                                <div className="bg-purple-100 p-3 rounded-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-purple-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity Section */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                <div className="bg-green-100 p-2 rounded-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-green-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium">New user registered</p>
                                    <p className="text-sm text-gray-500">2 minutes ago</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                <div className="bg-blue-100 p-2 rounded-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-blue-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium">Quiz completed: HTML Easy</p>
                                    <p className="text-sm text-gray-500">15 minutes ago</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                <div className="bg-yellow-100 p-2 rounded-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-yellow-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium">New question added to CSS Quiz</p>
                                    <p className="text-sm text-gray-500">1 hour ago</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
