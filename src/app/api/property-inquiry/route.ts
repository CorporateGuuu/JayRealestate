import { NextRequest, NextResponse } from 'next/server';
import { propertyInquirySchema, PropertyInquiryData } from '@/lib/validation';
import { LeadManager } from '@/lib/database';
import { EmailService } from '@/lib/email';
import { RateLimiter, validateHoneypot, detectSpam, extractRequestMetadata } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const rateLimitResult = RateLimiter.isRateLimited(request);
    
    if (rateLimitResult.limited) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many requests. Please try again later.',
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

    // Parse request body
    const body = await request.json();
    
    // Honeypot validation
    if (!validateHoneypot(body)) {
      console.log('Honeypot validation failed for property inquiry');
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid submission detected.',
          code: 'SPAM_DETECTED'
        },
        { status: 400 }
      );
    }

    // Spam detection
    if (detectSpam(body)) {
      console.log('Spam detected in property inquiry submission');
      return NextResponse.json(
        { 
          success: false, 
          error: 'Your message appears to be spam. Please contact us directly.',
          code: 'SPAM_DETECTED'
        },
        { status: 400 }
      );
    }

    // Validate form data
    const validationResult = propertyInquirySchema.safeParse(body);
    
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

    const formData: PropertyInquiryData = validationResult.data;
    const metadata = extractRequestMetadata(request);

    // Save lead to database
    try {
      const lead = await LeadManager.createLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        source: formData.source,
        status: 'new',
        property_id: formData.propertyId,
        property_name: formData.propertyName,
        inquiry_type: formData.inquiryType,
        preferred_contact_time: formData.preferredContactTime,
        ip_address: metadata.ip_address,
        user_agent: metadata.user_agent,
      });

      console.log('Property inquiry lead created successfully:', lead.id);
    } catch (dbError) {
      console.error('Database error:', dbError);
      // Continue with email sending even if database fails
    }

    // Send notification email to admin
    try {
      const emailSent = await EmailService.sendPropertyInquiryNotification(formData);
      
      if (!emailSent) {
        console.error('Failed to send property inquiry notification email');
      }

      // Return success response
      return NextResponse.json(
        {
          success: true,
          message: 'Thank you for your property inquiry. Our team will contact you soon.',
          data: {
            emailSent,
            timestamp: new Date().toISOString()
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

    } catch (emailError) {
      console.error('Email sending error:', emailError);
      
      return NextResponse.json(
        {
          success: true,
          message: 'Your inquiry has been received. We will contact you soon.',
          warning: 'Email notification may be delayed.',
          data: {
            emailSent: false,
            timestamp: new Date().toISOString()
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
    }

  } catch (error) {
    console.error('Property inquiry API error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred. Please try again or contact us directly.',
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
