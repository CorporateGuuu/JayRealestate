'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Phone, Clock, MapPin, Users } from 'lucide-react';
import WhatsAppService from '@/lib/whatsapp';
import {
  widgetBounce,
  widgetPulse,
  buttonAnimations,
  dropdownReveal,
  easings
} from '@/lib/animations';

interface WhatsAppButtonProps {
  context?: {
    type?: 'general' | 'property' | 'viewing' | 'investment' | 'valuation' | 'offplan' | 'rent' | 'sell';
    propertyName?: string;
    propertyType?: string;
    area?: string;
    developer?: string;
  };
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'floating' | 'inline' | 'minimal';
  showTooltip?: boolean;
}

const WhatsAppButton = ({ 
  context = { type: 'general' }, 
  className = '',
  size = 'md',
  variant = 'floating',
  showTooltip = true
}: WhatsAppButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Responsive size classes for proper mobile/desktop sizing
  const sizeClasses = {
    sm: 'w-10 h-10 sm:w-12 sm:h-12',
    md: 'w-12 h-12 sm:w-14 sm:h-14',
    lg: 'w-14 h-14 sm:w-16 sm:h-16'
  };

  const iconSizes = {
    sm: 'w-4 h-4 sm:w-5 sm:h-5',
    md: 'w-5 h-5 sm:w-6 sm:h-6',
    lg: 'w-6 h-6 sm:w-7 sm:h-7'
  };

  const handleWhatsAppClick = async (messageType?: 'general' | 'property' | 'viewing' | 'investment' | 'valuation' | 'offplan' | 'rent' | 'sell') => {
    setIsLoading(true);
    
    try {
      let message: string;
      
      if (messageType) {
        // Use specific message type
        message = WhatsAppService.getContextualMessage({ 
          type: messageType as any,
          ...context 
        });
      } else {
        // Use context-based message
        message = WhatsAppService.getContextualMessage({
          type: context.type || 'general',
          ...context
        });
      }

      WhatsAppService.openWhatsApp(message);
      setShowQuickActions(false);
    } catch (error) {
      console.error('WhatsApp error:', error);
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  const quickActions: Array<{
    id: 'general' | 'property' | 'viewing' | 'investment';
    label: string;
    icon: any;
    color: string;
  }> = [
    {
      id: 'general',
      label: 'General Inquiry',
      icon: MessageCircle,
      color: 'bg-blue-500'
    },
    {
      id: 'property',
      label: 'Property Info',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      id: 'viewing',
      label: 'Schedule Viewing',
      icon: Clock,
      color: 'bg-purple-500'
    },
    {
      id: 'investment',
      label: 'Investment',
      icon: MapPin,
      color: 'bg-orange-500'
    }
  ];

  const businessInfo = WhatsAppService.getBusinessInfo();

  if (variant === 'minimal') {
    return (
      <button
        onClick={() => handleWhatsAppClick()}
        disabled={isLoading}
        className={`inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 ${className}`}
      >
        <MessageCircle className="w-4 h-4 mr-2" />
        WhatsApp
        {isLoading && (
          <div className="ml-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        )}
      </button>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={() => handleWhatsAppClick()}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          disabled={isLoading}
          className="flex items-center justify-center w-full px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all duration-200 disabled:opacity-50 shadow-lg hover:shadow-xl"
        >
          <MessageCircle className={iconSizes[size]} />
          <span className="ml-3 font-medium">Chat on WhatsApp</span>
          {isLoading && (
            <div className="ml-3 w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          )}
        </button>

        {showTooltip && isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap z-50"
          >
            Chat with {businessInfo.name}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </motion.div>
        )}
      </div>
    );
  }

  // Floating variant (default) - Bottom-right positioning with responsive spacing
  return (
    <motion.div
      className={`widget-bottom-right ${className}`}
      variants={widgetBounce}
      initial="initial"
      animate="animate"
    >
      {/* Quick Actions Menu */}
      <AnimatePresence>
        {showQuickActions && (
          <motion.div
            variants={dropdownReveal}
            initial="closed"
            animate="open"
            exit="closed"
            className="absolute bottom-16 sm:bottom-20 right-0 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 min-w-64 max-w-[calc(100vw-2rem)] sm:max-w-80"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Quick Actions</h3>
              <button
                onClick={() => setShowQuickActions(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <div className="space-y-2">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    onClick={() => handleWhatsAppClick(action.id)}
                    className="w-full flex items-center p-3 hover:bg-gray-50 rounded-xl transition-colors duration-200"
                  >
                    <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center mr-3`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{action.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center text-xs text-gray-500">
                <Phone className="w-3 h-3 mr-1" />
                {businessInfo.phone}
              </div>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <Clock className="w-3 h-3 mr-1" />
                {businessInfo.workingHours}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main WhatsApp Button */}
      <motion.button
        onClick={() => {
          if (showQuickActions) {
            setShowQuickActions(false);
          } else {
            handleWhatsAppClick();
          }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onContextMenu={(e) => {
          e.preventDefault();
          setShowQuickActions(!showQuickActions);
        }}
        disabled={isLoading}
        className={`${sizeClasses[size]} touch-target-lg bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center disabled:opacity-50 relative overflow-hidden`}
        variants={buttonAnimations}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
      >
        {isLoading ? (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <MessageCircle className={iconSizes[size]} />
        )}
      </motion.button>

      {/* Tooltip */}
      {showTooltip && isHovered && !showQuickActions && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          className="absolute right-full top-1/2 transform -translate-y-1/2 mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap"
        >
          <div>Chat with us on WhatsApp</div>
          <div className="text-xs text-gray-300 mt-1">Right-click for options</div>
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-gray-900"></div>
        </motion.div>
      )}

      {/* Enhanced Pulse animation for attention */}
      <motion.div
        className={`absolute inset-0 ${sizeClasses[size]} bg-green-400 rounded-full -z-10`}
        variants={widgetPulse}
        animate="animate"
      />

      {/* Secondary pulse ring */}
      <motion.div
        className={`absolute inset-0 ${sizeClasses[size]} bg-green-300 rounded-full -z-20`}
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
};

export default WhatsAppButton;
