"use client";

import Header from "../../frontend/components/Header";
import Footer from "@/frontend/components/Footer";
import DashboardSidebar from "../../frontend/components/DashboardSidebar";
import { useAuth } from "../../frontend/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

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
    // State for password update confirmation modal
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    // State for delete account confirmation modal
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    // State for avatar update modal
    const [showAvatarModal, setShowAvatarModal] = useState(false);
    // State for avatar image preview (URL or base64 for preview)
    const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatar_url || null);

    // Keep avatarPreview in sync with user.avatar_url (including after refresh)
    useEffect(() => {
        setAvatarPreview(user?.avatar_url || null);
    }, [user]);
    // State for avatar file
    const avatarFileRef = useRef<HTMLInputElement | null>(null);

    // Do not redirect to login on refresh; just show nothing or a message if not authenticated

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
    /**
     * Handles form submission for profile update
     * Calls PATCH /api/user and updates AuthContext on success
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        try {
            const response = await fetch('/api/user', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: user.id,
                    username: formData.username,
                    email: formData.email
                })
            });
            const data = await response.json();
            if (data.success) {
                // If useAuth provides a login method, update context
                if (typeof (window as any).updateAuthUser === 'function') {
                    (window as any).updateAuthUser(data.user);
                }
                setIsEditing(false);
            } else {
                alert(data.error || 'Failed to update profile');
            }
        } catch (err) {
            alert('Failed to update profile. Please try again.');
            console.error('Error updating profile:', err);
        }
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
        return (
            <>
                <Header />
                <main className="px-10 min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">You must be logged in to view your profile.</h2>
                        <p className="text-gray-600">Please log in to access your profile page.</p>
                        <Link href="/login" className="text-blue-600 hover:underline mt-4 inline-block">Go to Login</Link>
                    </div>
                </main>
                <Footer />
            </>
        );
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
                                        <div className="w-20 h-20 rounded-full bg-(--secondary-color) flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
                                            {avatarPreview ? (
                                                <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                                            ) : (
                                                user?.username ? user.username.charAt(0).toUpperCase() : '?'
                                            )}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-(--secondary-color)">{user?.username}</h2>
                                            <p className="text-gray-600">{user?.email}</p>
                                            <button
                                                type="button"
                                                className="hover:underline text-(--secondary-color) font-semibold ml-2"
                                                onClick={() => setShowAvatarModal(true)}
                                            >
                                                Edit Avatar
                                            </button>
                                                                    {/* Avatar Update Modal */}
                                                                    {showAvatarModal && (
                                                                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                                                                            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 relative">
                                                                                <button
                                                                                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
                                                                                    onClick={() => setShowAvatarModal(false)}
                                                                                    aria-label="Close"
                                                                                >
                                                                                    &times;
                                                                                </button>
                                                                                <h2 className="text-2xl font-bold mb-6 text-center">Update Avatar</h2>
                                                                                <form onSubmit={e => { e.preventDefault(); setShowAvatarModal(false); }}>
                                                                                    <div className="mb-6 text-center">
                                                                                        <div className="w-24 h-24 rounded-full bg-(--secondary-color) flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4 overflow-hidden">
                                                                                            {avatarPreview ? (
                                                                                                <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full object-cover rounded-full" />
                                                                                            ) : (
                                                                                                user?.username ? user.username.charAt(0).toUpperCase() : '?'
                                                                                            )}
                                                                                        </div>
                                                                                        <input
                                                                                            type="file"
                                                                                            accept="image/*"
                                                                                            className="block mx-auto"
                                                                                            ref={avatarFileRef}
                                                                                            onChange={async e => {
                                                                                                const file = e.target.files && e.target.files[0];
                                                                                                if (file) {
                                                                                                    // 1. Upload image to /public/avatars or a static folder via API
                                                                                                    const formData = new FormData();
                                                                                                    formData.append('avatar', file);
                                                                                                    formData.append('user_id', String(user?.id));
                                                                                                    // Use a dedicated API route for file upload (to be implemented)
                                                                                                    const uploadRes = await fetch('/api/user/avatar-upload', {
                                                                                                        method: 'POST',
                                                                                                        body: formData
                                                                                                    });
                                                                                                    const uploadData = await uploadRes.json();
                                                                                                    if (uploadData.success && uploadData.avatar_url) {
                                                                                                        setAvatarPreview(uploadData.avatar_url);
                                                                                                        // 2. Update avatar_url in DB
                                                                                                        await fetch('/api/user', {
                                                                                                            method: 'PATCH',
                                                                                                            headers: { 'Content-Type': 'application/json' },
                                                                                                            body: JSON.stringify({
                                                                                                                user_id: user?.id,
                                                                                                                avatar_url: uploadData.avatar_url
                                                                                                            })
                                                                                                        });
                                                                                                    }
                                                                                                }
                                                                                            }}
                                                                                        />
                                                                                    </div>
                                                                                    <div className="flex gap-4 justify-center">
                                                                                        <button
                                                                                            type="submit"
                                                                                            className="bg-(--secondary-color) hover:bg-(--hover-background) text-white py-2 px-6 rounded-lg transition-colors"
                                                                                        >
                                                                                            Save Avatar
                                                                                        </button>
                                                                                        <button
                                                                                            type="button"
                                                                                            className="border border-gray-300 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-50 transition-colors"
                                                                                            onClick={() => setShowAvatarModal(false)}
                                                                                        >
                                                                                            Cancel
                                                                                        </button>
                                                                                    </div>
                                                                                </form>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                        </div>    
                                    </div>
                                </div>

                                {/* Profile Info */}
                                <div className="p-6">
                                    <div className="space-y-6">
                                        {/* Username Field */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Username
                                            </label>
                                            <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-700">{user?.username}</p>
                                        </div>
                                        {/* Email Field */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Email Address
                                            </label>
                                            <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-700">{user?.email}</p>
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
                                    {/* Action Button */}
                                    <div className="mt-8 flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(true)}
                                            className="bg-(--secondary-color) hover:bg-(--hover-background) text-white py-2 px-6 rounded-lg transition-colors"
                                        >
                                            Edit Profile
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Modal for Editing Profile */}
                            {isEditing && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 relative">
                                        <button
                                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
                                            onClick={() => {
                                                setIsEditing(false);
                                                setFormData({
                                                    username: user?.username || "",
                                                    email: user?.email || ""
                                                });
                                            }}
                                            aria-label="Close"
                                        >
                                            &times;
                                        </button>
                                        <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-4">
                                                <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Username
                                                </label>
                                                <input
                                                    type="text"
                                                    id="username"
                                                    name="username"
                                                    value={formData.username}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-(--secondary-color)"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-(--secondary-color)"
                                                    required
                                                />
                                            </div>
                                            <div className="flex gap-4 mt-8 justify-center">
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
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}

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
                                        <button
                                            className="text-(--secondary-color) hover:underline font-semibold"
                                            type="button"
                                            onClick={() => setShowPasswordConfirm(true)}
                                        >
                                            Update
                                        </button>
                                                                {/* Password Update Confirmation Modal */}
                                                                {showPasswordConfirm && (
                                                                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                                                                        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 relative">
                                                                            <button
                                                                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
                                                                                onClick={() => setShowPasswordConfirm(false)}
                                                                                aria-label="Close"
                                                                            >
                                                                                &times;
                                                                            </button>
                                                                            <h2 className="text-2xl font-bold mb-6 text-center">Confirm Password Update</h2>
                                                                            <p className="mb-6 text-center text-gray-700">Are you sure you want to update your password?</p>
                                                                            <div className="flex gap-4 justify-center">
                                                                                <button
                                                                                    className="bg-(--secondary-color) hover:bg-(--hover-background) text-white py-2 px-6 rounded-lg transition-colors"
                                                                                    onClick={() => {
                                                                                        setShowPasswordConfirm(false);
                                                                                        // TODO: Trigger password update modal or logic here
                                                                                    }}
                                                                                >
                                                                                    Yes, Update Password
                                                                                </button>
                                                                                <button
                                                                                    className="border border-gray-300 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-50 transition-colors"
                                                                                    onClick={() => setShowPasswordConfirm(false)}
                                                                                >
                                                                                    Cancel
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
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
                                        <button
                                            className="text-red-500 hover:underline font-semibold"
                                            type="button"
                                            onClick={() => setShowDeleteConfirm(true)}
                                        >
                                            Delete
                                        </button>
                                                                {/* Delete Account Confirmation Modal */}
                                                                {showDeleteConfirm && (
                                                                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                                                                        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 relative">
                                                                            <button
                                                                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
                                                                                onClick={() => setShowDeleteConfirm(false)}
                                                                                aria-label="Close"
                                                                            >
                                                                                &times;
                                                                            </button>
                                                                            <h2 className="text-2xl font-bold mb-6 text-center text-red-600">Delete Account</h2>
                                                                            <p className="mb-4 text-center text-gray-700 font-semibold">Are you sure you want to delete your account?</p>
                                                                            <p className="mb-6 text-center text-gray-600 text-sm">
                                                                                This action is <span className="font-bold text-red-600">permanent</span> and cannot be undone. All your data, quiz results, and account information will be <span className="font-bold">permanently deleted</span> and you will lose access to your account.
                                                                            </p>
                                                                            <div className="flex gap-4 justify-center">
                                                                                <button
                                                                                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg transition-colors"
                                                                                    onClick={() => {
                                                                                        setShowDeleteConfirm(false);
                                                                                        // TODO: Trigger account deletion logic here
                                                                                    }}
                                                                                >
                                                                                    Yes, Delete My Account
                                                                                </button>
                                                                                <button
                                                                                    className="border border-gray-300 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-50 transition-colors"
                                                                                    onClick={() => setShowDeleteConfirm(false)}
                                                                                >
                                                                                    Cancel
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
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
