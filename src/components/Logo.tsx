import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  variant?: 'full' | 'icon' | 'text';
}

const Logo: React.FC<LogoProps> = ({
  className = '',
  width = 60,
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
    <div className={`flex items-center ${className}`}>
      {/* JAY Real Estate Logo from Figma */}
      <Image
        src="/jay-logo.svg"
        alt="JAY Real Estate"
        width={width}
        height={height}
        className="object-contain"
        priority
      />
    </div>
  );
};

export default Logo;
