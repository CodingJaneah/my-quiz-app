"use client";

import { useAuth } from "../../../frontend/context/AuthContext";
import { useEffect, useState } from "react";
import Link from "next/link";

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
 * Unique Quizzes Page
 * Displays all unique quizzes (by quiz_type + difficulty) taken by the user
 */
export default function UniqueQuizzesPage() {
    const { user } = useAuth();
    const [uniqueQuizzes, setUniqueQuizzes] = useState<UserQuizResult[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        setLoading(true);
        fetch(`/api/user-results?user_id=${user.id}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    // Map to unique (quiz_type, difficulty)
                    const map = new Map<string, UserQuizResult>();
                    data.results.forEach((r: UserQuizResult) => {
                        const key = `${r.quiz_type}:${r.difficulty}`;
                        // Only keep the latest attempt for each unique quiz
                        if (!map.has(key) || new Date(r.taken_at) > new Date(map.get(key)!.taken_at)) {
                            map.set(key, r);
                        }
                    });
                    setUniqueQuizzes(Array.from(map.values()));
                }
            })
            .finally(() => setLoading(false));
    }, [user]);

    if (!user) {
        return (
            <div className="px-10 pt-[130px] pb-[100px]">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="font-bold text-2xl mb-4">Please log in to view your quizzes.</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="px-10 pt-[130px] pb-[100px]">
            <div className="max-w-4xl">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="font-bold text-3xl">All Quizzes Taken</h1>
                    <Link href="/dashboard" className="text-(--secondary-color) hover:underline font-semibold">Back to Dashboard</Link>
                </div>
                {loading ? (
                    <div className="text-center text-gray-500">Loading...</div>
                ) : uniqueQuizzes.length === 0 ? (
                    <div className="text-center text-gray-500">No unique quizzes taken yet.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">Type</th>
                                    <th className="py-2 px-4 border-b">Difficulty</th>
                                    <th className="py-2 px-4 border-b">Last Score</th>
                                    <th className="py-2 px-4 border-b">Last Attempt</th>
                                    <th className="py-2 px-4 border-b">Result</th>
                                </tr>
                            </thead>
                            <tbody>
                                {uniqueQuizzes.map(r => (
                                    <tr key={`${r.quiz_type}:${r.difficulty}`}>
                                        <td className="py-2 px-4 border-b capitalize">{r.quiz_type}</td>
                                        <td className="py-2 px-4 border-b capitalize">{r.difficulty}</td>
                                        <td className="py-2 px-4 border-b">{r.score_percentage}%</td>
                                        <td className="py-2 px-4 border-b">{new Date(r.taken_at).toLocaleString()}</td>
                                        <td className="py-2 px-4 border-b">{r.passed ? 'Passed' : 'Failed'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
