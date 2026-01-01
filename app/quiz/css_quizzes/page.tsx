"use client";
import Header from "../../../frontend/components/layout/Header";
import Footer from "@/frontend/components/layout/Footer";
import Link from "next/link";
import { useQuizStatus } from "../../../frontend/utils/useQuizStatus";
import { useQuizResult } from "../../../frontend/utils/useQuizResult";

/**
 * HTML Quizzes landing page
 * Displays options for easy, medium, and hard HTML quizzes
 */
export default function CssQuizzes() {
    // Use the custom hook for each difficulty
    const easyStatus = useQuizStatus('css', 'easy');
    const mediumStatus = useQuizStatus('css', 'medium');
    const hardStatus = useQuizStatus('css', 'hard');
    const easyResult = useQuizResult('css', 'easy');
    const mediumResult = useQuizResult('css', 'medium');
    const hardResult = useQuizResult('css', 'hard');
    return (
        <>
        <Header />
        <main className="px-10">
            <h1 className="mt-[130px] text-center font-bold text-3xl">CSS Quizzes</h1>
            <span id="back-icon"><Link href="/quiz" className="font-bold">BACK</Link></span>

            <p className="text-center text-gray-600 mb-8">
                Choose your difficulty level. Each quiz contains 10 questions.
            </p>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 mb-[200px] max-w-4xl mx-auto">
                {/* Easy Quiz Card */}
                                <div className="border border-gray-300 rounded-lg p-6 shadow-md text-center hover:shadow-lg transition-shadow relative">
                                        {/* Status label top right */}
                                        {easyStatus && (
                                            <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold z-10 ${easyStatus === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                {easyStatus === 'completed' ? 'Completed' : 'Ongoing'}
                                            </span>
                                        )}
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <span className="text-3xl">🌱</span>
                                        </div>
                                        <h3 className="font-bold text-xl mb-2">Easy</h3>
                                        <p className="text-gray-600 mb-4">Perfect for beginners learning CSS basics.</p>
                                        <span className="text-green-500 font-semibold block mb-4">10 Questions</span>
                                        <Link href="/quiz/css_quizzes/easy">
                                                <button className="bg-(--secondary-color) hover:bg-(--hover-background) text-white py-2 px-6 rounded w-full">
                                                        Start Quiz
                                                </button>
                                        </Link>
                                </div>

                {/* Medium Quiz Card */}
                                <div className="border border-gray-300 rounded-lg p-6 shadow-md text-center hover:shadow-lg transition-shadow relative">
                                        {mediumStatus && (
                                            <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold z-10 ${mediumStatus === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                {mediumStatus === 'completed' ? 'Completed' : 'Ongoing'}
                                            </span>
                                        )}
                                        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <span className="text-3xl">🌿</span>
                                        </div>
                                        <h3 className="font-bold text-xl mb-2">Medium</h3>
                                        <p className="text-gray-600 mb-4">For those with some CSS experience.</p>
                                        <span className="text-yellow-500 font-semibold block mb-4">10 Questions</span>
                                        <Link href="/quiz/css_quizzes/medium">
                                                <button className="bg-(--secondary-color) hover:bg-(--hover-background) text-white py-2 px-6 rounded w-full">
                                                        Start Quiz
                                                </button>
                                        </Link>
                                </div>

                {/* Hard Quiz Card */}
                                <div className="border border-gray-300 rounded-lg p-6 shadow-md text-center hover:shadow-lg transition-shadow relative">
                                        {hardStatus && (
                                            <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold z-10 ${hardStatus === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                {hardStatus === 'completed' ? 'Completed' : 'Ongoing'}
                                            </span>
                                        )}
                                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <span className="text-3xl">🌳</span>
                                        </div>
                                        <h3 className="font-bold text-xl mb-2">Hard</h3>
                                        <p className="text-gray-600 mb-4">Challenge yourself with advanced CSS concepts.</p>
                                        <span className="text-red-500 font-semibold block mb-4">10 Questions</span>
                                        <Link href="/quiz/css_quizzes/hard">
                                                <button className="bg-(--secondary-color) hover:bg-(--hover-background) text-white py-2 px-6 rounded w-full">
                                                        Start Quiz
                                                </button>
                                        </Link>
                                    
                                </div>
            </section>
        </main>
        <Footer />
        </>
    );
}
