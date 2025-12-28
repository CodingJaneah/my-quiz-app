"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

/**
 * Interface for AdminLayout props
 */
interface AdminLayoutProps {
    children: ReactNode;
}

/**
 * Interface for Admin User
 */
interface AdminUser {
    id: number;
    username: string;
    email: string;
}

/**
 * Admin Layout Component
 * Provides sidebar navigation for admin pages
 * Includes authentication protection for admin routes
 */
export default function AdminLayout({ children }: AdminLayoutProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

    /**
     * Check if admin is authenticated on component mount
     * Redirects to login page if not authenticated
     */
    useEffect(() => {
        // Skip auth check on login page
        if (pathname === "/admin/login") {
            setIsLoading(false);
            return;
        }

        // TODO: Fetch admin user from backend/session
        // For now, always redirect to login (or implement your own logic)
        // Example: fetch('/api/admin/me').then(...)
        setIsLoading(false);
        // Uncomment and implement your own logic below:
        // fetch('/api/admin/me').then(res => res.json()).then(data => {
        //   if (data.adminUser) {
        //     setAdminUser(data.adminUser);
        //     setIsLoading(false);
        //   } else {
        //     router.push("/admin/login");
        //   }
        // });
    }, [pathname, router]);

    // If on login page, render without sidebar
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // If not authenticated and not on login page, don't render anything
    if (!adminUser) {
        return null;
    }

    /**
     * Checks if a nav link is currently active
     * @param path - The path to check
     * @returns boolean indicating if the path is active
     */
    const isActive = (path: string): boolean => {
        return pathname === path || pathname.startsWith(path + "/");
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white flex flex-col">
                <div className="p-6 border-b border-gray-700">
                    <h1 className="text-xl font-bold">Admin Panel</h1>
                </div>

                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        <li>
                            <Link
                                href="/admin/dashboard"
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                    isActive("/admin/dashboard")
                                        ? "bg-(--secondary-color) text-white"
                                        : "hover:bg-gray-700"
                                }`}
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
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                    />
                                </svg>
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/admin/users"
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                    isActive("/admin/users")
                                        ? "bg-(--secondary-color) text-white"
                                        : "hover:bg-gray-700"
                                }`}
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
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                                Users
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/admin/quizzes"
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                    isActive("/admin/quizzes")
                                        ? "bg-(--secondary-color) text-white"
                                        : "hover:bg-gray-700"
                                }`}
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
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                    />
                                </svg>
                                Quiz Management
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="p-4 border-t border-gray-700">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
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
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                        Back to Site
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white shadow-sm border-b border-gray-200 px-8 py-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-700">Welcome, {adminUser?.username || "Admin"}</h2>
                        
                        {/* Profile Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center gap-3 hover:bg-gray-100 rounded-lg p-2 transition-colors">
                                <div className="h-10 w-10 rounded-full bg-(--secondary-color) flex items-center justify-center text-white font-bold">
                                    {adminUser?.username?.charAt(0).toUpperCase() || "A"}
                                </div>
                                <div className="text-left hidden sm:block">
                                    <p className="text-sm font-medium text-gray-700">{adminUser?.username || "Admin User"}</p>
                                    <p className="text-xs text-gray-500">{adminUser?.email || "admin@quizapp.com"}</p>
                                </div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <div className="py-2">
                                    <div className="px-4 py-2 border-b border-gray-100">
                                        <p className="text-sm font-medium text-gray-700">{adminUser?.username || "Admin User"}</p>
                                        <p className="text-xs text-gray-500">{adminUser?.email || "admin@quizapp.com"}</p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            // Clear admin session and redirect to admin login
                                            // TODO: Remove admin user from backend/session
                                            window.location.href = "/admin/login";
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
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
                                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                            />
                                        </svg>
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 bg-gray-100 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
