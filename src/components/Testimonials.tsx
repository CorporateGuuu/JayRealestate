'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import Image from 'next/image';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Expatriate Family',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      text: 'JAY Real Estate made our move to Dubai seamless. Their team understood our needs as expatriates and helped us find the perfect home in Dubai Marina. Their knowledge of RERA regulations was invaluable!',
      property: 'Luxury Apartment in Dubai Marina',
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'UAE Property Investor',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      text: 'As an investor in Dubai real estate, I need accurate market analysis and quick turnarounds. JAY Real Estate consistently delivers both. They\'ve helped me build a profitable UAE portfolio over 3 years.',
      property: 'Dubai Investment Portfolio - 5 Properties',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Relocating to Dubai',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      text: 'Moving to Dubai with two kids was stressful, but JAY Real Estate made the process seamless. They understood our family\'s needs and found us the perfect villa in Emirates Hills near excellent schools.',
      property: 'Family Villa in Emirates Hills',
    },
    {
      id: 4,
      name: 'David Thompson',
      role: 'Palm Jumeirah Seller',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      text: 'Selling our Palm Jumeirah villa required Dubai market expertise. JAY Real Estate\'s marketing strategy was exceptional, and they sold our property above asking price within 30 days. Outstanding service.',
      property: 'Palm Jumeirah Villa - AED 12M Sale',
    },
    {
      id: 5,
      name: 'Lisa Park',
      role: 'DIFC Office Buyer',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      text: 'Their Dubai commercial real estate expertise is unmatched. They helped us find the perfect DIFC office location and negotiated terms that exceeded our expectations. Highly recommended for UAE business!',
      property: 'DIFC Commercial Office Space',
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied Dubai clients about their experience
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-50 rounded-3xl p-8 md:p-12"
              >
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                  {/* Quote Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                      <Quote className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-center md:text-left">
                    {/* Stars */}
                    <div className="flex justify-center md:justify-start space-x-1 mb-4">
                      {renderStars(testimonials[currentIndex].rating)}
                    </div>

                    {/* Testimonial Text */}
                    <blockquote className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                      "{testimonials[currentIndex].text}"
                    </blockquote>

                    {/* Property Info */}
                    <div className="text-sm text-blue-600 font-semibold mb-4">
                      {testimonials[currentIndex].property}
                    </div>

                    {/* Client Info */}
                    <div className="flex items-center justify-center md:justify-start space-x-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={testimonials[currentIndex].image}
                          alt={testimonials[currentIndex].name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {testimonials[currentIndex].name}
                        </div>
                        <div className="text-gray-600 text-sm">
                          {testimonials[currentIndex].role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center space-x-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-blue-600 hover:text-blue-600 transition-colors duration-200"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-blue-600 hover:text-blue-600 transition-colors duration-200"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Additional Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
            <div className="text-gray-600">Client Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">4.9/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
            <div className="text-gray-600">Happy Clients</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
