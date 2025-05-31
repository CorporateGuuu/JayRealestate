'use client';

import { useState, useEffect } from 'react';
import { MapPin, ExternalLink } from 'lucide-react';
// import { MapSkeleton } from './LazyWrapper';

interface InteractiveMapProps {
  className?: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ className = '' }) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  // const [isVisible, setIsVisible] = useState(false);
  const [mapError, setMapError] = useState(false);

  // Office location coordinates (Sultan Business Centre, Oud Metha, Dubai)
  const officeLocation = {
    lat: 25.2285, // Approximate coordinates for Oud Metha area
    lng: 55.3094,
    address: 'Sultan Business Centre, Oud Metha, Office Number: 137-A-75, Dubai, UAE'
  };

  const handleGetDirections = () => {
    try {
      // Try to open in Google Maps app first (mobile), then fallback to web
      const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(officeLocation.address)}`;
      const appleMapsUrl = `http://maps.apple.com/?daddr=${encodeURIComponent(officeLocation.address)}`;
      
      // Detect if user is on iOS
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      
      if (isIOS) {
        // Try Apple Maps first on iOS
        window.open(appleMapsUrl, '_blank');
      } else {
        // Use Google Maps for other platforms
        window.open(googleMapsUrl, '_blank');
      }
    } catch (error) {
      console.error('Error opening maps:', error);
      // Fallback: copy address to clipboard
      navigator.clipboard?.writeText(officeLocation.address).then(() => {
        alert('Address copied to clipboard: ' + officeLocation.address);
      }).catch(() => {
        alert('Please navigate to: ' + officeLocation.address);
      });
    }
  };

  const handleViewOnMap = () => {
    try {
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(officeLocation.address)}`;
      window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Error opening map:', error);
      setMapError(true);
    }
  };

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative bg-gray-100 rounded-2xl overflow-hidden ${className}`}>
      {/* Map Container */}
      <div className="relative h-80 bg-gradient-to-br from-blue-100 to-blue-200">
        {!mapLoaded ? (
          // Loading state
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading map...</p>
            </div>
          </div>
        ) : mapError ? (
          // Error state
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-6">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Unable to load interactive map</p>
              <button
                onClick={handleViewOnMap}
                className="btn-primary text-sm"
              >
                View on Google Maps
              </button>
            </div>
          </div>
        ) : (
          // Map placeholder with office location
          <div className="relative h-full">
            {/* Background map-like pattern */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
                {/* Grid pattern to simulate map */}
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3B82F6" strokeWidth="1" opacity="0.3"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Simulated roads */}
                <path d="M0 150 L400 150" stroke="#60A5FA" strokeWidth="3" opacity="0.6" />
                <path d="M200 0 L200 300" stroke="#60A5FA" strokeWidth="3" opacity="0.6" />
                <path d="M100 75 L300 225" stroke="#93C5FD" strokeWidth="2" opacity="0.4" />
              </svg>
            </div>

            {/* Office location marker */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                {/* Pulsing circle */}
                <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75 w-6 h-6"></div>
                {/* Main marker */}
                <div className="relative bg-red-600 rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                {/* Info popup */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-3 min-w-max">
                  <div className="text-sm font-semibold text-gray-900">JAY Real Estate</div>
                  <div className="text-xs text-gray-600">Sultan Business Centre</div>
                  <div className="text-xs text-gray-600">Oud Metha, Dubai</div>
                  {/* Arrow pointing down */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                </div>
              </div>
            </div>

            {/* Map controls overlay */}
            <div className="absolute top-4 right-4 space-y-2">
              <button
                onClick={handleViewOnMap}
                className="bg-white hover:bg-gray-50 p-2 rounded-lg shadow-md transition-colors duration-200 group"
                title="View on Google Maps"
              >
                <ExternalLink className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Map footer with address and actions */}
      <div className="p-4 bg-white">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">Our Office Location</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {officeLocation.address}
            </p>
          </div>
          <button
            onClick={handleGetDirections}
            className="ml-4 btn-primary text-sm py-2 px-4 flex items-center space-x-2"
          >
            <MapPin className="w-4 h-4" />
            <span>Get Directions</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
