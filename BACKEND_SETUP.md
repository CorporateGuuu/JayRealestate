# JAY Real Estate - Backend Setup Guide

This guide will help you set up the enhanced contact form backend integration for the JAY Real Estate website.

## 🚀 Quick Start

### 1. Environment Variables Setup

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Fill in your actual values in `.env.local`:

#### Required Services:

**Resend (Email Service)**
- Sign up at [resend.com](https://resend.com)
- Get your API key from the dashboard
- Add your domain for better deliverability

**Supabase (Database)**
- Create a project at [supabase.com](https://supabase.com)
- Get your project URL and keys from Settings > API

### 2. Database Setup

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `database/schema.sql`
4. Run the SQL to create tables and indexes

### 3. Email Configuration

#### Domain Setup (Recommended)
1. Add your domain to Resend
2. Configure DNS records for better deliverability
3. Use your domain email (e.g., `noreply@jayrealestate.ae`)

#### Email Templates
The system includes professional email templates for:
- Admin notifications
- Client auto-responses
- Property inquiry notifications

### 4. Testing the Setup

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/contact` page
3. Fill out and submit the contact form
4. Check:
   - Database for new lead entry
   - Admin email for notification
   - Client email for auto-response

## 📧 Email Service Details

### Resend Configuration
- **Recommended**: Professional email service with high deliverability
- **Features**: Templates, analytics, webhooks
- **Pricing**: Free tier available (100 emails/day)

### Alternative Email Services
If you prefer different email services, modify `src/lib/email.ts`:

**Nodemailer (SMTP)**
```typescript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  host: 'your-smtp-host',
  port: 587,
  secure: false,
  auth: {
    user: 'your-email',
    pass: 'your-password'
  }
});
```

**SendGrid**
```typescript
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
```

## 🗄️ Database Details

### Supabase Setup
1. **Row Level Security**: Enabled for data protection
2. **Policies**: Service role has full access, authenticated users read-only
3. **Indexes**: Optimized for common queries
4. **Triggers**: Auto-update timestamps

### Lead Data Structure
```typescript
interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  property_type?: string;
  budget?: string;
  message: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
  // ... additional fields
}
```

### Alternative Databases
To use different databases, modify `src/lib/database.ts`:

**MongoDB**
```typescript
import { MongoClient } from 'mongodb';
```

**PostgreSQL (Direct)**
```typescript
import { Pool } from 'pg';
```

## 🔒 Security Features

### Rate Limiting
- **Default**: 5 requests per 15 minutes per IP
- **Configurable**: Via environment variables
- **Storage**: In-memory (use Redis for production)

### Spam Protection
1. **Honeypot Fields**: Hidden fields to catch bots
2. **Content Analysis**: Keyword and pattern detection
3. **Rate Limiting**: Prevents abuse
4. **Validation**: Server-side schema validation

### Data Protection
- Input sanitization
- SQL injection prevention
- XSS protection
- CORS configuration

## 📊 Monitoring & Analytics

### Built-in Features
- Lead source tracking
- Conversion rate analysis
- Email delivery status
- Error logging

### Database Views
- `lead_stats`: Overall statistics
- `source_stats`: Source performance

### Recommended Monitoring
- **Sentry**: Error tracking
- **LogRocket**: User session recording
- **Google Analytics**: Form conversion tracking

## 🚀 Production Deployment

### Environment Variables
Ensure all production environment variables are set:
```bash
RESEND_API_KEY=your_production_key
NEXT_PUBLIC_SUPABASE_URL=your_production_url
SUPABASE_SERVICE_ROLE_KEY=your_production_key
FROM_EMAIL=noreply@jayrealestate.ae
ADMIN_EMAIL=info@jayrealestate.ae
```

### Performance Optimization
1. **Database**: Enable connection pooling
2. **Email**: Use batch sending for multiple recipients
3. **Rate Limiting**: Implement Redis for distributed systems
4. **Caching**: Cache form validation schemas

### Backup Strategy
1. **Database**: Automated Supabase backups
2. **Email Templates**: Version control
3. **Configuration**: Environment variable backup

## 🔧 Troubleshooting

### Common Issues

**Email Not Sending**
- Check API key validity
- Verify domain configuration
- Check rate limits

**Database Connection Failed**
- Verify Supabase credentials
- Check network connectivity
- Review RLS policies

**Form Validation Errors**
- Check schema definitions
- Verify required fields
- Review error messages

**Rate Limiting Issues**
- Adjust limits in environment variables
- Implement IP whitelisting for testing
- Use Redis for production

### Debug Mode
Enable detailed logging by setting:
```bash
NODE_ENV=development
```

### Support
For technical support:
- Check console logs for detailed errors
- Review Supabase dashboard for database issues
- Monitor Resend dashboard for email delivery

## 📈 Future Enhancements

### Planned Features
1. **Admin Dashboard**: Lead management interface
2. **CRM Integration**: Salesforce, HubSpot connectivity
3. **WhatsApp Integration**: Direct messaging
4. **Calendar Booking**: Appointment scheduling
5. **SMS Notifications**: Text message alerts

### Scalability Considerations
- Redis for distributed rate limiting
- Queue system for email processing
- CDN for static assets
- Load balancing for high traffic
