"use client";
import { useParams, useRouter } from "next/navigation";
import React from "react";

/**
 * QuizDetailPage
 * Shows three cards for Easy, Medium, and Hard for the selected quiz
 */
const difficulties = [
  { level: "easy", color: "bg-green-100 text-green-800" },
  { level: "medium", color: "bg-yellow-100 text-yellow-800" },
  { level: "hard", color: "bg-red-100 text-red-800" },
];

export default function QuizDetailPage() {
  const params = useParams();
  const router = useRouter();
  // Ensure quizId is always a string or number (handle string[] case from dynamic route)
  let quizId: string | number = "";
  if (Array.isArray(params?.quizId)) {
    quizId = params.quizId[0] ?? "";
  } else {
    quizId = params?.quizId ?? "";
  }

  // Detect quiz type (HTML or CSS) based on quizId or params (expand logic as needed)
  const quizIdNum = Number(quizId);
  const isHtml = quizIdNum === 12 || quizIdNum === 4 || quizIdNum === 5;
  const isCss = quizIdNum === 6 || quizIdNum === 7 || quizIdNum === 8;
  const isJs = quizIdNum === 9 || quizIdNum === 10 || quizIdNum === 11;

  /**
   * getQuizIdForDifficulty
   * Returns the correct quizId for the selected difficulty and quiz type (HTML or CSS).
   * @param difficulty - 'easy', 'medium', or 'hard'
   * @returns number | string - quizId for the selected difficulty
   */
  const getQuizIdForDifficulty = (difficulty: string): number | string => {
    // HTML quiz IDs: easy=12, medium=4, hard=5
    if (isHtml) {
      if (difficulty === 'easy') return 12;
      if (difficulty === 'medium') return 4;
      if (difficulty === 'hard') return 5;
    }
    // CSS quiz IDs: easy=6, medium=7, hard=8
    if (isCss) {
      if (difficulty === 'easy') return 6;
      if (difficulty === 'medium') return 7;
      if (difficulty === 'hard') return 8;
    }
    // JavaScript quiz IDs: easy=9, medium=10, hard=11
    if (isJs) {
      if (difficulty === 'easy') return 9;
      if (difficulty === 'medium') return 10;
      if (difficulty === 'hard') return 11;
    }
    // Default fallback
    return quizId;
  };

  return (
    <div className="p-8">
      <button
        className="mb-4 border border-gray-300 hover:bg-gray-100 py-2 px-4 rounded-lg"
        onClick={() => router.push('/admin/quizzes')}
      >
        ← Back to Quiz
      </button>
      <h1 className="text-3xl font-bold mb-8">Manage Questions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {difficulties.map((diff) => (
          <div
            key={diff.level}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col items-center"
          >
            <span className={`px-3 py-1 rounded-full text-xs font-semibold mb-4 ${diff.color}`}>
              {diff.level.charAt(0).toUpperCase() + diff.level.slice(1)}
            </span>
            <button
              className="w-full bg-(--secondary-color) hover:bg-(--hover-background) text-white py-2 px-4 rounded-lg mt-4"
              onClick={() => {
                // Use the correct quizId for each difficulty
                router.push(`/admin/quizzes/${getQuizIdForDifficulty(diff.level)}/${diff.level}`);
              }}
            >
              View Questions
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
