import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

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

        // Generate unique filename
        const ext = file.name.split('.').pop();
        const fileName = `avatar_${userId}_${Date.now()}.${ext}`;
        const avatarsDir = path.join(process.cwd(), 'public', 'avatars');
        const filePath = path.join(avatarsDir, fileName);
        const publicUrl = `/avatars/${fileName}`;

        // Ensure avatars directory exists
        await fs.mkdir(avatarsDir, { recursive: true });

        // Read file buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Save file
        await fs.writeFile(filePath, buffer);

        return NextResponse.json({ success: true, avatar_url: publicUrl });
    } catch (error) {
        console.error('Avatar upload error:', error);
        return NextResponse.json({ success: false, error: 'Failed to upload avatar' }, { status: 500 });
    }
}
