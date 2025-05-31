import React from 'react';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  variant?: 'full' | 'icon' | 'text';
}

const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  width = 120, 
  height = 40, 
  variant = 'full' 
}) => {
  if (variant === 'icon') {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Building icon representing real estate */}
        <path
          d="M8 32V16L20 8L32 16V32H24V24H16V32H8Z"
          fill="currentColor"
          className="text-blue-600"
        />
        <path
          d="M20 8L32 16V32H28V16L20 12L12 16V32H8V16L20 8Z"
          fill="currentColor"
          className="text-blue-500"
        />
        <rect x="18" y="18" width="4" height="6" fill="white" />
        <rect x="14" y="20" width="2" height="2" fill="white" />
        <rect x="24" y="20" width="2" height="2" fill="white" />
      </svg>
    );
  }

  if (variant === 'text') {
    return (
      <div className={`flex flex-col ${className}`}>
        <span className="text-2xl font-bold text-gray-900">JAY</span>
        <span className="text-sm text-gray-600 -mt-1">Real Estate</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Icon */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Modern building silhouette */}
        <defs>
          <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
        </defs>
        
        {/* Main building */}
        <path
          d="M6 36V18L20 6L34 18V36H26V26H14V36H6Z"
          fill="url(#buildingGradient)"
        />
        
        {/* Secondary building */}
        <path
          d="M26 36V20L30 16L38 20V36H34V24H30V36H26Z"
          fill="#60A5FA"
        />
        
        {/* Tertiary building */}
        <path
          d="M2 36V24L8 20L14 24V36H10V28H6V36H2Z"
          fill="#93C5FD"
        />
        
        {/* Windows */}
        <rect x="16" y="20" width="3" height="4" fill="white" rx="0.5" />
        <rect x="21" y="20" width="3" height="4" fill="white" rx="0.5" />
        <rect x="16" y="26" width="3" height="4" fill="white" rx="0.5" />
        <rect x="21" y="26" width="3" height="4" fill="white" rx="0.5" />
        
        {/* Door */}
        <rect x="18" y="30" width="4" height="6" fill="white" rx="2" />
        <circle cx="21" cy="33" r="0.5" fill="#3B82F6" />
      </svg>
      
      {/* Text */}
      <div className="flex flex-col">
        <span className="text-xl font-bold text-gray-900 leading-tight">JAY</span>
        <span className="text-sm text-gray-600 -mt-0.5 leading-tight">Real Estate</span>
      </div>
    </div>
  );
};

export default Logo;
