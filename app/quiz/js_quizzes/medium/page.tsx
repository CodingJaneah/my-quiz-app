"use client";

import Header from "../../../../frontend/components/layout/Header";
import Footer from "@/frontend/components/layout/Footer";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/frontend/context/AuthContext";

/**
 * Interface for quiz question without the correct answer
 */
interface QuizQuestionDisplay {
    question_id: number;
    quiz_type: string;
    difficulty: string;
    question_text: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
}

/**
 * Interface for user's selected answers
 */
interface SelectedAnswers {
    [questionId: number]: string;
}

/**
 * Interface for quiz result
 */
interface QuizResult {
    total_questions: number;
    correct_answers: number;
    score_percentage: number;
    passed: boolean;
}

/**
 * Medium JavaScript Quiz Page
 * Displays 10 medium-level JavaScript quiz questions
 */
/**
 * Medium JavaScript Quiz Page
 * Displays 10 medium-level JavaScript quiz questions
 * Stores user results in the database for dashboard analytics
 */
export default function MediumJsQuiz() {
    const { user } = useAuth();
    const [questions, setQuestions] = useState<QuizQuestionDisplay[]>([]);
    const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({});
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    /**
     * Fetches quiz questions and previous answers (if logged in) on component mount
     */
    useEffect(() => {
        const fetchAll = async () => {
            setIsLoading(true);
            try {
                // Fetch questions first
                const response = await fetch('/api/quiz?type=javascript&difficulty=medium');
                const data = await response.json();
                if (data.success) {
                    setQuestions(data.questions);

                    // Then fetch previous answers if user is logged in
                    if (user?.id) {
                        const res = await fetch(`/api/user-answers?user_id=${user.id}&quiz_type=javascript&difficulty=medium`);
                        if (res.ok) {
                            const ansData = await res.json();
                            if (ansData.answers && Array.isArray(ansData.answers) && ansData.answers.length > 0) {
                                const prev: SelectedAnswers = {};
                                ansData.answers.forEach((a: any) => {
                                    prev[a.question_id] = a.selected_answer;
                                });
                                setSelectedAnswers(prev);
                            }
                        }
                    }
                } else {
                    setError(data.error || 'Failed to load questions');
                }
            } catch (err) {
                setError('Failed to connect to the server');
                console.error('Error fetching questions:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAll();
    }, [user]);

    /**
     * Handles answer selection
     * @param questionId - The ID of the question
     * @param answer - The selected answer (A, B, C, or D)
     */
    const handleAnswerSelect = (questionId: number, answer: string) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
    };

    /**
     * Navigates to the next question
     */
    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        }
    };

    /**
     * Navigates to the previous question
     */
    const handlePrevQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    /**
     * Submits quiz answers for grading
     */
    /**
     * Submits quiz answers for grading and stores result in DB
     */
    const handleSubmitQuiz = async () => {
        if (Object.keys(selectedAnswers).length < questions.length) {
            alert('Please answer all questions before submitting.');
            return;
        }

        try {
            setIsSubmitting(true);
            const answers = Object.entries(selectedAnswers).map(([questionId, answer]) => ({
                question_id: parseInt(questionId),
                selected_answer: answer
            }));

            // Send user_id, quiz_type, and difficulty for result tracking
            const response = await fetch('/api/quiz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    answers,
                    user_id: user?.id,
                    quiz_type: 'javascript',
                    difficulty: 'medium'
                })
            });

            const data = await response.json();

            if (data.success) {
                setQuizResult(data.result);
            } else {
                alert(data.error || 'Failed to submit quiz');
            }
        } catch (err) {
            alert('Failed to submit quiz. Please try again.');
            console.error('Error submitting quiz:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    /**
     * Resets the quiz to start over
     */
    const handleRetryQuiz = () => {
        setSelectedAnswers({});
        setCurrentQuestion(0);
        setQuizResult(null);
        if (typeof window !== 'undefined') {
            window.location.reload();
        }
    };

    // Loading state
    if (isLoading) {
        return (
            <>
                <Header />
                <main className="px-10 min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-(--secondary-color) mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading questions...</p>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    // Error state
    if (error) {
        return (
            <>
                <Header />
                <main className="px-10 min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-red-500 mb-4">{error}</p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="bg-(--secondary-color) hover:bg-(--hover-background) text-white py-2 px-6 rounded"
                        >
                            Try Again
                        </button>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    // Result state
    if (quizResult) {
        return (
            <>
                <Header />
                <main className="px-10 mt-[130px] mb-[200px]">
                    <div className="max-w-xl mx-auto text-center">
                        <h1 className="font-bold text-3xl mb-6">Quiz Complete!</h1>
                        
                        <div className={`p-8 rounded-lg ${quizResult.passed ? 'bg-green-100' : 'bg-red-100'} mb-6`}>
                            <div className="text-6xl mb-4">{quizResult.passed ? '🎉' : '😔'}</div>
                            <h2 className="text-2xl font-bold mb-2">
                                {quizResult.passed ? 'Congratulations!' : 'Keep Practicing!'}
                            </h2>
                            <p className="text-4xl font-bold mb-2">{quizResult.score_percentage}%</p>
                            <p className="text-gray-600">
                                You got {quizResult.correct_answers} out of {quizResult.total_questions} correct
                            </p>
                        </div>

                        <div className="flex gap-4 justify-center">
                            <button 
                                onClick={handleRetryQuiz}
                                className="bg-(--secondary-color) hover:bg-(--hover-background) text-white py-2 px-6 rounded"
                            >
                                Try Again
                            </button>
                            <Link href="/quiz/js_quizzes">
                                <button className="border border-(--secondary-color) text-(--secondary-color) hover:bg-(--primary-color) py-2 px-6 rounded">
                                    Back to Quizzes
                                </button>
                            </Link>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    // Quiz state
    const currentQ = questions[currentQuestion];

    return (
        <>
        <Header />
        <main className="px-10 mt-[130px] mb-[200px] flex justify-start gap-24">

                {/* Question Navigation Dots */}
            <div className="flex justify-center gap-2 flex-wrap mt-40">
                {questions.map((q, index) => (
                    <button
                        key={q.question_id}
                        onClick={() => setCurrentQuestion(index)}
                        className={`w-8 h-8 rounded-full text-sm font-semibold transition-all ${
                            currentQuestion === index
                                ? 'bg-(--secondary-color) text-white'
                                : selectedAnswers[q.question_id]
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            <div className="w-[600px]">
                <div className="flex justify-between items-center mb-6">
                    <Link href="/quiz/js_quizzes" className="text-(--secondary-color) font-bold">
                        ← Back
                    </Link>
                    <span className="text-orange-500 font-semibold">JavaScript Medium Level</span>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Question {currentQuestion + 1} of {questions.length}</span>
                        <span>{Object.keys(selectedAnswers).length} answered</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                            className="bg-(--secondary-color) h-2 rounded-full transition-all duration-300"
                            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Question Card */}
                {currentQ && (
                    <div className="border border-gray-300 rounded-lg p-6 shadow-md mb-6">
                        <h2 className="font-semibold text-lg mb-4">{currentQ.question_text}</h2>
                        
                        <div className="space-y-3">
                            {['A', 'B', 'C', 'D'].map((option) => {
                                const optionKey = `option_${option.toLowerCase()}` as keyof QuizQuestionDisplay;
                                const optionText = currentQ[optionKey] as string;
                                const isSelected = selectedAnswers[currentQ.question_id] === option;

                                return (
                                    <button
                                        key={option}
                                        onClick={() => handleAnswerSelect(currentQ.question_id, option)}
                                        className={`w-full text-left p-4 rounded-lg border transition-all ${
                                            isSelected 
                                                ? 'border-(--secondary-color) bg-(--primary-color)' 
                                                : 'border-gray-300 hover:border-(--secondary-color) hover:bg-gray-50'
                                        }`}
                                    >
                                        <span className="font-semibold mr-2">{option}.</span>
                                        {optionText}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between">
                    <button
                        onClick={handlePrevQuestion}
                        disabled={currentQuestion === 0}
                        className={`py-2 px-6 rounded ${
                            currentQuestion === 0 
                                ? 'bg-gray-300 cursor-not-allowed' 
                                : 'bg-gray-500 hover:bg-gray-600 text-white'
                        }`}
                    >
                        Previous
                    </button>

                    {currentQuestion === questions.length - 1 ? (
                        <button
                            onClick={handleSubmitQuiz}
                            disabled={isSubmitting}
                            className="bg-(--secondary-color) hover:bg-(--hover-background) text-white py-2 px-6 rounded"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
                        </button>
                    ) : (
                        <button
                            onClick={handleNextQuestion}
                            className="bg-(--secondary-color) hover:bg-(--hover-background) text-white py-2 px-6 rounded"
                        >
                            Next
                        </button>
                    )}
                </div>

            </div>
        </main>
        <Footer />
        </>
    );
}
