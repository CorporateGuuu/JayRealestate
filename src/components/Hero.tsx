'use client';

import { useState } from 'react';
import { Search, MapPin, Home, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [searchData, setSearchData] = useState({
    location: '',
    propertyType: '',
    priceRange: '',
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Search data:', searchData);
  };

  const propertyTypes = [
    'All Types',
    'House',
    'Apartment',
    'Condo',
    'Townhouse',
    'Villa',
    'Commercial',
  ];

  const priceRanges = [
    'Any Price',
    '$0 - $200,000',
    '$200,000 - $500,000',
    '$500,000 - $1,000,000',
    '$1,000,000 - $2,000,000',
    '$2,000,000+',
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
        }}
      >
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
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Find Your
            <span className="block" style={{ color: 'var(--accent-light)' }}>Dream Home</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Discover the perfect property with JAY Real Estate. 
            Your journey to homeownership starts here.
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
                    placeholder="Enter city or area"
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

              {/* Price Range */}
              <div className="relative">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Price Range
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={searchData.priceRange}
                    onChange={(e) => setSearchData({ ...searchData, priceRange: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 appearance-none"
                  >
                    {priceRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
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

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--accent-light)' }}>500+</div>
              <div className="text-sm text-gray-300">Properties Sold</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--accent-light)' }}>15+</div>
              <div className="text-sm text-gray-300">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--accent-light)' }}>1000+</div>
              <div className="text-sm text-gray-300">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--accent-light)' }}>50+</div>
              <div className="text-sm text-gray-300">Expert Agents</div>
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
