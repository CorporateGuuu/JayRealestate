'use client';

import { useState } from 'react';
import { Search, MapPin, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  const [searchData, setSearchData] = useState({
    location: '',
    propertyType: '',
    bedrooms: '',
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Search data:', searchData);
  };

  const propertyTypes = [
    'All Types',
    'Apartment',
    'Villa',
    'Townhouse',
    'Penthouse',
    'Duplex',
  ];

  const bedroomOptions = [
    'Any Bedrooms',
    '1 Bedroom',
    '2 Bedrooms',
    '3 Bedrooms',
    '4+ Bedrooms',
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/pexels-apasaric-5686514.jpg"
          alt="Luxury Dubai real estate - modern architecture and skyline"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        <div className="absolute inset-0 hero-gradient"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
            Find Your
            <span className="block text-yellow-400 drop-shadow-lg">Dream Home</span>
            <span className="block text-2xl md:text-3xl lg:text-4xl font-medium text-blue-200 mt-2">in Dubai</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-2xl mx-auto drop-shadow-md">
            Discover premium off-plan properties in Dubai's most prestigious locations.
            Your journey to Dubai homeownership starts here.
          </p>

          {/* Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl max-w-4xl mx-auto"
          >
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Location */}
              <div className="relative">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Enter Dubai area (e.g., Downtown, Marina, Palm Jumeirah)"
                    value={searchData.location}
                    onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent text-gray-900"
                    style={{ '--focus-ring-color': 'var(--primary)' } as React.CSSProperties}
                  />
                </div>
              </div>

              {/* Property Type */}
              <div className="relative">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Property Type
                </label>
                <div className="relative">
                  <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={searchData.propertyType}
                    onChange={(e) => setSearchData({ ...searchData, propertyType: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 appearance-none"
                  >
                    {propertyTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Bedrooms */}
              <div className="relative">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Bedrooms
                </label>
                <div className="relative">
                  <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={searchData.bedrooms}
                    onChange={(e) => setSearchData({ ...searchData, bedrooms: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 appearance-none"
                  >
                    {bedroomOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  <Search className="w-5 h-5" />
                  <span>Search</span>
                </button>
              </div>
            </form>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <p className="text-lg text-gray-200 mb-6">
                Ready to find your dream property in Dubai?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/properties" className="btn-primary">
                  Browse Properties
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
