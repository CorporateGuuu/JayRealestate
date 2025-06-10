'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  Eye,
  ArrowRight,
  Building,
  Calendar,
  Star
} from 'lucide-react';
import { properties } from '@/data/dubaiProperties';
import {
  staggerContainer,
  staggerItem,
  staggerItemFast,
  propertyCardHover,
  easings
} from '@/lib/animations';

const FeaturedProperties = () => {
  const [likedProperties, setLikedProperties] = useState<number[]>([]);

  // Get featured properties from Dubai properties data (no pricing)
  const featuredProperties = properties.filter(property => property.featured).slice(0, 6);

  const toggleLike = (propertyId: number) => {
    setLikedProperties(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  // Helper function to get bedroom count from bedrooms array
  const getBedroomCount = (bedrooms: string[]) => {
    if (bedrooms.length === 0) return 'Studio';
    return bedrooms[0];
  };

  return (
    <section className="section-spacing bg-white">
      <div className="container-custom">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={staggerItem}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Featured Off-Plan Properties
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Discover authentic Dubai off-plan developments from premier developers like Emaar, DAMAC, Sobha, Nakheel, and Dubai Properties
          </motion.p>
        </motion.div>

        <motion.div
          className="property-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              variants={staggerItemFast}
              className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover group animate-optimized"
              whileHover="hover"
              initial="rest"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={property.image}
                  alt={`${property.projectName} - ${property.developer}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="jay-gradient text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {property.propertyTypes[0]}
                  </span>
                  <span className="bg-white/90 text-gray-900 px-3 py-1 rounded-full text-xs font-medium">
                    {property.developer}
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={() => toggleLike(property.id)}
                    className={`w-10 h-10 touch-target rounded-full flex items-center justify-center transition-colors duration-200 ${
                      likedProperties.includes(property.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/80 text-gray-700 hover:bg-red-500 hover:text-white'
                    }`}
                  >
                    <Heart className="w-5 h-5" fill={likedProperties.includes(property.id) ? 'currentColor' : 'none'} />
                  </button>
                  <Link
                    href={`/properties/${property.id}`}
                    className="w-10 h-10 touch-target bg-white/80 rounded-full flex items-center justify-center text-gray-700 hover:bg-jay-primary hover:text-white transition-colors duration-200"
                  >
                    <Eye className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              {/* Content */}
              <div className="content-padding-sm">
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property.location}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-jay-primary transition-colors duration-200">
                  {property.projectName}
                </h3>

                <div className="flex items-center justify-between text-gray-600 text-sm mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      {getBedroomCount(property.bedrooms)}
                    </div>
                    <div className="flex items-center">
                      <Building className="w-4 h-4 mr-1" />
                      {property.propertyTypes[0]}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {property.completionDate}
                    </div>
                  </div>
                </div>

                {/* Key Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {property.keyFeatures.slice(0, 2).map((feature, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold text-jay-primary">Contact for Pricing</span>
                  </div>
                  <Link
                    href={`/properties/${property.id}`}
                    className="flex items-center font-semibold text-jay-primary hover:text-jay-primary-dark transition-colors duration-200"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/properties" className="btn-primary inline-flex items-center">
            View All Properties
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
