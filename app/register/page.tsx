"use client";

import Header from "../../frontend/components/Header";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    /**
     * Handles the registration form submission
     * @param e - Form event
     */
    const handleRegister = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    confirmPassword,
                }),
            });

            const data = await response.json();

            if (data.success) {
                // Registration successful - redirect to login page
                alert("Registration successful! Please login.");
                router.push("/login");
            } else {
                // Show error message
                setError(data.message || "Registration failed");
            }
        } catch (err) {
            console.error("Registration error:", err);
            setError("An error occurred during registration. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Header />
            <main className="mt-28">
            <h1 className="text-3xl text-center font-bold">Register Now!</h1>

            <form onSubmit={handleRegister} className="flex flex-col gap-2 justify-center mt-6 w-sm m-auto">
                {error && (
                    <p className="text-red-500 text-center mb-2">{error}</p>
                )}
                <input 
                    type="text" 
                    placeholder="Username" 
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required 
                    className="border border-gray-300 p-2 rounded w-full max-w-md focus:border-(--secondary-color) focus:outline-none"
                />
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
                <input 
                    type="password" 
                    placeholder="Confirm Password" 
                    id="confirm-pass"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required 
                    className="border border-gray-300 p-2 rounded w-full max-w-md focus:border-(--secondary-color) focus:outline-none"
                />

                <label className="flex items-center gap-2 w-full justify-start mt-4">
                    <input 
                        type="checkbox" 
                        name="terms" 
                        id="terms" 
                        required 
                        className="h-4 w-4"
                    />
                    I agree to the <a href="#" className="text-blue-500 underline">Terms and Conditions</a>
                </label>

                <button 
                    type="submit"
                    id="register-now"
                    disabled={isLoading}
                    className="bg-(--secondary-color) text-white px-6 py-2 rounded mt-4 hover:bg-(--hover-background) transition disabled:opacity-50"
                >
                    {isLoading ? "Registering..." : "Register"}
                </button>

                <p id="have-account" className="text-center w-full mt-4">
                    Already have an account? <Link href="/login" className="text-blue-500 underline">Login here</Link>
                </p>
            </form>

        </main>
        </>
    )
}