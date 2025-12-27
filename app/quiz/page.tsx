"use client";

import Header from "../../frontend/components/Header";
import Footer from "@/frontend/components/Footer";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/frontend/context/AuthContext';

/**
 * Quiz selection page
 * Displays 3 quiz category cards: HTML, CSS, JavaScript
 */
export default function Quiz() {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();
    const { isAuthenticated, isLoading } = useAuth();

    /**
     * Checks if a quiz card should be visible based on search query
     * @param title - The title of the quiz
     * @returns boolean indicating visibility
     */
    const isVisible = (title: string) => {
        return title.toLowerCase().includes(searchQuery.toLowerCase());
    };

    /**
     * Handles navigation to quiz page with auth check
     * @param path - The path to navigate to
     */
    const handleGetStarted = (path: string) => {
        if (isAuthenticated) {
            router.push(path);
        } else {
            router.push('/login');
        }
    };

    return (
        <>
        <Header />
        <main className="px-10 pb-40">
            <h1 className="mt-[130px] text-center font-bold text-3xl">ARE YOU READY?</h1>

            <div className="flex items-center">
                <div>
                 <span id="back-icon"><button onClick={() => router.push('/')} className="font-bold">BACK</button></span>  
                </div>
            
                <div className="mx-auto w-lg">
                    <input 
                        type="text" 
                        placeholder="Search anything here..." 
                        id="search-field" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border border-gray-300 p-2 rounded-md w-full max-w-md focus:border-(--secondary-color) focus:outline-none"
                    />
                </div>
            </div>
            
            <section className="quiz-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
                {isVisible("HTML") && (
                <div className="quiz-card border border-gray-300 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                    <h3 className="font-bold text-xl mb-2">HTML Quiz</h3>
                    <p className="text-gray-600 mb-4">Test your knowledge of HTML fundamentals including tags, attributes, and document structure.</p>
                    <button 
                        onClick={() => handleGetStarted('/quiz/html_quizzes')}
                        disabled={isLoading}
                        className="bg-(--secondary-color) hover:bg-(--hover-background) text-white py-2 px-6 rounded w-full disabled:opacity-50"
                    >
                        {isLoading ? 'Loading...' : 'Get Started'}
                    </button>
                </div>
                )}

                {isVisible("CSS") && (
                <div className="quiz-card border border-gray-300 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                    <h3 className="font-bold text-xl mb-2">CSS Quiz</h3>
                    <p className="text-gray-600 mb-4">Challenge yourself with CSS concepts including selectors, layouts, and styling properties.</p>
                    <button 
                        onClick={() => handleGetStarted('/quiz/css_quizzes')}
                        disabled={isLoading}
                        className="bg-(--secondary-color) hover:bg-(--hover-background) text-white py-2 px-6 rounded w-full disabled:opacity-50"
                    >
                        {isLoading ? 'Loading...' : 'Get Started'}
                    </button>
                </div>
                )}

                {isVisible("JavaScript") && (
                <div className="quiz-card border border-gray-300 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                    <h3 className="font-bold text-xl mb-2">JavaScript Quiz</h3>
                    <p className="text-gray-600 mb-4">Evaluate your JavaScript skills including variables, functions, and DOM manipulation.</p>
                    <button 
                        onClick={() => handleGetStarted('/quiz/js_quizzes')}
                        disabled={isLoading}
                        className="bg-(--secondary-color) hover:bg-(--hover-background) text-white py-2 px-6 rounded w-full disabled:opacity-50"
                    >
                        {isLoading ? 'Loading...' : 'Get Started'}
                    </button>
                </div>
                )}
            </section>
        </main>
        <Footer />
        </>
    )
}