"use client";

import { useState, useEffect } from "react";

/**
 * Interface for quiz data
 */
interface Quiz {
    id: number;
    quiz_type: string;
    difficulty: string;
    question_count: number;
}

/**
 * Interface for question data
 */
interface Question {
    id: number;
    quiz_id: number;
    question: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    correct_answer: string;
}

/**
 * Admin Quiz Management Page
 * Manages quizzes and questions
 */
export default function QuizManagementPage() {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"quizzes" | "questions">("quizzes");
    const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
    const [newQuestion, setNewQuestion] = useState<Omit<Question, "id">>({
        quiz_id: 0,
        question: "",
        option_a: "",
        option_b: "",
        option_c: "",
        option_d: "",
        correct_answer: "A",
    });

    /**
     * Fetches quizzes on component mount
     */
    useEffect(() => {
        fetchQuizzes();
    }, []);

    /**
     * Fetches quizzes from the API
     */
    const fetchQuizzes = async () => {
        try {
            setIsLoading(true);
            // TODO: Replace with actual API call
            // const response = await fetch('/api/admin/quizzes');
            // const data = await response.json();

            // Mock data for now
            setQuizzes([
                { id: 1, quiz_type: "html", difficulty: "easy", question_count: 10 },
                { id: 2, quiz_type: "html", difficulty: "medium", question_count: 10 },
                { id: 3, quiz_type: "html", difficulty: "hard", question_count: 10 },
                { id: 4, quiz_type: "css", difficulty: "easy", question_count: 10 },
                { id: 5, quiz_type: "css", difficulty: "medium", question_count: 10 },
                { id: 6, quiz_type: "css", difficulty: "hard", question_count: 10 },
                { id: 7, quiz_type: "javascript", difficulty: "easy", question_count: 10 },
                { id: 8, quiz_type: "javascript", difficulty: "medium", question_count: 10 },
                { id: 9, quiz_type: "javascript", difficulty: "hard", question_count: 10 },
            ]);
        } catch (error) {
            console.error("Error fetching quizzes:", error);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Fetches questions for a specific quiz
     * @param quizId - The ID of the quiz
     */
    const fetchQuestions = async (quizId: number) => {
        try {
            setIsLoading(true);
            // TODO: Replace with actual API call
            // const response = await fetch(`/api/admin/quizzes/${quizId}/questions`);
            // const data = await response.json();

            // Mock data for now
            setQuestions([
                {
                    id: 1,
                    quiz_id: quizId,
                    question: "What does HTML stand for?",
                    option_a: "Hyper Text Markup Language",
                    option_b: "Home Tool Markup Language",
                    option_c: "Hyperlinks and Text Markup Language",
                    option_d: "Hyper Tool Multi Language",
                    correct_answer: "A",
                },
                {
                    id: 2,
                    quiz_id: quizId,
                    question: "Which tag is used for the largest heading?",
                    option_a: "<h6>",
                    option_b: "<heading>",
                    option_c: "<h1>",
                    option_d: "<head>",
                    correct_answer: "C",
                },
            ]);
        } catch (error) {
            console.error("Error fetching questions:", error);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Handles quiz selection to view its questions
     * @param quiz - The selected quiz
     */
    const handleViewQuestions = (quiz: Quiz) => {
        setSelectedQuiz(quiz);
        setActiveTab("questions");
        fetchQuestions(quiz.id);
    };

    /**
     * Handles adding a new question
     */
    const handleAddQuestion = async () => {
        if (!selectedQuiz) return;

        try {
            // TODO: Replace with actual API call
            // await fetch('/api/admin/questions', {
            //     method: 'POST',
            //     body: JSON.stringify({ ...newQuestion, quiz_id: selectedQuiz.id })
            // });

            const newId = Math.max(...questions.map((q) => q.id), 0) + 1;
            setQuestions([
                ...questions,
                { ...newQuestion, id: newId, quiz_id: selectedQuiz.id },
            ]);
            setShowAddQuestionModal(false);
            setNewQuestion({
                quiz_id: 0,
                question: "",
                option_a: "",
                option_b: "",
                option_c: "",
                option_d: "",
                correct_answer: "A",
            });
        } catch (error) {
            console.error("Error adding question:", error);
            alert("Failed to add question");
        }
    };

    /**
     * Handles question deletion
     * @param questionId - The ID of the question to delete
     */
    const handleDeleteQuestion = async (questionId: number) => {
        if (!confirm("Are you sure you want to delete this question?")) {
            return;
        }

        try {
            // TODO: Replace with actual API call
            // await fetch(`/api/admin/questions/${questionId}`, { method: 'DELETE' });

            setQuestions(questions.filter((q) => q.id !== questionId));
        } catch (error) {
            console.error("Error deleting question:", error);
            alert("Failed to delete question");
        }
    };

    /**
     * Gets badge color based on difficulty
     * @param difficulty - The difficulty level
     * @returns Tailwind CSS classes for the badge
     */
    const getDifficultyBadge = (difficulty: string): string => {
        switch (difficulty) {
            case "easy":
                return "bg-green-100 text-green-800";
            case "medium":
                return "bg-yellow-100 text-yellow-800";
            case "hard":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Quiz Management</h1>
                    {selectedQuiz && activeTab === "questions" && (
                        <p className="text-gray-500 mt-1">
                            {selectedQuiz.quiz_type.toUpperCase()} - {selectedQuiz.difficulty.charAt(0).toUpperCase() + selectedQuiz.difficulty.slice(1)}
                        </p>
                    )}
                </div>
                {activeTab === "questions" && (
                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                setActiveTab("quizzes");
                                setSelectedQuiz(null);
                            }}
                            className="border border-gray-300 hover:bg-gray-100 py-2 px-4 rounded-lg"
                        >
                            ← Back to Quizzes
                        </button>
                        <button
                            onClick={() => setShowAddQuestionModal(true)}
                            className="bg-(--secondary-color) hover:bg-(--hover-background) text-white py-2 px-4 rounded-lg flex items-center gap-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
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
                            Add Question
                        </button>
                    </div>
                )}
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-(--secondary-color)"></div>
                </div>
            ) : activeTab === "quizzes" ? (
                /* Quizzes Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {quizzes.map((quiz) => (
                        <div
                            key={quiz.id}
                            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold uppercase">{quiz.quiz_type}</h3>
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyBadge(
                                        quiz.difficulty
                                    )}`}
                                >
                                    {quiz.difficulty}
                                </span>
                            </div>
                            <p className="text-gray-500 mb-4">
                                {quiz.question_count} questions
                            </p>
                            <button
                                onClick={() => handleViewQuestions(quiz)}
                                className="w-full bg-(--secondary-color) hover:bg-(--hover-background) text-white py-2 px-4 rounded-lg"
                            >
                                Manage Questions
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                /* Questions Table */
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Question
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Correct Answer
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {questions.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-6 py-4 text-center text-gray-500"
                                    >
                                        No questions found. Add your first question!
                                    </td>
                                </tr>
                            ) : (
                                questions.map((question) => (
                                    <tr key={question.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {question.id}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                                            <p className="truncate">{question.question}</p>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                                                {question.correct_answer}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="flex gap-2">
                                                <button
                                                    className="text-blue-600 hover:text-blue-800"
                                                    title="Edit"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                        />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteQuestion(question.id)}
                                                    className="text-red-600 hover:text-red-800"
                                                    title="Delete"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Add Question Modal */}
            {showAddQuestionModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-6">Add New Question</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Question
                                </label>
                                <textarea
                                    value={newQuestion.question}
                                    onChange={(e) =>
                                        setNewQuestion({ ...newQuestion, question: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-(--secondary-color)"
                                    rows={3}
                                    placeholder="Enter your question..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Option A
                                    </label>
                                    <input
                                        type="text"
                                        value={newQuestion.option_a}
                                        onChange={(e) =>
                                            setNewQuestion({ ...newQuestion, option_a: e.target.value })
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-(--secondary-color)"
                                        placeholder="Option A"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Option B
                                    </label>
                                    <input
                                        type="text"
                                        value={newQuestion.option_b}
                                        onChange={(e) =>
                                            setNewQuestion({ ...newQuestion, option_b: e.target.value })
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-(--secondary-color)"
                                        placeholder="Option B"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Option C
                                    </label>
                                    <input
                                        type="text"
                                        value={newQuestion.option_c}
                                        onChange={(e) =>
                                            setNewQuestion({ ...newQuestion, option_c: e.target.value })
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-(--secondary-color)"
                                        placeholder="Option C"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Option D
                                    </label>
                                    <input
                                        type="text"
                                        value={newQuestion.option_d}
                                        onChange={(e) =>
                                            setNewQuestion({ ...newQuestion, option_d: e.target.value })
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-(--secondary-color)"
                                        placeholder="Option D"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Correct Answer
                                </label>
                                <select
                                    value={newQuestion.correct_answer}
                                    onChange={(e) =>
                                        setNewQuestion({
                                            ...newQuestion,
                                            correct_answer: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-(--secondary-color)"
                                >
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 mt-6">
                            <button
                                onClick={() => setShowAddQuestionModal(false)}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddQuestion}
                                className="px-4 py-2 bg-(--secondary-color) hover:bg-(--hover-background) text-white rounded-lg"
                            >
                                Add Question
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
