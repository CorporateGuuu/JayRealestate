'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Tablet, Smartphone, Eye } from 'lucide-react';

interface ResponsiveTestGridProps {
  showInProduction?: boolean;
}

const ResponsiveTestGrid = ({ showInProduction = false }: ResponsiveTestGridProps) => {
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  // Hide in production unless explicitly shown
  if (process.env.NODE_ENV === 'production' && !showInProduction) {
    return null;
  }

  const breakpoints = [
    { name: 'Mobile XS', width: 320, icon: Smartphone, color: 'bg-red-500' },
    { name: 'Mobile SM', width: 375, icon: Smartphone, color: 'bg-orange-500' },
    { name: 'Mobile LG', width: 414, icon: Smartphone, color: 'bg-yellow-500' },
    { name: 'Tablet SM', width: 768, icon: Tablet, color: 'bg-green-500' },
    { name: 'Tablet LG', width: 834, icon: Tablet, color: 'bg-blue-500' },
    { name: 'Desktop SM', width: 1024, icon: Monitor, color: 'bg-indigo-500' },
    { name: 'Desktop MD', width: 1440, icon: Monitor, color: 'bg-purple-500' },
    { name: 'Desktop LG', width: 1920, icon: Monitor, color: 'bg-pink-500' },
  ];

  const getCurrentBreakpoint = () => {
    const width = screenSize.width;
    if (width < 375) return breakpoints[0];
    if (width < 414) return breakpoints[1];
    if (width < 768) return breakpoints[2];
    if (width < 834) return breakpoints[3];
    if (width < 1024) return breakpoints[4];
    if (width < 1440) return breakpoints[5];
    if (width < 1920) return breakpoints[6];
    return breakpoints[7];
  };

  const currentBreakpoint = getCurrentBreakpoint();

  const testElements = [
    {
      name: 'Widget Positioning',
      tests: [
        'WhatsApp widget bottom-right',
        'Chatbot widget bottom-left',
        'No overlap between widgets',
        'Proper z-index layering'
      ]
    },
    {
      name: 'Container Alignment',
      tests: [
        'Content centered with container-custom',
        'Proper horizontal padding',
        'Max-width constraints working',
        'Responsive spacing applied'
      ]
    },
    {
      name: 'Touch Targets',
      tests: [
        'Buttons minimum 44px height',
        'Interactive elements accessible',
        'Proper spacing between targets',
        'Hover states working'
      ]
    },
    {
      name: 'Grid Systems',
      tests: [
        'Property cards responsive grid',
        'Proper gap spacing',
        'Column count adjusts correctly',
        'Content doesn\'t overflow'
      ]
    }
  ];

  if (!isVisible) {
    return (
      <motion.button
        onClick={() => setIsVisible(true)}
        className="fixed top-4 left-4 z-[10000] bg-gray-900 text-white p-2 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Eye className="w-5 h-5" />
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      className="fixed top-4 left-4 z-[10000] bg-white rounded-lg shadow-2xl border border-gray-200 p-4 max-w-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900">Responsive Test</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>

      {/* Current Breakpoint */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <div className={`w-3 h-3 rounded-full ${currentBreakpoint.color}`}></div>
          <span className="font-semibold text-sm">{currentBreakpoint.name}</span>
          <currentBreakpoint.icon className="w-4 h-4 text-gray-600" />
        </div>
        <div className="text-xs text-gray-600">
          {screenSize.width} × {screenSize.height}px
        </div>
      </div>

      {/* Breakpoint Indicators */}
      <div className="mb-4">
        <div className="text-xs font-semibold text-gray-700 mb-2">Breakpoints</div>
        <div className="grid grid-cols-4 gap-1">
          {breakpoints.map((bp) => (
            <div
              key={bp.name}
              className={`p-1 rounded text-xs text-center ${
                screenSize.width >= bp.width
                  ? `${bp.color} text-white`
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {bp.width}
            </div>
          ))}
        </div>
      </div>

      {/* Test Checklist */}
      <div className="space-y-3">
        {testElements.map((section) => (
          <div key={section.name}>
            <div className="text-xs font-semibold text-gray-700 mb-1">
              {section.name}
            </div>
            <div className="space-y-1">
              {section.tests.map((test) => (
                <div key={test} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-xs text-gray-600">{test}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Widget Position Indicators */}
      <div className="mt-4 pt-3 border-t border-gray-200">
        <div className="text-xs font-semibold text-gray-700 mb-2">Widget Zones</div>
        <div className="relative bg-gray-100 rounded h-20 border">
          <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full"></div>
          <div className="absolute bottom-1 left-1 w-3 h-3 bg-blue-500 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs text-gray-500">
            Content Area
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Chatbot</span>
          <span>WhatsApp</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ResponsiveTestGrid;
