import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

// Rate limiting store (in production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting configuration
const RATE_LIMIT = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 10, // 10 requests per minute per IP
};

// Chat session store (in production, use database)
const chatSessions = new Map<string, {
  messages: Array<{ role: 'user' | 'assistant'; content: string; timestamp: Date }>;
  createdAt: Date;
  lastActivity: Date;
}>();

// Clean up old sessions (older than 1 hour)
const cleanupSessions = () => {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  for (const [sessionId, session] of chatSessions.entries()) {
    if (session.lastActivity < oneHourAgo) {
      chatSessions.delete(sessionId);
    }
  }
};

// Rate limiting middleware
const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();
  const userLimit = rateLimitStore.get(ip);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT.windowMs,
    });
    return true;
  }

  if (userLimit.count >= RATE_LIMIT.maxRequests) {
    return false;
  }

  userLimit.count++;
  return true;
};

// Input validation
const validateInput = (message: string): { isValid: boolean; error?: string } => {
  if (!message || typeof message !== 'string') {
    return { isValid: false, error: 'Message is required and must be a string' };
  }

  if (message.length > 500) {
    return { isValid: false, error: 'Message too long (max 500 characters)' };
  }

  if (message.trim().length === 0) {
    return { isValid: false, error: 'Message cannot be empty' };
  }

  // Basic spam detection
  const spamPatterns = [
    /(.)\1{10,}/, // Repeated characters
    /https?:\/\/[^\s]+/gi, // URLs
    /\b(buy|sell|cheap|free|click|urgent|limited|offer)\b/gi, // Spam keywords
  ];

  for (const pattern of spamPatterns) {
    if (pattern.test(message)) {
      return { isValid: false, error: 'Message contains inappropriate content' };
    }
  }

  return { isValid: true };
};

