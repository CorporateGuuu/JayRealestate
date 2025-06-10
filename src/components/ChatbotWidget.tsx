'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  X,
  Send,
  User,
  Bot,
  Phone,
  Mail,
  Clock,
  Minimize2
} from 'lucide-react';
import ChatbotService, { ChatSession, ChatMessage } from '@/lib/chatbot';
import WhatsAppService from '@/lib/whatsapp';
import {
  widgetBounce,
  widgetPulse,
  buttonAnimations,
  dropdownReveal,
  staggerContainer,
  staggerItem,
  easings
} from '@/lib/animations';

interface ChatbotWidgetProps {
  className?: string;
}

const ChatbotWidget = ({ className = '' }: ChatbotWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [session, setSession] = useState<ChatSession | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize chat session
  useEffect(() => {
    if (isOpen && !session) {
      const newSession = ChatbotService.createSession();
      setSession(newSession);
    }
  }, [isOpen, session]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [session?.messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !session) return;

    const userMessage: ChatMessage = {
      id: ChatbotService.generateMessageId(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    // Add user message
    const updatedSession = { ...session };
    ChatbotService.addMessage(updatedSession, userMessage);
    setSession(updatedSession);
    setInputMessage('');

    // Show typing indicator
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse = ChatbotService.processMessage(inputMessage, updatedSession);
      ChatbotService.addMessage(updatedSession, botResponse);
      setSession({ ...updatedSession });
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleOptionClick = (option: { id: string; label: string; value: string; action?: string }) => {
    if (option.action === 'whatsapp') {
      WhatsAppService.openGeneralInquiry();
      return;
    }

    if (option.action === 'form' || option.action === 'callback') {
      setShowContactForm(true);
      return;
    }

    // Send as regular message
    setInputMessage(option.value);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleContactFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Submit contact form data
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...contactInfo,
          subject: 'chatbot',
          source: 'chatbot-widget'
        }),
      });

      if (response.ok) {
        // Add success message to chat
        const successMessage: ChatMessage = {
          id: ChatbotService.generateMessageId(),
          type: 'bot',
          content: `Thank you ${contactInfo.name}! Your information has been received. Our team will contact you within 24 hours. 

Is there anything else I can help you with?`,
          timestamp: new Date()
        };

        if (session) {
          ChatbotService.addMessage(session, successMessage);
          setSession({ ...session });
        }

        setShowContactForm(false);
        setContactInfo({ name: '', email: '', phone: '', message: '' });
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  if (!isOpen) {
    return (
      <motion.div
        className={`widget-bottom-left ${className}`}
        variants={widgetBounce}
        initial="initial"
        animate="animate"
      >
        <motion.button
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 sm:w-14 sm:h-14 touch-target-lg bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center relative overflow-hidden"
          variants={buttonAnimations}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
        >
          <MessageCircle className="w-6 h-6" />

          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6, ease: easings.easeOut }}
          />
        </motion.button>

        {/* Enhanced Pulse animation */}
        <motion.div
          className="absolute inset-0 w-12 h-12 sm:w-14 sm:h-14 bg-blue-400 rounded-full -z-10"
          variants={widgetPulse}
          animate="animate"
        />

        {/* Secondary pulse ring */}
        <motion.div
          className="absolute inset-0 w-12 h-12 sm:w-14 sm:h-14 bg-blue-300 rounded-full -z-20"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: easings.easeInOut,
            delay: 0.5
          }}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`widget-bottom-left ${className}`}
      variants={widgetBounce}
      initial="initial"
      animate="animate"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          height: isMinimized ? 60 : 500
        }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ duration: 0.3, ease: easings.easeOut }}
        className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 max-w-[calc(100vw-2rem)] sm:max-w-80 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">JAY Assistant</h3>
              <p className="text-xs text-blue-100">
                {ChatbotService.isBusinessHours() ? 'Online now' : 'Offline'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-blue-500 rounded"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-blue-500 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Contact Form Modal */}
            <AnimatePresence>
              {showContactForm && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white z-10 p-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Contact Information</h3>
                    <button
                      onClick={() => setShowContactForm(false)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleContactFormSubmit} className="space-y-3">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={contactInfo.name}
                      onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                      placeholder="How can we help you?"
                      value={contactInfo.message}
                      onChange={(e) => setContactInfo({ ...contactInfo, message: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Submit
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages */}
            <motion.div
              className="h-80 overflow-y-auto p-4 space-y-4"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {session?.messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  variants={staggerItem}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    <motion.div
                      className={`px-3 py-2 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </motion.div>
                    <p className="text-xs text-gray-500 mt-1 px-1">
                      {formatTime(message.timestamp)}
                    </p>

                    {/* Options */}
                    {message.options && message.options.length > 0 && (
                      <motion.div
                        className="mt-2 space-y-1"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                      >
                        {message.options.map((option, optionIndex) => (
                          <motion.button
                            key={option.id}
                            variants={staggerItem}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: optionIndex * 0.1 }}
                            onClick={() => handleOptionClick(option)}
                            className="block w-full text-left px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            whileHover={{ scale: 1.02, backgroundColor: '#f9fafb' }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {option.label}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </div>

                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    message.type === 'user' ? 'order-1 mr-2 bg-blue-100' : 'order-2 ml-2 bg-gray-200'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-3 h-3 text-blue-600" />
                    ) : (
                      <Bot className="w-3 h-3 text-gray-600" />
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Enhanced Typing indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    className="flex justify-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center space-x-2">
                      <motion.div
                        className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <Bot className="w-3 h-3 text-gray-600" />
                      </motion.div>
                      <motion.div
                        className="bg-gray-100 rounded-2xl px-3 py-2"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex space-x-1">
                          {[0, 1, 2].map((index) => (
                            <motion.div
                              key={index}
                              className="w-2 h-2 bg-gray-400 rounded-full"
                              animate={{
                                y: [0, -4, 0],
                                opacity: [0.5, 1, 0.5]
                              }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: index * 0.2,
                                ease: easings.easeInOut
                              }}
                            />
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </motion.div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center justify-center mt-2 text-xs text-gray-500">
                <Clock className="w-3 h-3 mr-1" />
                {ChatbotService.getBusinessStatusMessage()}
              </div>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ChatbotWidget;
