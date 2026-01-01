"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/frontend/components/ui/PageHeader";
import SearchBar from "@/frontend/components/ui/SearchBar";
import UsersTable from "@/frontend/components/admin/UsersTable";

/**
 * Interface for user data from database
 */
interface User {
    id: number;
    username: string;
    email: string;
    created_at: string;
    updated_at: string;
}

/**
 * Admin Users Page
 * Displays and manages user accounts
 */
export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState<string | null>(null);

    /**
     * Fetches users on component mount
     */
    useEffect(() => {
        fetchUsers();
    }, []);

    /**
     * Fetches users from the API
     */
    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            const response = await fetch('/api/admin/users');
            const data = await response.json();

            if (data.success) {
                setUsers(data.users);
            } else {
                setError(data.error || 'Failed to fetch users');
            }
        } catch (err) {
            console.error("Error fetching users:", err);
            setError('Failed to connect to server');
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Filters users based on search query
     * @returns Filtered array of users
     */
    const filteredUsers = users.filter(
        (user) =>
            user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    /**
     * Handles user deletion
     * @param userId - The ID of the user to delete
     */
    const handleDeleteUser = async (userId: number) => {
        if (!confirm("Are you sure you want to delete this user?")) {
            return;
        }

        try {
            const response = await fetch(`/api/admin/users?id=${userId}`, { 
                method: 'DELETE' 
            });
            const data = await response.json();

            if (data.success) {
                setUsers(users.filter((user) => user.id !== userId));
            } else {
                alert(data.error || 'Failed to delete user');
            }
        } catch (err) {
            console.error("Error deleting user:", err);
            alert("Failed to delete user");
        }
    };

    /**
     * Formats date string for display
     * @param dateString - ISO date string
     * @returns Formatted date string
     */
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Error state
    if (error) {
        return (
            <div className="p-8">
                <div className="text-center py-12">
                    <p className="text-red-500 mb-4">{error}</p>
                    <button
                        onClick={fetchUsers}
                        className="bg-(--secondary-color) hover:bg-(--hover-background) text-white py-2 px-4 rounded-lg"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8">
            <PageHeader title="Users" onAdd={() => { /* keep existing Add User placeholder */ }} addLabel="Add User" />

            <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search users by name or email..." />

            {isLoading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-(--secondary-color)"></div>
                </div>
            ) : (
                <UsersTable users={filteredUsers} onDelete={handleDeleteUser} formatDate={formatDate} />
            )}
        </div>
    );
}
