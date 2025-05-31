'use client';

import { Suspense, lazy, ComponentType } from 'react';
import { motion } from 'framer-motion';

interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

// Default loading skeleton
const DefaultSkeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse ${className || ''}`}>
    <div className="bg-gray-200 rounded-lg h-64 w-full"></div>
  </div>
);

// Lazy loading wrapper with intersection observer
const LazyWrapper: React.FC<LazyWrapperProps> = ({ 
  children, 
  fallback = <DefaultSkeleton />,
  className 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: '100px' }}
      className={className}
    >
      <Suspense fallback={fallback}>
        {children}
      </Suspense>
    </motion.div>
  );
};

// Higher-order component for lazy loading
export const withLazyLoading = <P extends object>(
  Component: ComponentType<P>,
  fallback?: React.ReactNode
) => {
  const LazyComponent = lazy(() => Promise.resolve({ default: Component }));
  
  const WrappedComponent = (props: P) => (
    <LazyWrapper fallback={fallback}>
      <LazyComponent {...props} />
    </LazyWrapper>
  );

  WrappedComponent.displayName = `withLazyLoading(${Component.displayName || Component.name})`;

  return WrappedComponent;
};

// Specific skeletons for different components
export const PropertyCardSkeleton = () => (
  <div className="animate-pulse bg-white rounded-2xl shadow-lg overflow-hidden">
    <div className="bg-gray-200 h-64 w-full"></div>
    <div className="p-6 space-y-4">
      <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
      <div className="bg-gray-200 h-3 w-1/2 rounded"></div>
      <div className="flex justify-between items-center">
        <div className="bg-gray-200 h-6 w-1/3 rounded"></div>
        <div className="bg-gray-200 h-8 w-20 rounded"></div>
      </div>
    </div>
  </div>
);

export const TestimonialSkeleton = () => (
  <div className="animate-pulse bg-gray-50 rounded-3xl p-8">
    <div className="flex items-center space-x-4 mb-6">
      <div className="bg-gray-200 w-16 h-16 rounded-full"></div>
      <div className="space-y-2">
        <div className="bg-gray-200 h-4 w-32 rounded"></div>
        <div className="bg-gray-200 h-3 w-24 rounded"></div>
      </div>
    </div>
    <div className="space-y-3">
      <div className="bg-gray-200 h-4 w-full rounded"></div>
      <div className="bg-gray-200 h-4 w-5/6 rounded"></div>
      <div className="bg-gray-200 h-4 w-4/6 rounded"></div>
    </div>
  </div>
);

export const MapSkeleton = () => (
  <div className="animate-pulse bg-gray-200 rounded-lg h-96 w-full flex items-center justify-center">
    <div className="text-gray-400 text-center">
      <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
      <div className="bg-gray-300 h-4 w-32 rounded mx-auto"></div>
    </div>
  </div>
);

export default LazyWrapper;
