"use client";

import Link from "next/link";
import Header from "../frontend/components/layout/Header";
import Footer from "../frontend/components/layout/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "@/frontend/context/AuthContext";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div>
      <Header />
      <main className="mt-[130px]">
          <h1 className="text-3xl text-(--secondary-color) text-center">Welcome to QUIZ APP!</h1>
            <div className="buttons flex justify-center gap-3 my-4">
              {isAuthenticated ? (
                <p className="text-xl font-semibold">Welcome, {user?.username}!</p>
              ) : (
                <>
                  <Link href="/register"><button className="bg-(--secondary-color) text-white p-2 w-24 text-lg">Register</button></Link>
                  <Link href="/login"><button className="bg-(--primary-color) p-2 w-24 text-lg">Sign In</button></Link>
                </>
              )}
            </div>

          <section>
            <h2 className="text-2xl text-center mt-8 font-bold">Test Your Coding Skills</h2>
            <p className="w-2xl m-auto text-lg mt-2">
              Challenge yourself and solidify your foundational skills with our curated HTML, CSS, and JavaScript quizzes. Whether you're a beginner just starting your web development journey or an intermediate developer aiming to master complex front-end techniques, our platform offers a comprehensive learning experience designed specifically for you.
            </p>
      
      </section>
      
      <section>
        <h2 style={{ marginTop: '30px', textAlign: 'center', marginBottom: '20px' }} className="text-2xl font-bold">
          Get Started Now!
        </h2>

        <div className="flex justify-center gap-12">
          <div>
            <p><FontAwesomeIcon icon={faCheck} className="text-green-500"/> Take our quizzes to test your knowledge</p>
            <p><FontAwesomeIcon icon={faCheck} className="text-green-500"/> Improve your coding skills and confidence</p>
            <p><FontAwesomeIcon icon={faCheck} className="text-green-500"/> Access quizzes anytime, anywhere on any device</p>
          </div>
          <div className="text-features">
            <p><FontAwesomeIcon icon={faCheck} className="text-green-500"/> Learn at your own pace with instant feedback</p>
            <p><FontAwesomeIcon icon={faCheck} className="text-green-500"/> Track your progress and see your improvements</p>
            <p><FontAwesomeIcon icon={faCheck} className="text-green-500"/> Master HTML, CSS, and JavaScript fundamentals</p>
          </div>
        </div>
      </section>

          <div id="submit-btn" className="flex justify-center mt-8">
            <Link href="/quiz"><button className="bg-(--secondary-color) text-white p-2 w-xs rounded-2xl">Start Quiz Now</button></Link>
          </div>

      </main>
      <Footer />
    </div>
  );
}
