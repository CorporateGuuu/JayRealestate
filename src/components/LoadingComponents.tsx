'use client';

import { motion } from 'framer-motion';
import { Building2, Home, MapPin } from 'lucide-react';
import { loadingSpinner, loadingDots, easings } from '@/lib/animations';

// Page Loading Component with JAY Real Estate Branding
export const PageLoader = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white z-50 flex items-center justify-center"
    >
      <div className="text-center">
        {/* JAY Logo Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: easings.easeOut }}
          className="mb-8"
        >
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-2xl">
            <span className="text-white font-bold text-2xl">JAY</span>
          </div>
        </motion.div>

        {/* Animated Text */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: easings.easeOut }}
          className="text-2xl font-bold text-gray-900 mb-2"
        >
          JAY Real Estate
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: easings.easeOut }}
          className="text-gray-600 mb-8"
        >
          Loading your premium experience...
        </motion.p>

        {/* Loading Animation */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 bg-blue-600 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
                ease: easings.easeInOut
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Button Loading Spinner
export const ButtonLoader = ({ size = 'sm', color = 'white' }: { size?: 'sm' | 'md' | 'lg', color?: string }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <motion.div
      variants={loadingSpinner}
      animate="animate"
      className={`${sizeClasses[size]} border-2 border-current border-t-transparent rounded-full`}
      style={{ color }}
    />
  );
};

// Property Card Loading Skeleton
export const PropertyCardSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      {/* Image Skeleton */}
      <div className="h-64 bg-gray-200 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>

      {/* Content Skeleton */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
                delay: 0.2
              }}
            />
          </div>
          <div className="h-6 bg-gray-200 rounded w-full relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
                delay: 0.4
              }}
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-200 rounded w-1/3 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
                delay: 0.6
              }}
            />
          </div>
          <div className="h-8 bg-gray-200 rounded w-1/4 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
                delay: 0.8
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Search Loading Component
export const SearchLoader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex items-center justify-center py-12"
    >
      <div className="text-center">
        <motion.div
          className="w-16 h-16 mx-auto mb-4 relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent"></div>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 font-medium"
        >
          Searching properties...
        </motion.p>
      </div>
    </motion.div>
  );
};

// Data Loading Component with Icons
export const DataLoader = ({ message = 'Loading...', icon = 'building' }: { message?: string, icon?: 'building' | 'home' | 'map' }) => {
  const icons = {
    building: Building2,
    home: Home,
    map: MapPin
  };

  const Icon = icons[icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center py-16"
    >
      <motion.div
        className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: easings.easeInOut
        }}
      >
        <Icon className="w-8 h-8 text-blue-600" />
      </motion.div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-600 font-medium text-lg"
      >
        {message}
      </motion.p>

      <div className="flex space-x-1 mt-4">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-2 h-2 bg-blue-600 rounded-full"
            animate={{
              y: [0, -10, 0],
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
  );
};

// Progress Bar Component
export const ProgressBar = ({ progress, label }: { progress: number, label?: string }) => {
  return (
    <div className="w-full">
      {label && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-medium text-gray-700 mb-2"
        >
          {label}
        </motion.p>
      )}
      
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-600 to-blue-700 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: easings.easeOut }}
        />
      </div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xs text-gray-500 mt-1 text-right"
      >
        {Math.round(progress)}%
      </motion.p>
    </div>
  );
};

// Inline Loading Spinner
export const InlineLoader = ({ size = 'sm' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} border-2 border-blue-600 border-t-transparent rounded-full inline-block`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  );
};

// Success/Error State Animations
export const StatusIndicator = ({ 
  status, 
  message 
}: { 
  status: 'success' | 'error' | 'loading', 
  message: string 
}) => {
  const statusConfig = {
    success: {
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      borderColor: 'border-green-200'
    },
    error: {
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      borderColor: 'border-red-200'
    },
    loading: {
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      borderColor: 'border-blue-200'
    }
  };

  const config = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      className={`flex items-center space-x-3 p-4 rounded-lg border ${config.bgColor} ${config.borderColor}`}
    >
      {status === 'loading' && <InlineLoader size="sm" />}
      {status === 'success' && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center"
        >
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </motion.div>
      )}
      {status === 'error' && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center"
        >
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </motion.div>
      )}
      <span className={`font-medium ${config.color}`}>{message}</span>
    </motion.div>
  );
};
