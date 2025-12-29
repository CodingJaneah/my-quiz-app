// Cloudinary configuration utility
// Place your Cloudinary config and upload logic here
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

/**
 * Uploads a file buffer to Cloudinary and returns the URL
 * @param {Buffer} buffer - The file buffer
 * @param {string} filename - The original filename
 * @returns {Promise<string>} - The Cloudinary URL
 */
export async function uploadToCloudinary(buffer: Buffer, filename: string): Promise<string> {
  // Convert buffer to base64 data URI
  const base64 = buffer.toString('base64');
  const dataUri = `data:image/${filename.split('.').pop()};base64,${base64}`;
  const result = await cloudinary.uploader.upload(dataUri, {
    folder: 'avatars',
    public_id: filename.split('.')[0],
    overwrite: true,
  });
  return result.secure_url;
}
