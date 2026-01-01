"use client";

import Header from "../../frontend/components/layout/Header";
import Footer from "@/frontend/components/layout/Footer";
import DashboardSidebar from "../../frontend/components/layout/DashboardSidebar";
import { useAuth } from "../../frontend/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Dashboard Layout Component
 * Provides consistent layout with sidebar for all dashboard pages
 */
export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    /**
     * Redirects to login if user is not authenticated
     */
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, isLoading, router]);

    // Loading state
    if (isLoading) {
        return (
            <>
                <Header />
                <main className="px-10 min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-(--secondary-color) mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading...</p>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    // Not authenticated state
    if (!isAuthenticated) {
        return null;
    }

    return (
        <>
            <Header />
            <div className="flex">
                <DashboardSidebar />
                <main className="ml-64 flex-1 min-h-screen bg-gray-50">
                    {children}
                </main>
            </div>
            <Footer />
        </>
    );
}
