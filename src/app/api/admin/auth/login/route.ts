import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { AdminAuth } from '@/lib/admin-auth';
import { RateLimiter } from '@/lib/rate-limit';

// Login schema
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting for login attempts
    const rateLimitResult = RateLimiter.isRateLimited(request, {
      maxRequests: 5,
      windowMs: 900000 // 15 minutes
    });
    
    if (rateLimitResult.limited) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many login attempts. Please try again later.',
          code: 'RATE_LIMITED'
        },
        { 
          status: 429,
          headers: RateLimiter.getRateLimitHeaders(
            rateLimitResult.remaining, 
            rateLimitResult.resetTime
          )
        }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = loginSchema.safeParse(body);
    
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));
      
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed',
          errors,
          code: 'VALIDATION_ERROR'
        },
        { status: 400 }
      );
    }

    const { email, password } = validationResult.data;

    // Authenticate admin user
    const authResult = await AdminAuth.authenticateAdmin(email, password);
    
    if (!authResult) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email or password',
          code: 'INVALID_CREDENTIALS'
        },
        { status: 401 }
      );
    }

    const { user, token } = authResult;

    // Set HTTP-only cookie for security
    const response = NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      },
      { 
        status: 200,
        headers: RateLimiter.getRateLimitHeaders(
          rateLimitResult.remaining, 
          rateLimitResult.resetTime
        )
      }
    );

    // Set secure cookie
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Admin login error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred during login',
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
