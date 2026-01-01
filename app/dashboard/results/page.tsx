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
 * User Results Page
 * Displays all quiz results for the logged-in user
 */
export default function UserResultsPage() {
    const { user } = useAuth();
    const [results, setResults] = useState<UserQuizResult[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        setLoading(true);
        fetch(`/api/user-results?user_id=${user.id}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setResults(data.results);
                }
            })
            .finally(() => setLoading(false));
    }, [user]);

    if (!user) {
        return (
            <div className="px-10 pt-[130px] pb-[100px]">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="font-bold text-2xl mb-4">Please log in to view your results.</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="px-10 pt-[130px] pb-[100px]">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="font-bold text-3xl">All Quiz Results</h1>
                    <Link href="/dashboard" className="text-(--secondary-color) hover:underline font-semibold">Back to Dashboard</Link>
                </div>
                {loading ? (
                    <div className="text-center text-gray-500">Loading...</div>
                ) : results.length === 0 ? (
                    <div className="text-center text-gray-500">No quiz attempts yet.</div>
                ) : (
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
                                {results.map(r => (
                                    <tr key={r.id}>
                                        <td className="py-2 px-4 border-b">{new Date(r.taken_at).toLocaleString()}</td>
                                        <td className="py-2 px-4 border-b capitalize">{r.quiz_type}</td>
                                        <td className="py-2 px-4 border-b capitalize">{r.difficulty}</td>
                                        <td className="py-2 px-4 border-b">{r.score_percentage}%</td>
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
