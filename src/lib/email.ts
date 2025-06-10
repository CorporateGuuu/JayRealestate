import { Resend } from 'resend';
import { ContactFormData, PropertyInquiryData } from './validation';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@jayrealestate.ae';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@jayrealestate.ae';

// Email Templates
export class EmailService {
  
  // Send contact form notification to admin
  static async sendContactFormNotification(data: ContactFormData): Promise<boolean> {
    try {
      const subjectMap = {
        buying: 'Property Buying Inquiry',
        selling: 'Property Selling Inquiry', 
        renting: 'Property Rental Inquiry',
        investment: 'Investment Consultation Request',
        valuation: 'Property Valuation Request',
        other: 'General Inquiry'
      };

      const subject = `New ${subjectMap[data.subject]} - JAY Real Estate`;
      
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">New Lead - JAY Real Estate</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Contact Form Submission</p>
          </div>
          
          <div style="padding: 30px; background: #f8fafc;">
            <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #1e293b; margin-top: 0;">Contact Details</h2>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569; width: 120px;">Name:</td>
                  <td style="padding: 8px 0; color: #1e293b;">${data.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Email:</td>
                  <td style="padding: 8px 0; color: #1e293b;">
                    <a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a>
                  </td>
                </tr>
                ${data.phone ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Phone:</td>
                  <td style="padding: 8px 0; color: #1e293b;">
                    <a href="tel:${data.phone}" style="color: #2563eb; text-decoration: none;">${data.phone}</a>
                  </td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Subject:</td>
                  <td style="padding: 8px 0; color: #1e293b;">${subjectMap[data.subject]}</td>
                </tr>
                ${data.propertyType ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Property Type:</td>
                  <td style="padding: 8px 0; color: #1e293b;">${data.propertyType}</td>
                </tr>
                ` : ''}
                ${data.budget ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Budget:</td>
                  <td style="padding: 8px 0; color: #1e293b;">AED ${data.budget}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Source:</td>
                  <td style="padding: 8px 0; color: #1e293b;">${data.source}</td>
                </tr>
              </table>
              
              <h3 style="color: #1e293b; margin-top: 25px; margin-bottom: 10px;">Message</h3>
              <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; border-left: 4px solid #2563eb;">
                <p style="margin: 0; color: #475569; line-height: 1.6;">${data.message}</p>
              </div>
            </div>
          </div>
          
          <div style="background: #1e293b; color: white; padding: 20px; text-align: center;">
            <p style="margin: 0; font-size: 14px; opacity: 0.8;">
              This email was sent from the JAY Real Estate website contact form.
            </p>
          </div>
        </div>
      `;

      await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject,
        html,
      });

      return true;
    } catch (error) {
      console.error('Error sending contact form notification:', error);
      return false;
    }
  }

  // Send auto-response to client
  static async sendContactFormAutoResponse(data: ContactFormData): Promise<boolean> {
    try {
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">Thank You for Contacting Us</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">JAY Real Estate - Dubai</p>
          </div>
          
          <div style="padding: 30px; background: #f8fafc;">
            <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #1e293b; margin-top: 0;">Dear ${data.name},</h2>
              
              <p style="color: #475569; line-height: 1.6; margin-bottom: 20px;">
                Thank you for reaching out to JAY Real Estate. We have received your inquiry and one of our Dubai real estate experts will contact you within 24 hours.
              </p>
              
              <div style="background: #dbeafe; padding: 20px; border-radius: 6px; border-left: 4px solid #2563eb; margin: 20px 0;">
                <h3 style="color: #1e40af; margin-top: 0; margin-bottom: 10px;">Your Inquiry Summary</h3>
                <p style="margin: 5px 0; color: #1e40af;"><strong>Subject:</strong> ${data.subject}</p>
                ${data.propertyType ? `<p style="margin: 5px 0; color: #1e40af;"><strong>Property Type:</strong> ${data.propertyType}</p>` : ''}
                ${data.budget ? `<p style="margin: 5px 0; color: #1e40af;"><strong>Budget Range:</strong> AED ${data.budget}</p>` : ''}
              </div>
              
              <h3 style="color: #1e293b; margin-top: 25px;">What Happens Next?</h3>
              <ul style="color: #475569; line-height: 1.6; padding-left: 20px;">
                <li>Our team will review your inquiry within 2 hours</li>
                <li>A Dubai real estate specialist will contact you within 24 hours</li>
                <li>We'll schedule a consultation at your convenience</li>
                <li>Receive personalized property recommendations</li>
              </ul>
              
              <div style="background: #f1f5f9; padding: 20px; border-radius: 6px; margin-top: 25px;">
                <h4 style="color: #1e293b; margin-top: 0;">Need Immediate Assistance?</h4>
                <p style="color: #475569; margin-bottom: 15px;">Contact us directly:</p>
                <p style="margin: 5px 0; color: #475569;">
                  📞 <a href="tel:+971552089241" style="color: #2563eb; text-decoration: none;">+971 55 208 9241</a>
                </p>
                <p style="margin: 5px 0; color: #475569;">
                  ✉️ <a href="mailto:info@jayrealestate.ae" style="color: #2563eb; text-decoration: none;">info@jayrealestate.ae</a>
                </p>
                <p style="margin: 5px 0; color: #475569;">
                  📍 Sultan Business Centre, Oud Metha, Office 137-A-75, Dubai, UAE
                </p>
              </div>
            </div>
          </div>
          
          <div style="background: #1e293b; color: white; padding: 20px; text-align: center;">
            <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: bold;">JAY Real Estate</p>
            <p style="margin: 0; font-size: 14px; opacity: 0.8;">
              Your Trusted Dubai Real Estate Partner | 5+ Years of Excellence
            </p>
          </div>
        </div>
      `;

      await resend.emails.send({
        from: FROM_EMAIL,
        to: data.email,
        subject: 'Thank you for contacting JAY Real Estate - We\'ll be in touch soon!',
        html,
      });

      return true;
    } catch (error) {
      console.error('Error sending auto-response:', error);
      return false;
    }
  }

  // Send property inquiry notification
  static async sendPropertyInquiryNotification(data: PropertyInquiryData): Promise<boolean> {
    try {
      const inquiryTypeMap = {
        viewing: 'Property Viewing Request',
        pricing: 'Pricing Information Request',
        availability: 'Availability Inquiry',
        financing: 'Financing Consultation',
        general: 'General Property Inquiry'
      };

      const subject = `New ${inquiryTypeMap[data.inquiryType]} - JAY Real Estate`;
      
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">Property Inquiry - JAY Real Estate</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">${inquiryTypeMap[data.inquiryType]}</p>
          </div>
          
          <div style="padding: 30px; background: #f8fafc;">
            <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #1e293b; margin-top: 0;">Inquiry Details</h2>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569; width: 150px;">Name:</td>
                  <td style="padding: 8px 0; color: #1e293b;">${data.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Email:</td>
                  <td style="padding: 8px 0; color: #1e293b;">
                    <a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a>
                  </td>
                </tr>
                ${data.phone ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Phone:</td>
                  <td style="padding: 8px 0; color: #1e293b;">
                    <a href="tel:${data.phone}" style="color: #2563eb; text-decoration: none;">${data.phone}</a>
                  </td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Inquiry Type:</td>
                  <td style="padding: 8px 0; color: #1e293b;">${inquiryTypeMap[data.inquiryType]}</td>
                </tr>
                ${data.propertyId ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Property ID:</td>
                  <td style="padding: 8px 0; color: #1e293b;">${data.propertyId}</td>
                </tr>
                ` : ''}
                ${data.propertyName ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Property:</td>
                  <td style="padding: 8px 0; color: #1e293b;">${data.propertyName}</td>
                </tr>
                ` : ''}
                ${data.preferredContactTime ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Preferred Time:</td>
                  <td style="padding: 8px 0; color: #1e293b;">${data.preferredContactTime}</td>
                </tr>
                ` : ''}
              </table>
              
              <h3 style="color: #1e293b; margin-top: 25px; margin-bottom: 10px;">Message</h3>
              <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; border-left: 4px solid #2563eb;">
                <p style="margin: 0; color: #475569; line-height: 1.6;">${data.message}</p>
              </div>
            </div>
          </div>
          
          <div style="background: #1e293b; color: white; padding: 20px; text-align: center;">
            <p style="margin: 0; font-size: 14px; opacity: 0.8;">
              This email was sent from the JAY Real Estate property inquiry form.
            </p>
          </div>
        </div>
      `;

      await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject,
        html,
      });

      return true;
    } catch (error) {
      console.error('Error sending property inquiry notification:', error);
      return false;
    }
  }
}
