// WhatsApp Business Integration for JAY Real Estate
export class WhatsAppService {
  private static readonly BUSINESS_NUMBER = '+971552089241'; // JAY Real Estate WhatsApp number
  private static readonly BUSINESS_NAME = 'JAY Real Estate Dubai';

  // Generate WhatsApp URL for web or mobile
  static generateWhatsAppURL(message: string, useWeb = false): string {
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = this.BUSINESS_NUMBER.replace(/\D/g, ''); // Remove non-digits
    
    if (useWeb) {
      return `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    } else {
      return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    }
  }

  // Open WhatsApp with automatic device detection
  static openWhatsApp(message: string): void {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const url = this.generateWhatsAppURL(message, !isMobile);
    
    // Track WhatsApp interaction
    this.trackWhatsAppInteraction(message);
    
    // Open in new window/tab
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  // Track WhatsApp interactions for analytics
  private static trackWhatsAppInteraction(message: string): void {
    try {
      // Send tracking data to analytics
      fetch('/api/analytics/whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'whatsapp_click',
          message_type: this.getMessageType(message),
          timestamp: new Date().toISOString(),
          user_agent: navigator.userAgent,
          page_url: window.location.href
        }),
      }).catch(error => {
        console.error('Failed to track WhatsApp interaction:', error);
      });
    } catch (error) {
      console.error('WhatsApp tracking error:', error);
    }
  }

  // Determine message type for analytics
  private static getMessageType(message: string): string {
    if (message.includes('property inquiry')) return 'property_inquiry';
    if (message.includes('viewing')) return 'viewing_request';
    if (message.includes('valuation')) return 'valuation_request';
    if (message.includes('investment')) return 'investment_inquiry';
    return 'general_inquiry';
  }

  // Pre-defined message templates for different scenarios
  static getMessageTemplates() {
    return {
      general: `Hello ${this.BUSINESS_NAME}! 👋

I'm interested in learning more about your real estate services in Dubai. Could you please provide me with more information?

Thank you!`,

      propertyInquiry: (propertyName?: string, propertyType?: string) => `Hello ${this.BUSINESS_NAME}! 🏠

I'm interested in ${propertyName ? `the ${propertyName}` : `a ${propertyType || 'property'}`} and would like to know more details about:

• Property specifications
• Pricing information
• Viewing availability
• Payment plans

Looking forward to hearing from you!`,

      viewingRequest: (propertyName?: string) => `Hello ${this.BUSINESS_NAME}! 📅

I would like to schedule a viewing for ${propertyName ? `the ${propertyName}` : 'a property'}. 

Please let me know your available times. I'm flexible with timing and can accommodate your schedule.

Thank you!`,

      investmentInquiry: `Hello ${this.BUSINESS_NAME}! 💼

I'm interested in investment opportunities in Dubai real estate. Could you please share information about:

• Current investment projects
• Expected ROI
• Payment plans
• Market insights

Looking forward to discussing investment options!`,

      valuationRequest: `Hello ${this.BUSINESS_NAME}! 🏘️

I would like to get a property valuation for my property in Dubai. Could you please provide information about:

• Valuation process
• Required documents
• Timeline
• Fees

Thank you for your assistance!`,

      offPlanInquiry: (developerName?: string) => `Hello ${this.BUSINESS_NAME}! 🏗️

I'm interested in off-plan properties ${developerName ? `by ${developerName}` : 'in Dubai'}. Could you please provide details about:

• Available projects
• Payment plans
• Completion timelines
• Investment potential

Looking forward to your response!`,

      rentInquiry: (area?: string) => `Hello ${this.BUSINESS_NAME}! 🔑

I'm looking for rental properties ${area ? `in ${area}` : 'in Dubai'}. Could you please help me with:

• Available properties
• Rental rates
• Viewing arrangements
• Lease terms

Thank you!`,

      sellInquiry: `Hello ${this.BUSINESS_NAME}! 💰

I'm interested in selling my property in Dubai. Could you please provide information about:

• Market evaluation
• Selling process
• Commission structure
• Marketing strategy

Looking forward to working with you!`
    };
  }

  // Get appropriate message based on context
  static getContextualMessage(context: {
    type: 'general' | 'property' | 'viewing' | 'investment' | 'valuation' | 'offplan' | 'rent' | 'sell';
    propertyName?: string;
    propertyType?: string;
    area?: string;
    developer?: string;
  }): string {
    const templates = this.getMessageTemplates();

    switch (context.type) {
      case 'property':
        return templates.propertyInquiry(context.propertyName, context.propertyType);
      case 'viewing':
        return templates.viewingRequest(context.propertyName);
      case 'investment':
        return templates.investmentInquiry;
      case 'valuation':
        return templates.valuationRequest;
      case 'offplan':
        return templates.offPlanInquiry(context.developer);
      case 'rent':
        return templates.rentInquiry(context.area);
      case 'sell':
        return templates.sellInquiry;
      default:
        return templates.general;
    }
  }

  // Quick action methods for common scenarios
  static openGeneralInquiry(): void {
    const message = this.getContextualMessage({ type: 'general' });
    this.openWhatsApp(message);
  }

  static openPropertyInquiry(propertyName?: string, propertyType?: string): void {
    const message = this.getContextualMessage({ 
      type: 'property', 
      propertyName, 
      propertyType 
    });
    this.openWhatsApp(message);
  }

  static openViewingRequest(propertyName?: string): void {
    const message = this.getContextualMessage({ 
      type: 'viewing', 
      propertyName 
    });
    this.openWhatsApp(message);
  }

  static openInvestmentInquiry(): void {
    const message = this.getContextualMessage({ type: 'investment' });
    this.openWhatsApp(message);
  }

  static openValuationRequest(): void {
    const message = this.getContextualMessage({ type: 'valuation' });
    this.openWhatsApp(message);
  }

  // Utility method to check if WhatsApp is available
  static isWhatsAppAvailable(): boolean {
    // WhatsApp is available on most devices, but we can add specific checks if needed
    return true;
  }

  // Get business contact information
  static getBusinessInfo() {
    return {
      name: this.BUSINESS_NAME,
      phone: this.BUSINESS_NUMBER,
      address: 'Sultan Business Centre, Oud Metha, Office 137-A-75, Dubai, UAE',
      email: 'info@jayrealestate.ae',
      website: 'https://jayrealestate.ae',
      workingHours: 'Sunday to Thursday: 9:00 AM - 6:00 PM',
      languages: ['English', 'Arabic', 'Hindi', 'Urdu']
    };
  }
}

// WhatsApp Analytics Interface
export interface WhatsAppAnalytics {
  action: string;
  message_type: string;
  timestamp: string;
  user_agent: string;
  page_url: string;
}

// Export default instance
export default WhatsAppService;
