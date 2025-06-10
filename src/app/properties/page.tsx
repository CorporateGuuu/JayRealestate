import { Suspense } from 'react';
import PropertiesPage from '@/components/PropertiesPage';

export const metadata = {
  title: 'Properties - JAY Real Estate',
  description: 'Browse our extensive collection of premium properties. Find your dream home with JAY Real Estate.',
};

function PropertiesLoading() {
  return (
    <div className="pt-16 lg:pt-20">
      <div className="container-custom py-16">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-2xl h-96"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Properties() {
  return (
    <Suspense fallback={<PropertiesLoading />}>
      <PropertiesPage />
    </Suspense>
  );
}
