"use client";

import QuizCard from "@/frontend/components/admin/QuizCard";
import React from "react";

interface Quiz {
    id: number;
    quiz_type: string;
    difficulty: string;
    question_count: number;
}

interface Props {
    quizzes: Quiz[];
    onViewQuestions: (quiz: Quiz) => void;
}

export default function QuizzesGrid({ quizzes, onViewQuestions }: Props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['html', 'css', 'javascript'].map((type) => {
                const quiz = quizzes.find(q => q.quiz_type.toLowerCase() === type);
                const totalQuestions = quizzes
                    .filter(q => q.quiz_type.toLowerCase() === type)
                    .reduce((sum, q) => sum + (typeof q.question_count === 'number' ? q.question_count : 0), 0);
                return quiz ? (
                    <QuizCard
                        key={quiz.id}
                        quiz={quiz}
                        totalQuestions={totalQuestions}
                        onViewQuestions={onViewQuestions}
                    />
                ) : null;
            })}
        </div>
    );
}
