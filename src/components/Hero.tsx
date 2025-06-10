'use client';

import { useState, useEffect } from 'react';
import { Search, MapPin, Home, Star, TrendingUp, Building, Users, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  heroTextReveal,
  floatingAnimation,
  staggerContainer,
  staggerItem,
  formFieldFocus,
  easings
} from '@/lib/animations';
import AnimatedButton from './AnimatedButton';

const Hero = () => {
  const [searchData, setSearchData] = useState({
    location: '',
    propertyType: '',
    bedrooms: '',
  });
  const [isSearching, setIsSearching] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);

    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Handle search logic here
    console.log('Search data:', searchData);
    setIsSearching(false);
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
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y }}
      >
        <Image
          src="/pexels-apasaric-5686514.jpg"
          alt="Luxury Dubai real estate - modern architecture and skyline"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center scale-110"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        <div className="absolute inset-0 hero-gradient"></div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        variants={floatingAnimation}
        animate="animate"
        className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full backdrop-blur-sm hidden lg:block"
      />
      <motion.div
        variants={floatingAnimation}
        animate="animate"
        style={{ animationDelay: '2s' }}
        className="absolute top-40 right-20 w-16 h-16 bg-yellow-400/10 rounded-full backdrop-blur-sm hidden lg:block"
      />
      <motion.div
        variants={floatingAnimation}
        animate="animate"
        style={{ animationDelay: '4s' }}
        className="absolute bottom-40 left-20 w-12 h-12 bg-white/10 rounded-full backdrop-blur-sm hidden lg:block"
      />

      {/* Content */}
      <motion.div
        className="relative z-10 container-custom text-center text-white"
        style={{ opacity }}
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {/* Hero Title with Text Reveal */}
          <motion.div
            variants={heroTextReveal}
            className="overflow-hidden"
          >
            <motion.h1
              variants={staggerItem}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-lg"
            >
              <motion.span variants={staggerItem} className="block">
                Find Your
              </motion.span>
              <motion.span
                variants={staggerItem}
                className="block text-yellow-400 drop-shadow-lg"
              >
                Dream Home
              </motion.span>
              <motion.span
                variants={staggerItem}
                className="block text-2xl md:text-3xl lg:text-4xl font-medium text-blue-200 mt-2"
              >
                in Dubai
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Subtitle with Stagger */}
          <motion.p
            variants={staggerItem}
            className="text-xl md:text-2xl mb-8 text-gray-100 max-w-2xl mx-auto drop-shadow-md"
          >
            Discover premium off-plan properties in Dubai's most prestigious locations.
            Your journey to Dubai homeownership starts here.
          </motion.p>

          {/* Stats Row */}
          <motion.div
            variants={staggerItem}
            className="flex justify-center space-x-8 mb-8"
          >
            {[
              { icon: Building, label: '500+ Properties', value: '500+' },
              { icon: Users, label: 'Happy Clients', value: '1000+' },
              { icon: Star, label: 'Rating', value: '4.9' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={staggerItem}
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 backdrop-blur-sm"
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </motion.div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-200">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Search Form */}
          <motion.div
            variants={staggerItem}
            className="bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl max-w-4xl mx-auto"
            whileHover={{ scale: 1.02, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Location */}
              <motion.div
                className="relative"
                variants={formFieldFocus}
                initial="rest"
                animate={focusedField === 'location' ? 'focus' : 'rest'}
              >
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Location
                </label>
                <div className="relative">
                  <motion.div
                    animate={focusedField === 'location' ? { scale: 1.1, color: '#2563eb' } : { scale: 1, color: '#9ca3af' }}
                    transition={{ duration: 0.2 }}
                  >
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                  </motion.div>
                  <motion.input
                    type="text"
                    placeholder="Enter Dubai area (e.g., Downtown, Marina, Palm Jumeirah)"
                    value={searchData.location}
                    onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                    onFocus={() => setFocusedField('location')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all duration-200"
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>
              </motion.div>

              {/* Property Type */}
              <motion.div
                className="relative"
                variants={formFieldFocus}
                initial="rest"
                animate={focusedField === 'propertyType' ? 'focus' : 'rest'}
              >
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Property Type
                </label>
                <div className="relative">
                  <motion.div
                    animate={focusedField === 'propertyType' ? { scale: 1.1, color: '#2563eb' } : { scale: 1, color: '#9ca3af' }}
                    transition={{ duration: 0.2 }}
                  >
                    <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                  </motion.div>
                  <motion.select
                    value={searchData.propertyType}
                    onChange={(e) => setSearchData({ ...searchData, propertyType: e.target.value })}
                    onFocus={() => setFocusedField('propertyType')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 appearance-none transition-all duration-200"
                    whileFocus={{ scale: 1.02 }}
                  >
                    {propertyTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </motion.select>
                </div>
              </motion.div>

              {/* Bedrooms */}
              <motion.div
                className="relative"
                variants={formFieldFocus}
                initial="rest"
                animate={focusedField === 'bedrooms' ? 'focus' : 'rest'}
              >
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Bedrooms
                </label>
                <div className="relative">
                  <motion.div
                    animate={focusedField === 'bedrooms' ? { scale: 1.1, color: '#2563eb' } : { scale: 1, color: '#9ca3af' }}
                    transition={{ duration: 0.2 }}
                  >
                    <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                  </motion.div>
                  <motion.select
                    value={searchData.bedrooms}
                    onChange={(e) => setSearchData({ ...searchData, bedrooms: e.target.value })}
                    onFocus={() => setFocusedField('bedrooms')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 appearance-none transition-all duration-200"
                    whileFocus={{ scale: 1.02 }}
                  >
                    {bedroomOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </motion.select>
                </div>
              </motion.div>

              {/* Search Button */}
              <div className="flex items-end">
                <AnimatedButton
                  type="submit"
                  loading={isSearching}
                  className="w-full"
                  icon={<Search className="w-5 h-5" />}
                  iconPosition="left"
                >
                  Search Properties
                </AnimatedButton>
              </div>
            </form>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            variants={staggerItem}
            className="mt-12 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <motion.p
                variants={staggerItem}
                className="text-lg text-gray-200 mb-6"
              >
                Ready to find your dream property in Dubai?
              </motion.p>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.div variants={staggerItem}>
                  <Link href="/properties">
                    <AnimatedButton
                      variant="primary"
                      size="lg"
                      icon={<ArrowRight className="w-5 h-5" />}
                      iconPosition="right"
                    >
                      Browse Properties
                    </AnimatedButton>
                  </Link>
                </motion.div>
                <motion.div variants={staggerItem}>
                  <Link href="/contact">
                    <AnimatedButton
                      variant="secondary"
                      size="lg"
                      icon={<Users className="w-5 h-5" />}
                      iconPosition="left"
                    >
                      Contact Us
                    </AnimatedButton>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center relative"
          whileHover={{ borderColor: '#fbbf24' }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-1 h-3 bg-white rounded-full mt-2"
            animate={{
              y: [0, 8, 0],
              opacity: [1, 0.5, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: easings.easeInOut
            }}
          />
        </motion.div>
        <motion.p
          className="text-white text-xs mt-2 opacity-75"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ delay: 2 }}
        >
          Scroll to explore
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Hero;
