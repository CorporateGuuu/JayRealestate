import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = NextResponse.json(
      {
        success: true,
        message: 'Logout successful'
      },
      { status: 200 }
    );

    // Clear the admin token cookie
    response.cookies.set('admin_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0, // Expire immediately
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Admin logout error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred during logout',
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
