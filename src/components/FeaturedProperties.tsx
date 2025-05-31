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
  ArrowRight 
} from 'lucide-react';

const FeaturedProperties = () => {
  const [likedProperties, setLikedProperties] = useState<number[]>([]);

  const properties = [
    {
      id: 1,
      title: 'Luxury Villa with Burj Khalifa View',
      location: 'Downtown Dubai',
      price: 8500000,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      beds: 5,
      baths: 4,
      sqft: 4200,
      type: 'Villa',
      featured: true,
    },
    {
      id: 2,
      title: 'Marina Penthouse',
      location: 'Dubai Marina',
      price: 12000000,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      beds: 3,
      baths: 3,
      sqft: 2800,
      type: 'Penthouse',
      featured: true,
    },
    {
      id: 3,
      title: 'Palm Jumeirah Waterfront Villa',
      location: 'Palm Jumeirah',
      price: 15000000,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      beds: 6,
      baths: 5,
      sqft: 5500,
      type: 'Villa',
      featured: true,
    },
    {
      id: 4,
      title: 'Business Bay Townhouse',
      location: 'Business Bay',
      price: 4200000,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      beds: 4,
      baths: 3,
      sqft: 3200,
      type: 'Townhouse',
      featured: true,
    },
    {
      id: 5,
      title: 'DIFC Luxury Apartment',
      location: 'Dubai International Financial Centre',
      price: 2800000,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      beds: 2,
      baths: 2,
      sqft: 1800,
      type: 'Apartment',
      featured: true,
    },
    {
      id: 6,
      title: 'Emirates Hills Mansion',
      location: 'Emirates Hills',
      price: 18000000,
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      beds: 5,
      baths: 4,
      sqft: 4800,
      type: 'Mansion',
      featured: true,
    },
  ];

  const toggleLike = (propertyId: number) => {
    setLikedProperties(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
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
            Featured Properties
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties in Dubai's most prestigious neighborhoods
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover group"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="gradient-bg text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {property.type}
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={() => toggleLike(property.id)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 ${
                      likedProperties.includes(property.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/80 text-gray-700 hover:bg-red-500 hover:text-white'
                    }`}
                  >
                    <Heart className="w-5 h-5" fill={likedProperties.includes(property.id) ? 'currentColor' : 'none'} />
                  </button>
                  <Link
                    href={`/properties/${property.id}`}
                    className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-gray-700 hover:bg-blue-500 hover:text-white transition-colors duration-200"
                  >
                    <Eye className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property.location}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:opacity-80 transition-colors duration-200" style={{ '--hover-color': 'var(--primary)' } as React.CSSProperties}>
                  {property.title}
                </h3>
                
                <div className="flex items-center justify-between text-gray-600 text-sm mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      {property.beds}
                    </div>
                    <div className="flex items-center">
                      <Bath className="w-4 h-4 mr-1" />
                      {property.baths}
                    </div>
                    <div className="flex items-center">
                      <Square className="w-4 h-4 mr-1" />
                      {property.sqft.toLocaleString()} sq ft
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
                    {formatPrice(property.price)}
                  </div>
                  <Link
                    href={`/properties/${property.id}`}
                    className="flex items-center font-semibold transition-colors duration-200 hover:opacity-80"
                    style={{ color: 'var(--primary)' }}
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

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