// Dubai real estate knowledge base
const getDubaiRealEstateResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();

  // Property prices and market info
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('expensive')) {
    return `Dubai property prices vary by location and property type:

🏢 **Downtown Dubai**: AED 1,200-2,000 per sq ft
🌊 **Dubai Marina**: AED 1,000-1,800 per sq ft  
🌴 **Palm Jumeirah**: AED 1,500-3,000 per sq ft
🏢 **Business Bay**: AED 900-1,500 per sq ft
🏘️ **Emirates Hills**: AED 800-1,200 per sq ft

Prices depend on property condition, view, and amenities. Would you like specific information about any area?`;
  }

  // Available properties
  if (lowerMessage.includes('available') || lowerMessage.includes('property') || lowerMessage.includes('apartment') || lowerMessage.includes('villa')) {
    return `We have excellent properties available across Dubai's prime locations:

🏠 **Villas**: Emirates Hills, Palm Jumeirah, Arabian Ranches
🏢 **Apartments**: Downtown Dubai, Dubai Marina, Business Bay
🏙️ **Penthouses**: DIFC, Dubai Marina, Downtown Dubai
🏢 **Commercial**: Business Bay, DIFC, Sheikh Zayed Road

What type of property interests you? I can connect you with our specialists for detailed listings.`;
  }

  // Investment opportunities
  if (lowerMessage.includes('investment') || lowerMessage.includes('invest') || lowerMessage.includes('roi') || lowerMessage.includes('return')) {
    return `Dubai offers excellent investment opportunities:

📈 **Rental Yields**: 5-8% annually
💰 **Capital Appreciation**: Strong growth potential
🌍 **International Appeal**: Global investor destination
🏗️ **New Developments**: Expo 2020 legacy projects

**Top Investment Areas**:
• Business Bay - High rental demand
• Dubai Marina - Tourist and expat favorite  
• Downtown Dubai - Premium location
• DIFC - Commercial hub

Would you like a detailed investment analysis for any specific area?`;
  }

  // Viewing and scheduling
  if (lowerMessage.includes('schedule') || lowerMessage.includes('viewing') || lowerMessage.includes('visit') || lowerMessage.includes('appointment')) {
    return `I'd be happy to help you schedule a property viewing! 

📅 **Available Times**: Sunday-Thursday 9AM-6PM, Saturday 10AM-4PM
📱 **Quick Booking**: Call +971 55 208 9241
💬 **WhatsApp**: Use our WhatsApp widget for instant scheduling
📧 **Email**: info@jayrealestate.ae

Our Dubai specialists can arrange viewings for multiple properties in one day. What areas interest you most?`;
  }

  // Contact and location
  if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('office') || lowerMessage.includes('location')) {
    return `Here's how to reach our Dubai team:

📞 **Phone**: +971 55 208 9241
📍 **Office**: Sultan Business Centre, Oud Metha, Office: 137-A-75, Dubai, UAE
📧 **Email**: info@jayrealestate.ae
💬 **WhatsApp**: Available 24/7 for quick responses

🕒 **Office Hours**:
• Sunday-Thursday: 9AM-6PM GST
• Saturday: 10AM-4PM GST  
• Friday: Closed

Our team speaks English, Arabic, and Hindi. How can we assist you today?`;
  }

  // RERA and legal
  if (lowerMessage.includes('rera') || lowerMessage.includes('legal') || lowerMessage.includes('documentation') || lowerMessage.includes('paperwork')) {
    return `We handle all RERA compliance and documentation:

📋 **RERA Registration**: All our agents are RERA certified
📄 **Documentation**: Complete assistance with all paperwork
🏛️ **Dubai Municipality**: Compliance with all regulations
💼 **Legal Support**: Trusted legal partners for transactions

**Required Documents**:
• Emirates ID (for residents)
• Passport & Visa (for expats)
• Salary Certificate
• Bank statements

Our team ensures all transactions are fully compliant. Need help with specific documentation?`;
  }

  // Financing and mortgage
  if (lowerMessage.includes('mortgage') || lowerMessage.includes('loan') || lowerMessage.includes('financing') || lowerMessage.includes('bank')) {
    return `We can help with Dubai property financing:

🏦 **Local Banks**: ADCB, Emirates NBD, FAB, HSBC
💰 **Down Payment**: Typically 20-25% for residents
📊 **Interest Rates**: Currently 3.5-5.5% (varies by bank)
⏱️ **Loan Tenure**: Up to 25 years

**Eligibility Requirements**:
• Minimum salary: AED 15,000/month
• UAE residence visa
• Clean credit history
• Debt-to-income ratio under 50%

Would you like us to connect you with our mortgage specialists?`;
  }

  // Areas and neighborhoods
  if (lowerMessage.includes('area') || lowerMessage.includes('neighborhood') || lowerMessage.includes('location') || lowerMessage.includes('where')) {
    return `Dubai's top residential areas each offer unique advantages:

🌆 **Downtown Dubai**: Iconic skyline, Burj Khalifa proximity
🌊 **Dubai Marina**: Waterfront living, vibrant nightlife
🌴 **Palm Jumeirah**: Exclusive island living, beach access
🏢 **Business Bay**: Central location, business district
🏘️ **Emirates Hills**: Luxury villas, golf course community
🏙️ **DIFC**: Financial district, premium apartments

Each area has different price points and lifestyles. What's most important to you - location, amenities, or investment potential?`;
  }

  // Default response
  return `Thank you for your interest in Dubai real estate! 

I'm here to help with:
• Property prices and market information
• Available properties (villas, apartments, commercial)
• Investment opportunities and ROI analysis  
• Scheduling property viewings
• RERA compliance and documentation
• Financing and mortgage assistance

For immediate assistance, please:
📱 Call: +971 55 208 9241
💬 WhatsApp: Use our widget
📧 Email: info@jayrealestate.ae

What specific information can I help you with today?`;
};

export async function POST(request: NextRequest) {
  try {
    // Clean up old sessions periodically
    if (Math.random() < 0.1) { // 10% chance to cleanup
      cleanupSessions();
    }

    // Get client IP for rate limiting
    const headersList = await headers();
    const forwarded = headersList.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { message, sessionId } = body;

    // Validate input
    const validation = validateInput(message);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Get or create session
    const session = sessionId && chatSessions.get(sessionId);
    const currentSessionId = sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    if (!session) {
      chatSessions.set(currentSessionId, {
        messages: [],
        createdAt: new Date(),
        lastActivity: new Date(),
      });
    }

    const currentSession = chatSessions.get(currentSessionId)!;

    // Add user message to session
    currentSession.messages.push({
      role: 'user',
      content: message.trim(),
      timestamp: new Date(),
    });

    // Generate response
    const response = getDubaiRealEstateResponse(message.trim());

    // Add assistant response to session
    currentSession.messages.push({
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    });

    // Update session activity
    currentSession.lastActivity = new Date();

    // Return response
    return NextResponse.json({
      response,
      sessionId: currentSessionId,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'JAY Real Estate Chat API - Use POST to send messages' },
    { status: 200 }
  );
}
