"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

/**
 * User interface representing logged-in user data
 */
interface User {
    id: number;
    username: string;
    email: string;
    created_at?: string;
}

/**
 * Auth context interface
 */
interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (userData: User) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Auth provider component that wraps the app and provides auth state
 * @param children - Child components
 */
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();

    // Check for existing user session on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Error parsing stored user:", error);
                localStorage.removeItem("user");
            }
        }
        setIsLoading(false);
    }, []);

    /**
     * Logs in a user and stores their data
     * @param userData - User data to store
     */
    const login = (userData: User): void => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    /**
     * Logs out the current user
     */
    const logout = (): void => {
        setUser(null);
        localStorage.removeItem("user");
        router.push("/login");
    };

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        login,
        logout,
        isLoading,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

/**
 * Custom hook to use auth context
 * @returns Auth context value
 */
export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
