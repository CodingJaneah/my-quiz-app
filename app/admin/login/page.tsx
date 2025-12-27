"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Admin Login Page
 * Provides authentication form for admin access
 */
export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    /**
     * Handles form submission for admin login
     * @param e - Form event
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Basic validation
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        try {
            setIsLoading(true);

            // Authenticate admin via API
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.success) {
                // Store admin session
                localStorage.setItem("adminUser", JSON.stringify(data.user));
                router.push("/admin/dashboard");
            } else {
                setError(data.error || "Invalid email or password");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                {/* Logo/Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
                    <p className="text-gray-600 mt-2">Sign in to access the dashboard</p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-lg shadow-md p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                {error}
                            </div>
                        )}

                        {/* Email Field */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-(--secondary-color)"
                                placeholder="admin@example.com"
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-(--secondary-color)"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-(--secondary-color) hover:bg-(--hover-background) text-white py-3 px-4 rounded-lg font-semibold transition-colors disabled:opacity-50"
                        >
                            {isLoading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    {/* Back to Site Link */}
                    <div className="mt-6 text-center">
                        <a
                            href="/"
                            className="text-sm text-gray-600 hover:text-(--secondary-color)"
                        >
                            ← Back to Main Site
                        </a>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-gray-500 text-sm mt-6">
                    © 2025 Quiz App. All rights reserved.
                </p>
            </div>
        </div>
    );
}
