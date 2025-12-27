"use client";

import Header from "../../frontend/components/Header";
import Footer from "@/frontend/components/Footer";
import DashboardSidebar from "../../frontend/components/DashboardSidebar";
import { useAuth } from "../../frontend/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * User Profile Page
 * Displays user's profile information and settings
 */
export default function UserProfile() {
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: ""
    });

    /**
     * Redirects to login if user is not authenticated
     */
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, isLoading, router]);

    /**
     * Sets form data when user data is available
     */
    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || "",
                email: user.email || ""
            });
        }
    }, [user]);

    /**
     * Handles input change for form fields
     * @param e - Change event from input
     */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    /**
     * Handles form submission for profile update
     * @param e - Form submit event
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement profile update API call
        alert('Profile update functionality coming soon!');
        setIsEditing(false);
    };

    // Loading state
    if (isLoading) {
        return (
            <>
                <Header />
                <main className="px-10 min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-(--secondary-color) mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading profile...</p>
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
                    <div className="px-10 pt-[130px] pb-[100px]">
                        <div className="max-w-3xl">
                            {/* Page Header */}
                            <div className="mb-8">
                                <h1 className="font-bold text-3xl mb-2">My Profile</h1>
                                <p className="text-gray-600">Manage your account information and settings.</p>
                            </div>

                            {/* Profile Card */}
                            <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                                {/* Profile Header */}
                                <div className="bg-(--primary-color) p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-20 h-20 rounded-full bg-(--secondary-color) flex items-center justify-center text-white text-3xl font-bold">
                                            {user?.username ? user.username.charAt(0).toUpperCase() : '?'}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-(--secondary-color)">{user?.username}</h2>
                                            <p className="text-gray-600">{user?.email}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Profile Form */}
                                <div className="p-6">
                                    <form onSubmit={handleSubmit}>
                                        <div className="space-y-6">
                                            {/* Username Field */}
                                            <div>
                                                <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Username
                                                </label>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        id="username"
                                                        name="username"
                                                        value={formData.username}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-(--secondary-color)"
                                                    />
                                                ) : (
                                                    <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-700">{user?.username}</p>
                                                )}
                                            </div>

                                            {/* Email Field */}
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Email Address
                                                </label>
                                                {isEditing ? (
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-(--secondary-color)"
                                                    />
                                                ) : (
                                                    <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-700">{user?.email}</p>
                                                )}
                                            </div>

                                            {/* Account Created */}
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Member Since
                                                </label>
                                                <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-700">
                                                    {user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    }) : 'N/A'}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="mt-8 flex gap-4">
                                            {isEditing ? (
                                                <>
                                                    <button
                                                        type="submit"
                                                        className="bg-(--secondary-color) hover:bg-(--hover-background) text-white py-2 px-6 rounded-lg transition-colors"
                                                    >
                                                        Save Changes
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setIsEditing(false);
                                                            setFormData({
                                                                username: user?.username || "",
                                                                email: user?.email || ""
                                                            });
                                                        }}
                                                        className="border border-gray-300 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-50 transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => setIsEditing(true)}
                                                    className="bg-(--secondary-color) hover:bg-(--hover-background) text-white py-2 px-6 rounded-lg transition-colors"
                                                >
                                                    Edit Profile
                                                </button>
                                            )}
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* Additional Settings */}
                            <div className="mt-8 bg-white border border-gray-200 rounded-lg shadow-md p-6">
                                <h3 className="font-bold text-xl mb-4">Account Settings</h3>
                                
                                <div className="space-y-4">
                                    {/* Change Password */}
                                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                        <div>
                                            <h4 className="font-semibold">Change Password</h4>
                                            <p className="text-sm text-gray-500">Update your password for better security</p>
                                        </div>
                                        <button className="text-(--secondary-color) hover:underline font-semibold">
                                            Update
                                        </button>
                                    </div>

                                    {/* Notification Settings */}
                                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                        <div>
                                            <h4 className="font-semibold">Notifications</h4>
                                            <p className="text-sm text-gray-500">Manage your notification preferences</p>
                                        </div>
                                        <button className="text-(--secondary-color) hover:underline font-semibold">
                                            Manage
                                        </button>
                                    </div>

                                    {/* Delete Account */}
                                    <div className="flex items-center justify-between py-3">
                                        <div>
                                            <h4 className="font-semibold text-red-500">Delete Account</h4>
                                            <p className="text-sm text-gray-500">Permanently delete your account and data</p>
                                        </div>
                                        <button className="text-red-500 hover:underline font-semibold">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </>
    );
}
