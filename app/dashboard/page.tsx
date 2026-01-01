"use client";

import Link from "next/link";
import { useAuth } from "../../frontend/context/AuthContext";
import { useState, useEffect } from "react";
import StatCard from "@/frontend/components/dashboard/StatCard";
import QuickActionCard from "@/frontend/components/dashboard/QuickActionCard";
import TopicProgress from "@/frontend/components/dashboard/TopicProgress";
interface UserQuizResult {
    id: number;
    user_id: number;
    quiz_type: string;
    difficulty: string;
    total_questions: number;
    correct_answers: number;
    score_percentage: number;
    passed: boolean;
    taken_at: string;
}

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
    const [stats, setStats] = useState<QuizStats>({
        totalQuizzesTaken: 0,
        averageScore: 0,
        bestScore: 0,
        topicStats: {
            html: { taken: 0, avgScore: 0 },
            css: { taken: 0, avgScore: 0 },
            javascript: { taken: 0, avgScore: 0 }
        }
    });
    const [results, setResults] = useState<UserQuizResult[]>([]);

    useEffect(() => {
        if (!user) return;
        fetch(`/api/user-results?user_id=${user.id}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setResults(data.results);
                    // Calculate unique quizzes taken (by quiz_type + difficulty)
                    const uniqueQuizSet = new Set(
                        data.results.map((r: UserQuizResult) => `${r.quiz_type}:${r.difficulty}`)
                    );
                    const totalUnique = uniqueQuizSet.size;
                    const avg = data.results.length > 0 ? Math.round(data.results.reduce((sum: number, r: UserQuizResult) => sum + r.score_percentage, 0) / data.results.length) : 0;
                    const best = data.results.length > 0 ? Math.max(...data.results.map((r: UserQuizResult) => r.score_percentage)) : 0;
                    // Arrays for each topic
                    const html = data.results.filter((r: UserQuizResult) => r.quiz_type === 'html');
                    const css = data.results.filter((r: UserQuizResult) => r.quiz_type === 'css');
                    const js = data.results.filter((r: UserQuizResult) => r.quiz_type === 'javascript');
                    // Unique quizzes per topic (by quiz_type + difficulty)
                    const htmlUnique = new Set(html.map((r: UserQuizResult) => `${r.quiz_type}:${r.difficulty}`)).size;
                    const cssUnique = new Set(css.map((r: UserQuizResult) => `${r.quiz_type}:${r.difficulty}`)).size;
                    const jsUnique = new Set(js.map((r: UserQuizResult) => `${r.quiz_type}:${r.difficulty}`)).size;
                    setStats({
                        totalQuizzesTaken: totalUnique,
                        averageScore: avg,
                        bestScore: best,
                        topicStats: {
                            html: { taken: htmlUnique, avgScore: html.length > 0 ? Math.round(html.reduce((sum: number, r: UserQuizResult) => sum + r.score_percentage, 0) / html.length) : 0 },
                            css: { taken: cssUnique, avgScore: css.length > 0 ? Math.round(css.reduce((sum: number, r: UserQuizResult) => sum + r.score_percentage, 0) / css.length) : 0 },
                            javascript: { taken: jsUnique, avgScore: js.length > 0 ? Math.round(js.reduce((sum: number, r: UserQuizResult) => sum + r.score_percentage, 0) / js.length) : 0 }
                        }
                    });
                }
            });
    }, [user]);

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
                        <StatCard title="Total Quizzes Taken" value={stats.totalQuizzesTaken} icon={<span>📝</span>} href="/dashboard/unique-quizzes" />
                        <StatCard title="Average Score" value={`${stats.averageScore}%`} icon={<span>📊</span>} />
                        <StatCard title="Best Score" value={`${stats.bestScore}%`} icon={<span>🏆</span>} />
                    </div>

                    {/* Quick Actions */}
                    <div className="mb-8">
                        <h2 className="font-bold text-xl mb-4">Quick Actions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <QuickActionCard href="/quiz/html_quizzes" bgClass="bg-orange-100 border border-orange-200" emoji={<span>🟠</span>} title="HTML Quizzes" desc="Test your HTML knowledge" />
                            <QuickActionCard href="/quiz/css_quizzes" bgClass="bg-blue-100 border border-blue-200" emoji={<span>🔵</span>} title="CSS Quizzes" desc="Test your CSS knowledge" />
                            <QuickActionCard href="/quiz/js_quizzes" bgClass="bg-yellow-100 border border-yellow-200" emoji={<span>🟡</span>} title="JavaScript Quizzes" desc="Test your JS knowledge" />
                        </div>
                    </div>

                    {/* Topic Progress */}
                    <div className="mb-8">
                        <h2 className="font-bold text-xl mb-4">Your Progress by Topic</h2>
                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
                            <TopicProgress name="HTML" taken={stats.topicStats.html.taken} avgScore={stats.topicStats.html.avgScore} colorClass="orange" />
                            <TopicProgress name="CSS" taken={stats.topicStats.css.taken} avgScore={stats.topicStats.css.avgScore} colorClass="blue" />
                            <TopicProgress name="JavaScript" taken={stats.topicStats.javascript.taken} avgScore={stats.topicStats.javascript.avgScore} colorClass="yellow" />
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

                    {/* Quiz History Table */}
                <div className="mb-8 mt-4">
                    <h2 className="font-bold text-xl mb-4">Quiz History</h2>
                    <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Date</th>
                                <th className="py-2 px-4 border-b">Type</th>
                                <th className="py-2 px-4 border-b">Difficulty</th>
                                <th className="py-2 px-4 border-b">Score</th>
                                <th className="py-2 px-4 border-b">Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.length === 0 ? (
                                <tr><td colSpan={5} className="text-center py-4 text-gray-500">No quiz attempts yet.</td></tr>
                            ) : (
                                results
                                    .slice(0, 5)
                                    .map(r => (
                                        <tr key={r.id}>
                                            <td className="py-2 px-4 border-b">{new Date(r.taken_at).toLocaleString()}</td>
                                            <td className="py-2 px-4 border-b capitalize">{r.quiz_type}</td>
                                            <td className="py-2 px-4 border-b capitalize">{r.difficulty}</td>
                                            <td className="py-2 px-4 border-b">{r.score_percentage}%</td>
                                            <td className="py-2 px-4 border-b">{r.passed ? 'Passed' : 'Failed'}</td>
                                        </tr>
                                    ))
                            )}
                        </tbody>
                    </table>
                    </div>
                    {results.length > 5 && (
                        <div className="mt-2 text-center">
                            <Link href="/dashboard/results" className="text-(--secondary-color) hover:underline font-semibold">
                                View All Results
                            </Link>
                        </div>
                    )}
                </div>
                </div>
            </div>
    );
}
