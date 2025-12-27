import Header from "../../../frontend/components/Header";
import Footer from "@/frontend/components/Footer";
import Link from "next/link";

/**
 * JS Quizzes landing page
 * Displays options for easy, medium, and hard HTML quizzes
 */
export default function HtmlQuizzes() {
    return (
        <>
        <Header />
        <main className="px-10">
            <h1 className="mt-[130px] text-center font-bold text-3xl">JS Quizzes</h1>
            <span id="back-icon"><Link href="/quiz" className="font-bold">BACK</Link></span>

            <p className="text-center text-gray-600 mb-8">
                Choose your difficulty level. Each quiz contains 10 questions.
            </p>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 mb-[200px] max-w-4xl mx-auto">
                {/* Easy Quiz Card */}
                <div className="border border-gray-300 rounded-lg p-6 shadow-md text-center hover:shadow-lg transition-shadow">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">🌱</span>
                    </div>
                    <h3 className="font-bold text-xl mb-2">Easy</h3>
                    <p className="text-gray-600 mb-4">Perfect for beginners learning JS basics.</p>
                    <span className="text-green-500 font-semibold block mb-4">10 Questions</span>
                    <Link href="/quiz/js_quizzes/easy">
                        <button className="bg-(--secondary-color) hover:bg-(--hover-background) text-white py-2 px-6 rounded w-full">
                            Start Quiz
                        </button>
                    </Link>
                </div>

                {/* Medium Quiz Card */}
                <div className="border border-gray-300 rounded-lg p-6 shadow-md text-center hover:shadow-lg transition-shadow">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">🌿</span>
                    </div>
                    <h3 className="font-bold text-xl mb-2">Medium</h3>
                    <p className="text-gray-600 mb-4">For those with some JS experience.</p>
                    <span className="text-yellow-500 font-semibold block mb-4">10 Questions</span>
                    <Link href="/quiz/js_quizzes/medium">
                        <button className="bg-(--secondary-color) hover:bg-(--hover-background) text-white py-2 px-6 rounded w-full">
                            Start Quiz
                        </button>
                    </Link>
                </div>

                {/* Hard Quiz Card */}
                <div className="border border-gray-300 rounded-lg p-6 shadow-md text-center hover:shadow-lg transition-shadow">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">🌳</span>
                    </div>
                    <h3 className="font-bold text-xl mb-2">Hard</h3>
                    <p className="text-gray-600 mb-4">Challenge yourself with advanced JS concepts.</p>
                    <span className="text-red-500 font-semibold block mb-4">10 Questions</span>
                    <Link href="/quiz/js_quizzes/hard">
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
