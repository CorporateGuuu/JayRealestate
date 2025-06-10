import { z } from 'zod';

// Contact Form Schema
export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  
  email: z.string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  
  phone: z.string()
    .optional()
    .refine((val) => !val || /^[\+]?[1-9][\d]{0,15}$/.test(val), {
      message: 'Please enter a valid phone number'
    }),
  
  subject: z.enum([
    'buying',
    'selling', 
    'renting',
    'investment',
    'valuation',
    'other'
  ], {
    required_error: 'Please select a subject'
  }),
  
  propertyType: z.enum([
    'house',
    'condo',
    'villa',
    'townhouse',
    'commercial',
    ''
  ]).optional(),
  
  budget: z.enum([
    '0-2m',
    '2m-5m',
    '5m-10m',
    '10m-20m',
    '20m+',
    ''
  ]).optional(),
  
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
  
  source: z.string().optional().default('contact-page'),
  
  // Honeypot field for spam protection
  website: z.string().max(0, 'Spam detected').optional(),
});

// Property Inquiry Schema
export const propertyInquirySchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  
  email: z.string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  
  phone: z.string()
    .optional()
    .refine((val) => !val || /^[\+]?[1-9][\d]{0,15}$/.test(val), {
      message: 'Please enter a valid phone number'
    }),
  
  propertyId: z.string().optional(),
  propertyName: z.string().optional(),
  
  inquiryType: z.enum([
    'viewing',
    'pricing',
    'availability',
    'financing',
    'general'
  ]),
  
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
  
  preferredContactTime: z.enum([
    'morning',
    'afternoon',
    'evening',
    'anytime'
  ]).optional(),
  
  source: z.string().optional().default('property-inquiry'),
  
  // Honeypot field for spam protection
  website: z.string().max(0, 'Spam detected').optional(),
});

// Newsletter Subscription Schema
export const newsletterSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .optional(),
  
  interests: z.array(z.enum([
    'buying',
    'selling',
    'renting',
    'investment',
    'market-updates'
  ])).optional(),
  
  source: z.string().optional().default('newsletter'),
  
  // Honeypot field for spam protection
  website: z.string().max(0, 'Spam detected').optional(),
});

// Callback Request Schema
export const callbackSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number'),
  
  preferredTime: z.enum([
    'morning',
    'afternoon',
    'evening'
  ]),
  
  reason: z.string()
    .min(5, 'Please provide a brief reason for the callback')
    .max(500, 'Reason must be less than 500 characters'),
  
  source: z.string().optional().default('callback-request'),
  
  // Honeypot field for spam protection
  website: z.string().max(0, 'Spam detected').optional(),
});

// Frontend form schemas (without source field)
export const contactFormFrontendSchema = contactFormSchema.omit({ source: true, website: true });
export const propertyInquiryFrontendSchema = propertyInquirySchema.omit({ source: true, website: true });

// Type exports
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type ContactFormFrontendData = z.infer<typeof contactFormFrontendSchema>;
export type PropertyInquiryData = z.infer<typeof propertyInquirySchema>;
export type PropertyInquiryFrontendData = z.infer<typeof propertyInquiryFrontendSchema>;
export type NewsletterData = z.infer<typeof newsletterSchema>;
export type CallbackData = z.infer<typeof callbackSchema>;
