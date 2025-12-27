"use client";

import Header from "../../frontend/components/Header";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/frontend/context/AuthContext";

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();
    const { login } = useAuth();

    /**
     * Handles the login form submission
     * @param e - Form event
     */
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (data.success) {
                // Store user data in auth context
                login(data.user);
                // Login successful - redirect to quiz page
                router.push("/");
            } else {
                // Show error message
                setError(data.message || "Invalid email or password");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("An error occurred during login. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Header />
            <main className="mt-28">
            <h1 className="text-3xl text-center font-bold">Login Now!</h1>

            <form onSubmit={handleLogin} className="flex flex-col gap-2 justify-center mt-6 w-sm m-auto">
                {error && (
                    <p className="text-red-500 text-center mb-2">{error}</p>
                )}
                <input 
                    type="email" 
                    placeholder="Email Address" 
                    id="email-address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    className="border border-gray-300 p-2 rounded w-full max-w-md focus:border-(--secondary-color) focus:outline-none"
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    id="pass"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                    className="border border-gray-300 p-2 rounded w-full max-w-md focus:border-(--secondary-color) focus:outline-none"
                />

                <button 
                    type="submit"
                    id="login-btn"
                    disabled={isLoading}
                    className="bg-(--secondary-color) text-white px-6 py-2 rounded mt-4 hover:bg-(--hover-background) transition disabled:opacity-50"
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>

                <Link href="/forgot-password" className="underline text-center mt-4">Forgot Password?</Link>

                <p id="have-account" className="text-center w-full mt-4">
                    Don't have an account? <Link href="/register" className="text-blue-500 underline">Register here</Link>
                </p>
            </form>

        </main>
        </>
    )
}