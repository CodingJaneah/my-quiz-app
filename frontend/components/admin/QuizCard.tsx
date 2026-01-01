import React from "react";
import { useRouter } from "next/navigation";

interface QuizCardProps {
  quiz: {
    id: number;
    quiz_type: string;
    difficulty: string;
  };
  totalQuestions: number;
  onViewQuestions?: (quiz: any) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, totalQuestions }) => {
  const router = useRouter();
  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start mb-4">
        <h3 className="text-xl font-bold uppercase">{quiz.quiz_type}</h3>
      </div>
      <p className="text-gray-500 mb-4">
        {totalQuestions} questions
      </p>
      <button
        onClick={() => router.push(`/admin/quizzes/${quiz.id}`)}
        className="w-full bg-(--secondary-color) hover:bg-(--hover-background) text-white py-2 px-4 rounded-lg"
      >
        Manage Questions
      </button>
    </div>
  );
};

export default QuizCard;
