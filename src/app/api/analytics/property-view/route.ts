import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/database';
import { RateLimiter } from '@/lib/rate-limit';

// Property view tracking
export async function POST(request: NextRequest) {
  try {
    // Rate limiting for analytics tracking
    const rateLimitResult = RateLimiter.isRateLimited(request, {
      maxRequests: 50,
      windowMs: 300000 // 5 minutes
    });
    
    if (rateLimitResult.limited) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many requests',
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

    const body = await request.json();
    const { propertyId, propertyName, developer, area, timestamp } = body;

    // Get client IP and user agent
    const ip_address = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      'unknown';
    const user_agent = request.headers.get('user-agent') || '';

    // Store property view in database
    try {
      const { error } = await supabase
        .from('property_views')
        .insert([{
          property_id: propertyId,
          property_name: propertyName || '',
          developer: developer || '',
          area: area || '',
          ip_address,
          user_agent,
          page_url: request.headers.get('referer') || '',
          created_at: timestamp || new Date().toISOString()
        }]);

      if (error) {
        console.error('Database error storing property view:', error);
        // Continue without failing - analytics shouldn't break user experience
      }
    } catch (dbError) {
      console.error('Failed to store property view:', dbError);
      // Continue without failing
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Property view tracked successfully'
      },
      { 
        status: 200,
        headers: RateLimiter.getRateLimitHeaders(
          rateLimitResult.remaining, 
          rateLimitResult.resetTime
        )
      }
    );

  } catch (error) {
    console.error('Property view analytics error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to track property view',
        code: 'TRACKING_ERROR'
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
