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
      {/* Professional JAY Real Estate Logo */}
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <defs>
          <linearGradient id="jayGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>

        {/* Background Circle */}
        <circle cx="24" cy="24" r="23" fill="url(#jayGradient)" stroke="#1e3a8a" strokeWidth="2"/>

        {/* Modern Skyline Silhouette */}
        <g transform="translate(8, 12)">
          {/* Building 1 - Tallest */}
          <rect x="12" y="4" width="8" height="20" fill="white" rx="1"/>
          <rect x="14" y="6" width="1.5" height="1.5" fill="url(#jayGradient)" rx="0.2"/>
          <rect x="16.5" y="6" width="1.5" height="1.5" fill="url(#jayGradient)" rx="0.2"/>
          <rect x="14" y="8.5" width="1.5" height="1.5" fill="url(#jayGradient)" rx="0.2"/>
          <rect x="16.5" y="8.5" width="1.5" height="1.5" fill="url(#jayGradient)" rx="0.2"/>
          <rect x="14" y="11" width="1.5" height="1.5" fill="url(#jayGradient)" rx="0.2"/>
          <rect x="16.5" y="11" width="1.5" height="1.5" fill="url(#jayGradient)" rx="0.2"/>

          {/* Building 2 - Medium */}
          <rect x="4" y="8" width="6" height="16" fill="white" rx="1"/>
          <rect x="5.5" y="10" width="1" height="1" fill="url(#jayGradient)" rx="0.2"/>
          <rect x="7.5" y="10" width="1" height="1" fill="url(#jayGradient)" rx="0.2"/>
          <rect x="5.5" y="12" width="1" height="1" fill="url(#jayGradient)" rx="0.2"/>
          <rect x="7.5" y="12" width="1" height="1" fill="url(#jayGradient)" rx="0.2"/>

          {/* Building 3 - Short */}
          <rect x="22" y="12" width="6" height="12" fill="white" rx="1"/>
          <rect x="23.5" y="14" width="1" height="1" fill="url(#jayGradient)" rx="0.2"/>
          <rect x="25.5" y="14" width="1" height="1" fill="url(#jayGradient)" rx="0.2"/>
          <rect x="23.5" y="16" width="1" height="1" fill="url(#jayGradient)" rx="0.2"/>
          <rect x="25.5" y="16" width="1" height="1" fill="url(#jayGradient)" rx="0.2"/>

          {/* Accent Element - Golden Key */}
          <g transform="translate(14, 18)">
            <circle cx="2" cy="2" r="1.5" fill="none" stroke="url(#accentGradient)" strokeWidth="0.8"/>
            <rect x="3.2" y="1.7" width="2" height="0.6" fill="url(#accentGradient)" rx="0.3"/>
            <rect x="4.5" y="1.2" width="0.4" height="0.6" fill="url(#accentGradient)"/>
            <rect x="4.5" y="2.2" width="0.4" height="0.6" fill="url(#accentGradient)"/>
          </g>
        </g>
      </svg>

      {/* Professional Text Logo */}
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-gray-900 leading-tight tracking-wide">JAY</span>
        <span className="text-sm font-medium text-gray-600 -mt-1 leading-tight tracking-wider uppercase">Real Estate</span>
      </div>
    </div>
  );
};

export default Logo;
