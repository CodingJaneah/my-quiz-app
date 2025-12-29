import { NextRequest, NextResponse } from 'next/server';
import { uploadToCloudinary } from '../../../../backend/utils/cloudinary.util';
import { updateUserAvatar } from '../../../../backend/services/user.service';

/**
 * API Route: /api/user/avatar-upload
 * Handles avatar image upload and returns the public URL of the uploaded image.
 * Accepts multipart/form-data with 'avatar' (file) and 'user_id' (string).
 * Saves the file to /public/avatars and returns the URL.
 */
export async function POST(req: NextRequest) {
    try {
        // Parse form data
        const formData = await req.formData();
        const file = formData.get('avatar') as File | null;
        const userId = formData.get('user_id') as string | null;
        if (!file || !userId) {
            return NextResponse.json({ success: false, error: 'Missing file or user_id' }, { status: 400 });
        }
        const userIdNum = Number(userId);
        if (isNaN(userIdNum)) {
            return NextResponse.json({ success: false, error: 'Invalid user_id' }, { status: 400 });
        }


        // Read file buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to Cloudinary
        const ext = file.name.split('.').pop();
        const fileName = `avatar_${userId}_${Date.now()}.${ext}`;
        const cloudinaryUrl = await uploadToCloudinary(buffer, fileName);

        // Update user's avatar_url in the database
        const updatedUser = await updateUserAvatar(userIdNum, cloudinaryUrl);
        if (!updatedUser) {
            return NextResponse.json({ success: false, error: 'User not found or update failed' }, { status: 404 });
        }

        return NextResponse.json({ success: true, avatar_url: cloudinaryUrl, user: updatedUser });
    } catch (error) {
        console.error('Avatar upload error:', error);
        return NextResponse.json({ success: false, error: 'Failed to upload avatar' }, { status: 500 });
    }
}
