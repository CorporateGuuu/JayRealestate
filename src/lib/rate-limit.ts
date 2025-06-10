import { NextRequest } from 'next/server';

// In-memory store for rate limiting (in production, use Redis)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

const defaultConfig: RateLimitConfig = {
  maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '5'),
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
};

export class RateLimiter {
  
  static getClientIP(request: NextRequest): string {
    // Try to get real IP from various headers
    const forwarded = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');
    const cfConnectingIP = request.headers.get('cf-connecting-ip');
    
    if (forwarded) {
      return forwarded.split(',')[0].trim();
    }
    
    if (realIP) {
      return realIP;
    }
    
    if (cfConnectingIP) {
      return cfConnectingIP;
    }
    
    // Fallback to unknown if no IP can be determined
    return 'unknown';
  }

  static isRateLimited(
    request: NextRequest, 
    config: RateLimitConfig = defaultConfig
  ): { limited: boolean; remaining: number; resetTime: number } {
    const clientIP = this.getClientIP(request);
    const now = Date.now();
    const key = `rate_limit:${clientIP}`;
    
    // Clean up expired entries
    this.cleanupExpiredEntries(now);
    
    const existing = requestCounts.get(key);
    
    if (!existing || now > existing.resetTime) {
      // First request or window expired
      const resetTime = now + config.windowMs;
      requestCounts.set(key, { count: 1, resetTime });
      
      return {
        limited: false,
        remaining: config.maxRequests - 1,
        resetTime
      };
    }
    
    if (existing.count >= config.maxRequests) {
      // Rate limit exceeded
      return {
        limited: true,
        remaining: 0,
        resetTime: existing.resetTime
      };
    }
    
    // Increment count
    existing.count++;
    requestCounts.set(key, existing);
    
    return {
      limited: false,
      remaining: config.maxRequests - existing.count,
      resetTime: existing.resetTime
    };
  }

  static cleanupExpiredEntries(now: number): void {
    for (const [key, value] of requestCounts.entries()) {
      if (now > value.resetTime) {
        requestCounts.delete(key);
      }
    }
  }

  static getRateLimitHeaders(
    remaining: number, 
    resetTime: number
  ): Record<string, string> {
    return {
      'X-RateLimit-Limit': defaultConfig.maxRequests.toString(),
      'X-RateLimit-Remaining': remaining.toString(),
      'X-RateLimit-Reset': Math.ceil(resetTime / 1000).toString(),
      'Retry-After': Math.ceil((resetTime - Date.now()) / 1000).toString(),
    };
  }
}

// Honeypot validation
export function validateHoneypot(data: Record<string, unknown>): boolean {
  // Check for honeypot field (should be empty)
  if (data.website && typeof data.website === 'string' && data.website.length > 0) {
    console.log('Honeypot triggered:', data.website);
    return false;
  }
  return true;
}

// Basic spam detection
export function detectSpam(data: Record<string, unknown>): boolean {
  const spamKeywords = [
    'viagra', 'casino', 'lottery', 'winner', 'congratulations',
    'click here', 'free money', 'make money fast', 'work from home',
    'weight loss', 'diet pills', 'crypto', 'bitcoin investment'
  ];
  
  const getName = (val: unknown): string => typeof val === 'string' ? val : '';
  const getEmail = (val: unknown): string => typeof val === 'string' ? val : '';
  const getMessage = (val: unknown): string => typeof val === 'string' ? val : '';

  const textToCheck = `${getName(data.name)} ${getEmail(data.email)} ${getMessage(data.message)}`.toLowerCase();
  
  // Check for spam keywords
  for (const keyword of spamKeywords) {
    if (textToCheck.includes(keyword)) {
      console.log('Spam keyword detected:', keyword);
      return true;
    }
  }
  
  // Check for excessive links
  const linkCount = (textToCheck.match(/http[s]?:\/\//g) || []).length;
  if (linkCount > 2) {
    console.log('Excessive links detected:', linkCount);
    return true;
  }
  
  // Check for excessive repetition
  const words = textToCheck.split(/\s+/);
  const wordCount = new Map<string, number>();
  
  for (const word of words) {
    if (word.length > 3) {
      wordCount.set(word, (wordCount.get(word) || 0) + 1);
    }
  }
  
  for (const [word, count] of wordCount.entries()) {
    if (count > 5) {
      console.log('Excessive word repetition detected:', word, count);
      return true;
    }
  }
  
  return false;
}

// Request metadata extraction
export function extractRequestMetadata(request: NextRequest) {
  return {
    ip_address: RateLimiter.getClientIP(request),
    user_agent: request.headers.get('user-agent') || 'unknown',
    referer: request.headers.get('referer') || '',
    timestamp: new Date().toISOString(),
  };
}
