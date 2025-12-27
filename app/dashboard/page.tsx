"use client";

import Link from "next/link";
import { useAuth } from "../../frontend/context/AuthContext";
import { useState } from "react";

/**
 * Interface for quiz statistics
 */
interface QuizStats {
    totalQuizzesTaken: number;
    averageScore: number;
    bestScore: number;
    topicStats: {
        html: { taken: number; avgScore: number };
        css: { taken: number; avgScore: number };
        javascript: { taken: number; avgScore: number };
    };
}

/**
 * User Dashboard Page
 * Displays user's quiz statistics and quick access to quizzes
 */
export default function UserDashboard() {
    const { user } = useAuth();
    const [stats] = useState<QuizStats>({
        totalQuizzesTaken: 0,
        averageScore: 0,
        bestScore: 0,
        topicStats: {
            html: { taken: 0, avgScore: 0 },
            css: { taken: 0, avgScore: 0 },
            javascript: { taken: 0, avgScore: 0 }
        }
    });

    return (
        <div className="px-10 pt-[130px] pb-[100px]">
            <div className="max-w-5xl">
                    {/* Welcome Section */}
                    <div className="mb-8">
                        <h1 className="font-bold text-3xl mb-2">
                            Welcome back, <span className="text-(--secondary-color)">{user?.username}</span>! 👋
                        </h1>
                        <p className="text-gray-600">Track your progress and continue learning web development.</p>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm">Total Quizzes Taken</p>
                                    <p className="text-3xl font-bold text-(--secondary-color)">{stats.totalQuizzesTaken}</p>
                                </div>
                                <div className="text-4xl">📝</div>
                            </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm">Average Score</p>
                                    <p className="text-3xl font-bold text-green-500">{stats.averageScore}%</p>
                                </div>
                                <div className="text-4xl">📊</div>
                            </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm">Best Score</p>
                                    <p className="text-3xl font-bold text-yellow-500">{stats.bestScore}%</p>
                                </div>
                                <div className="text-4xl">🏆</div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mb-8">
                        <h2 className="font-bold text-xl mb-4">Quick Actions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Link href="/quiz/html_quizzes" className="block">
                                <div className="bg-orange-100 border border-orange-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                                    <div className="text-3xl mb-2">🟠</div>
                                    <h3 className="font-semibold text-lg">HTML Quizzes</h3>
                                    <p className="text-gray-600 text-sm">Test your HTML knowledge</p>
                                </div>
                            </Link>
                            <Link href="/quiz/css_quizzes" className="block">
                                <div className="bg-blue-100 border border-blue-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                                    <div className="text-3xl mb-2">🔵</div>
                                    <h3 className="font-semibold text-lg">CSS Quizzes</h3>
                                    <p className="text-gray-600 text-sm">Test your CSS knowledge</p>
                                </div>
                            </Link>
                            <Link href="/quiz/js_quizzes" className="block">
                                <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                                    <div className="text-3xl mb-2">🟡</div>
                                    <h3 className="font-semibold text-lg">JavaScript Quizzes</h3>
                                    <p className="text-gray-600 text-sm">Test your JS knowledge</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Topic Progress */}
                    <div className="mb-8">
                        <h2 className="font-bold text-xl mb-4">Your Progress by Topic</h2>
                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
                            {/* HTML Progress */}
                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold text-orange-500">HTML</span>
                                    <span className="text-sm text-gray-500">{stats.topicStats.html.taken} quizzes taken</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div 
                                        className="bg-orange-500 h-3 rounded-full transition-all duration-300"
                                        style={{ width: `${stats.topicStats.html.avgScore}%` }}
                                    ></div>
                                </div>
                                <p className="text-right text-sm text-gray-500 mt-1">Avg: {stats.topicStats.html.avgScore}%</p>
                            </div>

                            {/* CSS Progress */}
                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold text-blue-500">CSS</span>
                                    <span className="text-sm text-gray-500">{stats.topicStats.css.taken} quizzes taken</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div 
                                        className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                                        style={{ width: `${stats.topicStats.css.avgScore}%` }}
                                    ></div>
                                </div>
                                <p className="text-right text-sm text-gray-500 mt-1">Avg: {stats.topicStats.css.avgScore}%</p>
                            </div>

                            {/* JavaScript Progress */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold text-yellow-500">JavaScript</span>
                                    <span className="text-sm text-gray-500">{stats.topicStats.javascript.taken} quizzes taken</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div 
                                        className="bg-yellow-500 h-3 rounded-full transition-all duration-300"
                                        style={{ width: `${stats.topicStats.javascript.avgScore}%` }}
                                    ></div>
                                </div>
                                <p className="text-right text-sm text-gray-500 mt-1">Avg: {stats.topicStats.javascript.avgScore}%</p>
                            </div>
                        </div>
                    </div>

                    {/* Learning Resources */}
                    <div>
                        <h2 className="font-bold text-xl mb-4">Continue Learning</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Link href="/topics/html_lessons" className="block">
                                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-(--secondary-color) transition-colors">
                                    <h3 className="font-semibold text-lg mb-2">📚 HTML Lessons</h3>
                                    <p className="text-gray-600 text-sm">Learn the fundamentals of HTML structure and elements.</p>
                                </div>
                            </Link>
                            <Link href="/topics/css_lessons" className="block">
                                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-(--secondary-color) transition-colors">
                                    <h3 className="font-semibold text-lg mb-2">🎨 CSS Lessons</h3>
                                    <p className="text-gray-600 text-sm">Master styling and layout with CSS properties.</p>
                                </div>
                            </Link>
                            <Link href="/topics/js_lessons" className="block">
                                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-(--secondary-color) transition-colors">
                                    <h3 className="font-semibold text-lg mb-2">⚡ JavaScript Lessons</h3>
                                    <p className="text-gray-600 text-sm">Build interactive features with JavaScript.</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
    );
}
