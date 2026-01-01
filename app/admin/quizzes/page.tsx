"use client";

import { useState, useEffect } from "react";
import QuizzesGrid from "@/frontend/components/quiz/QuizzesGrid";
import DeleteConfirmationModal from "@/frontend/components/modals/DeleteConfirmationModal";
import QuestionsTable from "@/frontend/components/admin/QuestionsTable";
import AddQuestionModal from "@/frontend/components/modals/AddQuestionModal";

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
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [questionToDeleteId, setQuestionToDeleteId] = useState<number | null>(null);

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
            const response = await fetch('/api/admin/quizzes');
            const data = await response.json();
            if (data.success && Array.isArray(data.quizzes)) {
                setQuizzes(data.quizzes);
            } else {
                setQuizzes([]);
            }
        } catch (error) {
            console.error("Error fetching quizzes:", error);
            setQuizzes([]);
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
            const response = await fetch(`/api/admin/quizzes/${quizId}/questions`);
            const data = await response.json();
            console.log('Fetched questions for quiz', quizId, data); // Debugging output
            if (data.success && Array.isArray(data.questions)) {
                setQuestions(data.questions);
            } else {
                setQuestions([]);
            }
        } catch (error) {
            console.error("Error fetching questions:", error);
            setQuestions([]);
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
        // open confirmation modal instead of native confirm()
        setQuestionToDeleteId(questionId);
        setShowDeleteModal(true);
    };

    const confirmDeleteQuestion = async () => {
        if (questionToDeleteId === null) return;
        try {
            // TODO: Replace with actual API call
            // await fetch(`/api/admin/questions/${questionToDeleteId}`, { method: 'DELETE' });

            setQuestions(questions.filter((q) => q.id !== questionToDeleteId));
            setShowDeleteModal(false);
            setQuestionToDeleteId(null);
        } catch (error) {
            console.error("Error deleting question:", error);
            alert("Failed to delete question");
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setQuestionToDeleteId(null);
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
                <QuizzesGrid quizzes={quizzes} onViewQuestions={handleViewQuestions} />
            ) : (
                <QuestionsTable questions={questions} onDelete={handleDeleteQuestion} />
            )}

            <AddQuestionModal
                show={showAddQuestionModal}
                newQuestion={newQuestion}
                onChange={(field, value) => setNewQuestion({ ...newQuestion, [field]: value })}
                onClose={() => setShowAddQuestionModal(false)}
                onAdd={handleAddQuestion}
            />
            <DeleteConfirmationModal
                show={showDeleteModal}
                title="Delete Question"
                message="This will permanently delete the question. Are you sure?"
                onConfirm={confirmDeleteQuestion}
                onCancel={cancelDelete}
            />
        </div>
    );
}
