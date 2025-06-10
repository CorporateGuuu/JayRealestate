// Chatbot Service for JAY Real Estate Dubai
export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  options?: ChatOption[];
  metadata?: {
    intent?: string;
    confidence?: number;
    requiresHuman?: boolean;
  };
}

export interface ChatOption {
  id: string;
  label: string;
  value: string;
  action?: 'message' | 'form' | 'whatsapp' | 'callback';
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  userInfo?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  context: {
    currentIntent?: string;
    propertyInterest?: string;
    budget?: string;
    area?: string;
    leadCaptured?: boolean;
  };
  status: 'active' | 'waiting_for_human' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

export class ChatbotService {
  private static readonly BUSINESS_NAME = 'JAY Real Estate Dubai';
  private static readonly BUSINESS_HOURS = 'Sunday to Thursday: 9:00 AM - 6:00 PM';
  
  // Generate unique message ID
  static generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Generate unique session ID
  static generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Get welcome message with options
  static getWelcomeMessage(): ChatMessage {
    return {
      id: this.generateMessageId(),
      type: 'bot',
      content: `👋 Welcome to ${this.BUSINESS_NAME}! 

I'm here to help you with all your Dubai real estate needs. How can I assist you today?`,
      timestamp: new Date(),
      options: [
        {
          id: 'buy_property',
          label: '🏠 Buy Property',
          value: 'I want to buy a property',
          action: 'message'
        },
        {
          id: 'sell_property',
          label: '💰 Sell Property',
          value: 'I want to sell my property',
          action: 'message'
        },
        {
          id: 'rent_property',
          label: '🔑 Rent Property',
          value: 'I want to rent a property',
          action: 'message'
        },
        {
          id: 'investment',
          label: '📈 Investment',
          value: 'I want investment advice',
          action: 'message'
        },
        {
          id: 'valuation',
          label: '🏘️ Property Valuation',
          value: 'I need property valuation',
          action: 'message'
        },
        {
          id: 'speak_human',
          label: '👨‍💼 Speak to Agent',
          value: 'I want to speak to a human agent',
          action: 'callback'
        }
      ],
      metadata: {
        intent: 'welcome',
        confidence: 1.0
      }
    };
  }

  // Process user message and generate bot response
  static processMessage(userMessage: string, session: ChatSession): ChatMessage {
    const intent = this.detectIntent(userMessage);
    const response = this.generateResponse(intent, userMessage, session);
    
    // Update session context
    session.context.currentIntent = intent;
    session.updatedAt = new Date();

    return response;
  }

  // Detect user intent from message
  private static detectIntent(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    // Property buying intents
    if (lowerMessage.includes('buy') || lowerMessage.includes('purchase') || lowerMessage.includes('buying')) {
      return 'buy_property';
    }
    
    // Property selling intents
    if (lowerMessage.includes('sell') || lowerMessage.includes('selling')) {
      return 'sell_property';
    }
    
    // Rental intents
    if (lowerMessage.includes('rent') || lowerMessage.includes('rental') || lowerMessage.includes('lease')) {
      return 'rent_property';
    }
    
    // Investment intents
    if (lowerMessage.includes('invest') || lowerMessage.includes('investment') || lowerMessage.includes('roi')) {
      return 'investment';
    }
    
    // Valuation intents
    if (lowerMessage.includes('valuation') || lowerMessage.includes('value') || lowerMessage.includes('appraisal')) {
      return 'valuation';
    }
    
    // Viewing intents
    if (lowerMessage.includes('viewing') || lowerMessage.includes('visit') || lowerMessage.includes('see')) {
      return 'viewing';
    }
    
    // Contact/human agent intents
    if (lowerMessage.includes('agent') || lowerMessage.includes('human') || lowerMessage.includes('speak') || lowerMessage.includes('call')) {
      return 'human_agent';
    }
    
    // Greeting intents
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return 'greeting';
    }
    
