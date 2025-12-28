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
    avatar_url?: string;
    // Add other fields as needed
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

    // Check for existing user session on mount and fetch latest user data from backend
    useEffect(() => {
        const fetchAndSetUser = async () => {
            setIsLoading(true);
            try {
                const res = await fetch('/api/user-info/me');
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.user) {
                        setUser(data.user);
                    } else {
                        setUser(null);
                    }
                } else {
                    setUser(null);
                }
            } catch (error) {
                setUser(null);
            }
            setIsLoading(false);
        };
        fetchAndSetUser();
    }, []);

    /**
     * Logs in a user and stores their data
     * @param userData - User data to store
     */
    const login = (userData: User): void => {
        setUser(userData);
        // Optionally, send login info to backend/session
    };

    /**
     * Logs out the current user
     */
    const logout = (): void => {
        setUser(null);
        // Optionally, clear backend/session
        router.push("/login");
    };

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        login,
        logout,
        isLoading,
    };

    // Expose updateAuthUser globally for profile update
    if (typeof window !== 'undefined') {
        (window as any).updateAuthUser = setUser;
    }
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
