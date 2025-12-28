import { NextRequest, NextResponse } from 'next/server';
import { updateUserProfile, updateUserAvatar } from '@/backend/services/user.service';
/**
 * PATCH /api/user/avatar
 * Updates the user's avatar_url
 * Expects JSON body: { user_id, avatar_url }
 */
export async function PATCH_AVATAR(request: NextRequest) {
    try {
        const { user_id, avatar_url } = await request.json();
        if (!user_id || !avatar_url) {
            return NextResponse.json(
                { success: false, error: 'user_id and avatar_url are required' },
                { status: 400 }
            );
        }
        const updatedUser = await updateUserAvatar(user_id, avatar_url);
        if (!updatedUser) {
            return NextResponse.json(
                { success: false, error: 'User not found or update failed' },
                { status: 404 }
            );
        }
        return NextResponse.json({ success: true, user: updatedUser });
    } catch (error) {
        console.error('Error updating user avatar:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update user avatar' },
            { status: 500 }
        );
    }
}

/**
 * PATCH /api/user
 * Updates the user's profile (username, email)
 * Expects JSON body: { user_id, username, email }
 */
export async function PATCH(request: NextRequest) {
    try {
        const { user_id, username, email, avatar_url } = await request.json();
        if (!user_id) {
            return NextResponse.json(
                { success: false, error: 'user_id is required' },
                { status: 400 }
            );
        }
        let updatedUser = null;
        if (avatar_url) {
            // If avatar_url is present, update avatar_url (and optionally username/email)
            if (username && email) {
                // Update all fields
                await updateUserProfile(user_id, username, email); // update username/email
                updatedUser = await updateUserAvatar(user_id, avatar_url); // update avatar_url
            } else {
                // Only update avatar_url
                updatedUser = await updateUserAvatar(user_id, avatar_url);
            }
        } else if (username && email) {
            // Only update username/email
            updatedUser = await updateUserProfile(user_id, username, email);
        }
        if (!updatedUser) {
            return NextResponse.json(
                { success: false, error: 'User not found or update failed' },
                { status: 404 }
            );
        }
        return NextResponse.json({ success: true, user: updatedUser });
    } catch (error) {
        console.error('Error updating user profile:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update user profile' },
            { status: 500 }
        );
    }
}