    return 'general';
  }

  // Generate response based on intent
  private static generateResponse(intent: string, userMessage: string, session: ChatSession): ChatMessage {
    const responses = this.getResponseTemplates();
    const response = responses[intent as keyof typeof responses] || responses.general;
    
    return {
      id: this.generateMessageId(),
      type: 'bot',
      content: response.content,
      timestamp: new Date(),
      options: response.options as ChatOption[],
      metadata: {
        intent,
        confidence: 0.8,
        requiresHuman: (response as any).requiresHuman || false
      }
    };
  }

  // Response templates for different intents
  private static getResponseTemplates() {
    return {
      buy_property: {
        content: `Great! I'd love to help you find the perfect property in Dubai. 🏠

To provide you with the best recommendations, could you tell me:`,
        options: [
          {
            id: 'property_type',
            label: '🏢 Property Type',
            value: 'What type of property are you looking for?',
            action: 'message'
          },
          {
            id: 'budget_range',
            label: '💰 Budget Range',
            value: 'What is your budget range?',
            action: 'message'
          },
          {
            id: 'preferred_area',
            label: '📍 Preferred Area',
            value: 'Which area in Dubai do you prefer?',
            action: 'message'
          },
          {
            id: 'schedule_viewing',
            label: '📅 Schedule Viewing',
            value: 'I want to schedule property viewings',
            action: 'form'
          }
        ]
      },

      sell_property: {
        content: `I can help you sell your property in Dubai! 💰

Our team provides comprehensive selling services including market analysis, professional photography, and marketing. 

What would you like to know?`,
        options: [
          {
            id: 'property_valuation',
            label: '🏘️ Free Valuation',
            value: 'I want a free property valuation',
            action: 'form'
          },
          {
            id: 'selling_process',
            label: '📋 Selling Process',
            value: 'Tell me about the selling process',
            action: 'message'
          },
          {
            id: 'market_analysis',
            label: '📊 Market Analysis',
            value: 'I want a market analysis',
            action: 'message'
          },
          {
            id: 'speak_agent',
            label: '👨‍💼 Speak to Agent',
            value: 'I want to speak to a selling specialist',
            action: 'callback'
          }
        ]
      },

      rent_property: {
        content: `Looking for a rental property in Dubai? 🔑

I can help you find the perfect rental that fits your needs and budget.`,
        options: [
          {
            id: 'rental_budget',
            label: '💰 Budget Range',
            value: 'What is your rental budget?',
            action: 'message'
          },
          {
            id: 'rental_area',
            label: '📍 Preferred Area',
            value: 'Which area would you like to live in?',
            action: 'message'
          },
          {
            id: 'property_features',
            label: '🏠 Property Features',
            value: 'What features are important to you?',
            action: 'message'
          },
          {
            id: 'view_rentals',
            label: '👀 View Available Rentals',
            value: 'Show me available rental properties',
            action: 'message'
          }
        ]
      },

      investment: {
        content: `Dubai real estate offers excellent investment opportunities! 📈

Our investment specialists can guide you through:
• Off-plan projects with attractive payment plans
• High-yield rental properties
• Capital appreciation opportunities
• Market insights and trends`,
        options: [
          {
            id: 'investment_budget',
            label: '💰 Investment Budget',
            value: 'What is your investment budget?',
            action: 'message'
          },
          {
            id: 'investment_type',
            label: '🏗️ Investment Type',
            value: 'What type of investment interests you?',
            action: 'message'
          },
          {
            id: 'roi_info',
            label: '📊 ROI Information',
            value: 'Tell me about expected returns',
            action: 'message'
          },
          {
            id: 'investment_consultation',
            label: '👨‍💼 Free Consultation',
            value: 'I want a free investment consultation',
            action: 'form'
          }
        ]
      },

      valuation: {
        content: `I can help you get an accurate property valuation! 🏘️

Our certified valuers provide comprehensive property assessments for:
• Market value determination
• Mortgage purposes
• Investment analysis
• Insurance requirements`,
        options: [
          {
            id: 'free_valuation',
            label: '🆓 Free Online Valuation',
            value: 'I want a free online valuation',
            action: 'form'
          },
          {
            id: 'detailed_valuation',
            label: '📋 Detailed Valuation',
            value: 'I need a detailed professional valuation',
            action: 'callback'
          },
          {
            id: 'valuation_process',
            label: '❓ Valuation Process',
            value: 'How does the valuation process work?',
            action: 'message'
          }
        ]
      },

      human_agent: {
        content: `I'd be happy to connect you with one of our expert agents! 👨‍💼

Our team is available ${this.BUSINESS_HOURS}.

How would you prefer to be contacted?`,
        options: [
          {
            id: 'whatsapp_contact',
            label: '💬 WhatsApp',
            value: 'Contact me via WhatsApp',
            action: 'whatsapp'
          },
          {
            id: 'phone_callback',
            label: '📞 Phone Call',
            value: 'I want a phone callback',
            action: 'form'
          },
          {
            id: 'email_contact',
            label: '✉️ Email',
            value: 'Send me an email',
            action: 'form'
          },
          {
            id: 'schedule_meeting',
            label: '📅 Schedule Meeting',
            value: 'I want to schedule a meeting',
            action: 'form'
          }
        ],
        requiresHuman: true
      },

      greeting: {
        content: `Hello! Welcome to ${this.BUSINESS_NAME}! 👋

I'm here to help you with all your Dubai real estate needs. What can I assist you with today?`,
        options: [
          {
            id: 'buy_property',
            label: '🏠 Buy Property',
            value: 'I want to buy a property',
            action: 'message'
          },
          {
            id: 'sell_property',
            label: '💰 Sell Property',
            value: 'I want to sell my property',
            action: 'message'
          },
          {
            id: 'rent_property',
            label: '🔑 Rent Property',
            value: 'I want to rent a property',
            action: 'message'
          },
          {
            id: 'investment',
            label: '📈 Investment',
            value: 'I want investment advice',
            action: 'message'
          }
        ]
      },

      general: {
        content: `I'm here to help with your Dubai real estate needs! 🏠

I can assist you with buying, selling, renting, investments, and property valuations.

What specific information are you looking for?`,
        options: [
          {
            id: 'property_search',
            label: '🔍 Property Search',
            value: 'Help me find properties',
            action: 'message'
          },
          {
            id: 'market_info',
            label: '📊 Market Information',
            value: 'Tell me about Dubai property market',
            action: 'message'
          },
          {
            id: 'services_info',
            label: '🏢 Our Services',
            value: 'What services do you offer?',
            action: 'message'
          },
          {
            id: 'contact_agent',
            label: '👨‍💼 Contact Agent',
            value: 'I want to speak to an agent',
            action: 'callback'
          }
        ]
      }
    };
  }

  // Create new chat session
  static createSession(): ChatSession {
    return {
      id: this.generateSessionId(),
      messages: [this.getWelcomeMessage()],
      context: {},
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  // Add message to session
  static addMessage(session: ChatSession, message: ChatMessage): void {
    session.messages.push(message);
    session.updatedAt = new Date();
  }

  // Check if business hours
  static isBusinessHours(): boolean {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 6 = Saturday
    const hour = now.getHours();
    
    // Sunday (0) to Thursday (4), 9 AM to 6 PM
    return day >= 0 && day <= 4 && hour >= 9 && hour < 18;
  }

  // Get business status message
  static getBusinessStatusMessage(): string {
    if (this.isBusinessHours()) {
      return "We're currently online! Our team will respond shortly.";
    } else {
      return `We're currently offline. Our business hours are ${this.BUSINESS_HOURS}. Leave a message and we'll get back to you!`;
    }
  }
}

export default ChatbotService;
