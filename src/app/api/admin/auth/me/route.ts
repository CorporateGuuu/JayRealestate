import { NextRequest, NextResponse } from 'next/server';
import { AdminAuth } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
  try {
    // Get token from cookie
    const token = request.cookies.get('admin_token')?.value;
    
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: 'No authentication token provided',
          code: 'NO_TOKEN'
        },
        { status: 401 }
      );
    }

    // Verify token
    const payload = AdminAuth.verifyToken(token);
    
    if (!payload) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid or expired token',
          code: 'INVALID_TOKEN'
        },
        { status: 401 }
      );
    }

    // Get user details
    const user = await AdminAuth.getAdminById(payload.userId);
    
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'User not found',
          code: 'USER_NOT_FOUND'
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Admin auth verification error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred during authentication',
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
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
