import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema, ContactFormData } from '@/lib/validation';
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
      console.log('Honeypot validation failed for contact form');
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
      console.log('Spam detected in contact form submission');
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
    const validationResult = contactFormSchema.safeParse(body);
    
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

    const formData: ContactFormData = validationResult.data;
    const metadata = extractRequestMetadata(request);

    // Save lead to database
    try {
      const lead = await LeadManager.createLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        property_type: formData.propertyType,
        budget: formData.budget,
        message: formData.message,
        source: formData.source,
        status: 'new',
        ip_address: metadata.ip_address,
        user_agent: metadata.user_agent,
      });

      console.log('Lead created successfully:', lead.id);
    } catch (dbError) {
      console.error('Database error:', dbError);
      // Continue with email sending even if database fails
    }

    // Send emails
    const emailPromises = [
      EmailService.sendContactFormNotification(formData),
      EmailService.sendContactFormAutoResponse(formData)
    ];

    const emailResults = await Promise.allSettled(emailPromises);
    
    // Check email results
    const notificationSent = emailResults[0].status === 'fulfilled' && emailResults[0].value;
    const autoResponseSent = emailResults[1].status === 'fulfilled' && emailResults[1].value;

    if (!notificationSent) {
      console.error('Failed to send admin notification email');
    }

    if (!autoResponseSent) {
      console.error('Failed to send auto-response email');
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message. We will contact you within 24 hours.',
        data: {
          notificationSent,
          autoResponseSent,
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

  } catch (error) {
    console.error('Contact form API error:', error);
    
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
