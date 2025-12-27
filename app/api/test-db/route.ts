import { NextResponse } from 'next/server';
import { testConnection } from '@/backend/utils/db.util';

/**
 * GET handler to test MySQL database connection
 * @returns JSON response indicating connection success or failure
 */
export async function GET(): Promise<NextResponse> {
  try {
    await testConnection();
    return NextResponse.json({ 
      success: true, 
      message: 'Database connection successful!' 
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        message: 'Database connection failed', 
        error: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
}
