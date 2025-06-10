'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { buttonAnimations, rippleEffect, easings, statusAnimations } from '@/lib/animations';
import { ButtonLoader } from './LoadingComponents';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void | Promise<void>;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  success?: boolean;
  error?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  ripple?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const AnimatedButton = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  success = false,
  error = false,
  className = '',
  type = 'button',
  ripple = true,
  icon,
  iconPosition = 'left'
}: AnimatedButtonProps) => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [isClicked, setIsClicked] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;

    // Create ripple effect
    if (ripple && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newRipple = { id: Date.now(), x, y };
      
      setRipples(prev => [...prev, newRipple]);
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 600);
    }

    // Handle click animation
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 150);

    // Execute onClick handler
    if (onClick) {
      await onClick();
    }
  };

  const getVariantStyles = () => {
    const variants = {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl',
      secondary: 'bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 shadow-md hover:shadow-lg',
      accent: 'bg-amber-500 hover:bg-amber-600 text-white shadow-lg hover:shadow-xl',
      ghost: 'bg-transparent hover:bg-blue-50 text-blue-600 border border-blue-200 hover:border-blue-300'
    };
    return variants[variant];
  };

  const getSizeStyles = () => {
    const sizes = {
      sm: 'px-4 py-2 text-sm min-h-[36px]',
      md: 'px-6 py-3 text-base min-h-[44px]',
      lg: 'px-8 py-4 text-lg min-h-[52px]'
    };
    return sizes[size];
  };

  const getStatusColor = () => {
    if (success) return 'bg-green-600 hover:bg-green-700';
    if (error) return 'bg-red-600 hover:bg-red-700';
    return '';
  };

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      variants={buttonAnimations}
      initial="rest"
      whileHover={!disabled && !loading ? "hover" : "rest"}
      whileTap={!disabled && !loading ? "tap" : "rest"}
      animate={success ? "success" : error ? "error" : "rest"}
      className={`
        relative overflow-hidden font-semibold rounded-xl transition-all duration-200 
        flex items-center justify-center space-x-2 focus:outline-none focus:ring-4 focus:ring-blue-500/20
        ${getVariantStyles()} 
        ${getSizeStyles()} 
        ${getStatusColor()}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {/* Ripple Effects */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute bg-white/30 rounded-full pointer-events-none"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20
            }}
            variants={rippleEffect}
            initial="initial"
            animate="animate"
            exit={{ opacity: 0 }}
          />
        ))}
      </AnimatePresence>

      {/* Button Content */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center space-x-2"
          >
            <ButtonLoader size={size === 'sm' ? 'sm' : size === 'lg' ? 'md' : 'sm'} />
            <span>Loading...</span>
          </motion.div>
        ) : success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center space-x-2"
          >
            <motion.svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </motion.svg>
            <span>Success!</span>
          </motion.div>
        ) : error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center space-x-2"
          >
            <motion.svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </motion.svg>
            <span>Error</span>
          </motion.div>
        ) : (
          <motion.div
            key="default"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center space-x-2"
          >
            {icon && iconPosition === 'left' && (
              <motion.span
                className="flex-shrink-0"
                animate={isClicked ? { scale: 0.9 } : { scale: 1 }}
                transition={{ duration: 0.1 }}
              >
                {icon}
              </motion.span>
            )}
            <span>{children}</span>
            {icon && iconPosition === 'right' && (
              <motion.span
                className="flex-shrink-0"
                animate={isClicked ? { scale: 0.9 } : { scale: 1 }}
                transition={{ duration: 0.1 }}
              >
                {icon}
              </motion.span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shine Effect on Hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6, ease: easings.easeOut }}
      />
    </motion.button>
  );
};

// Floating Action Button Component
export const FloatingActionButton = ({
  children,
  onClick,
  className = '',
  size = 'md',
  variant = 'primary'
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'accent';
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-14 h-14',
    lg: 'w-16 h-16'
  };

  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-white hover:bg-gray-50 text-blue-600 border border-blue-200',
    accent: 'bg-amber-500 hover:bg-amber-600 text-white'
  };

  return (
    <motion.button
      onClick={onClick}
      className={`
        ${sizeClasses[size]} ${variantClasses[variant]}
        rounded-full shadow-lg hover:shadow-xl transition-all duration-200
        flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-blue-500/20
        ${className}
      `}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.button>
  );
};

// Icon Button Component
export const IconButton = ({
  children,
  onClick,
  variant = 'ghost',
  size = 'md',
  className = '',
  disabled = false
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'ghost' | 'filled' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg'
  };

  const variantClasses = {
    ghost: 'hover:bg-gray-100 text-gray-600 hover:text-gray-900',
    filled: 'bg-blue-600 hover:bg-blue-700 text-white',
    outline: 'border border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-900'
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${sizeClasses[size]} ${variantClasses[variant]}
        rounded-lg transition-all duration-200 flex items-center justify-center
        focus:outline-none focus:ring-2 focus:ring-blue-500/20
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
