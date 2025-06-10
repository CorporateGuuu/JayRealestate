import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/database';
import { RateLimiter } from '@/lib/rate-limit';

// WhatsApp interaction tracking
export async function POST(request: NextRequest) {
  try {
    // Rate limiting for analytics tracking
    const rateLimitResult = RateLimiter.isRateLimited(request, {
      maxRequests: 20,
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
    const { action, message_type, timestamp, user_agent, page_url } = body;

    // Get client IP
    const ip_address = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      'unknown';

    // Store WhatsApp interaction in database
    try {
      const { error } = await supabase
        .from('whatsapp_interactions')
        .insert([{
          action: action || 'whatsapp_click',
          message_type: message_type || 'general',
          page_url: page_url || '',
          ip_address,
          user_agent: user_agent || '',
          created_at: timestamp || new Date().toISOString()
        }]);

      if (error) {
        console.error('Database error storing WhatsApp interaction:', error);
        // Continue without failing - analytics shouldn't break user experience
      }
    } catch (dbError) {
      console.error('Failed to store WhatsApp interaction:', dbError);
      // Continue without failing
    }

    return NextResponse.json(
      {
        success: true,
        message: 'WhatsApp interaction tracked successfully'
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
    console.error('WhatsApp analytics error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to track WhatsApp interaction',
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
