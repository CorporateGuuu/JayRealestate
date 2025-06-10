'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  X,
  Download,
  Share2,
  Maximize2,
  Grid3X3,
  Play,
  Pause,
  RotateCcw,
  RotateCw
} from 'lucide-react';

interface PropertyGalleryProps {
  images: string[];
  propertyName: string;
  isModal?: boolean;
  onClose?: () => void;
  onViewGallery?: () => void;
}

const PropertyGallery = ({ 
  images, 
  propertyName, 
  isModal = false, 
  onClose, 
  onViewGallery 
}: PropertyGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isSlideshow, setIsSlideshow] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(true);

  // Auto slideshow
  useEffect(() => {
    if (isSlideshow && isModal) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isSlideshow, isModal, images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (isModal) {
      const handleKeyPress = (e: KeyboardEvent) => {
        switch (e.key) {
          case 'ArrowLeft':
            goToPrevious();
            break;
          case 'ArrowRight':
            goToNext();
            break;
          case 'Escape':
            onClose?.();
            break;
          case ' ':
            e.preventDefault();
            setIsSlideshow(!isSlideshow);
            break;
        }
      };

      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [isModal, isSlideshow, onClose]);

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
    resetImageState();
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    resetImageState();
  };

  const resetImageState = () => {
    setIsZoomed(false);
    setZoomLevel(1);
    setRotation(0);
  };

  const handleZoom = () => {
    if (isZoomed) {
      setZoomLevel(1);
      setIsZoomed(false);
    } else {
      setZoomLevel(2);
      setIsZoomed(true);
    }
  };

  const handleRotate = (direction: 'left' | 'right') => {
    setRotation(prev => prev + (direction === 'left' ? -90 : 90));
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = images[currentImageIndex];
    link.download = `${propertyName}-image-${currentImageIndex + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareImage = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: propertyName,
          text: `Check out this property image from ${propertyName}`,
          url: images[currentImageIndex]
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback to copying URL
      await navigator.clipboard.writeText(images[currentImageIndex]);
      alert('Image URL copied to clipboard!');
    }
  };

  // Compact gallery view for property page
  if (!isModal) {
    return (
      <div className="relative">
        <div className="grid grid-cols-4 gap-2 h-96">
          {/* Main image */}
          <div className="col-span-3 relative rounded-2xl overflow-hidden group cursor-pointer">
            <Image
              src={images[0]}
              alt={`${propertyName} - Main view`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onClick={onViewGallery}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
              <button
                onClick={onViewGallery}
                className="opacity-0 group-hover:opacity-100 bg-white bg-opacity-90 text-gray-900 px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center"
              >
                <ZoomIn className="w-4 h-4 mr-2" />
                View Gallery
              </button>
            </div>
          </div>

          {/* Thumbnail grid */}
          <div className="space-y-2">
            {images.slice(1, 4).map((image, index) => (
              <div
                key={index}
                className="relative h-[calc(33.333%-0.25rem)] rounded-lg overflow-hidden group cursor-pointer"
                onClick={onViewGallery}
              >
                <Image
                  src={image}
                  alt={`${propertyName} - View ${index + 2}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {index === 2 && images.length > 4 && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-medium">+{images.length - 4} more</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={onViewGallery}
            className="bg-white bg-opacity-90 text-gray-900 p-2 rounded-lg hover:bg-opacity-100 transition-all duration-200"
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={shareImage}
            className="bg-white bg-opacity-90 text-gray-900 p-2 rounded-lg hover:bg-opacity-100 transition-all duration-200"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Full modal gallery view
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-95 z-50 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-black bg-opacity-50">
          <div className="text-white">
            <h3 className="text-lg font-semibold">{propertyName}</h3>
            <p className="text-sm text-gray-300">
              {currentImageIndex + 1} of {images.length}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsSlideshow(!isSlideshow)}
              className="text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors duration-200"
              title={isSlideshow ? 'Pause slideshow' : 'Start slideshow'}
            >
              {isSlideshow ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setShowThumbnails(!showThumbnails)}
              className="text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors duration-200"
              title="Toggle thumbnails"
            >
              <Grid3X3 className="w-5 h-5" />
            </button>

            <button
              onClick={downloadImage}
              className="text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors duration-200"
              title="Download image"
            >
              <Download className="w-5 h-5" />
            </button>

            <button
              onClick={shareImage}
              className="text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors duration-200"
              title="Share image"
            >
              <Share2 className="w-5 h-5" />
            </button>

            <button
              onClick={onClose}
              className="text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors duration-200"
              title="Close gallery"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main image area */}
        <div className="flex-1 relative flex items-center justify-center p-4">
          {/* Navigation buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-3 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200 z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-3 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200 z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image */}
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-full max-h-full"
            style={{
              transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
              transition: 'transform 0.3s ease-in-out'
            }}
          >
            <Image
              src={images[currentImageIndex]}
              alt={`${propertyName} - Image ${currentImageIndex + 1}`}
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain cursor-pointer"
              onClick={handleZoom}
            />
          </motion.div>

          {/* Image controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-black bg-opacity-50 rounded-lg p-2">
            <button
              onClick={() => handleRotate('left')}
              className="text-white p-2 hover:bg-white hover:bg-opacity-20 rounded transition-colors duration-200"
              title="Rotate left"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={handleZoom}
              className="text-white p-2 hover:bg-white hover:bg-opacity-20 rounded transition-colors duration-200"
              title={isZoomed ? 'Zoom out' : 'Zoom in'}
            >
              {isZoomed ? <Maximize2 className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
            </button>

            <button
              onClick={() => handleRotate('right')}
              className="text-white p-2 hover:bg-white hover:bg-opacity-20 rounded transition-colors duration-200"
              title="Rotate right"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Thumbnails */}
        {showThumbnails && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="bg-black bg-opacity-50 p-4"
          >
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentImageIndex(index);
                    resetImageState();
                  }}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-200 ${
                    index === currentImageIndex
                      ? 'ring-2 ring-white ring-opacity-80'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default PropertyGallery;
