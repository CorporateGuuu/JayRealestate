'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Search,
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  Eye,
  Grid,
  List,
  SlidersHorizontal
} from 'lucide-react';

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  image: string;
  beds: number;
  baths: number;
  sqft: number;
  type: string;
  featured: boolean;
  description: string;
}

const PropertiesPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [likedProperties, setLikedProperties] = useState<number[]>([]);
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    priceMin: '',
    priceMax: '',
    beds: 'any',
    baths: 'any',
    location: 'all',
  });

  // Extended property data
  const properties = [
    {
      id: 1,
      title: 'Luxury Villa with Burj Khalifa View',
      location: 'Downtown Dubai',
      price: 12500000,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      beds: 5,
      baths: 4,
      sqft: 4200,
      type: 'Villa',
      featured: true,
      description: 'Stunning modern villa with panoramic Burj Khalifa views, premium finishes, and luxury amenities in Downtown Dubai.',
    },
    {
      id: 2,
      title: 'Marina Penthouse',
      location: 'Dubai Marina',
      price: 18000000,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      beds: 3,
      baths: 3,
      sqft: 2800,
      type: 'Penthouse',
      featured: true,
      description: 'Luxurious penthouse in Dubai Marina with breathtaking marina and sea views, floor-to-ceiling windows and private terrace.',
    },
    {
      id: 3,
      title: 'Palm Jumeirah Waterfront Villa',
      location: 'Palm Jumeirah',
      price: 25000000,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      beds: 6,
      baths: 5,
      sqft: 5500,
      type: 'Villa',
      featured: true,
      description: 'Magnificent waterfront villa on Palm Jumeirah with private beach access, infinity pool, and stunning views.',
    },
    {
      id: 4,
      title: 'Business Bay Townhouse',
      location: 'Business Bay',
      price: 6800000,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      beds: 4,
      baths: 3,
      sqft: 3200,
      type: 'Townhouse',
      featured: false,
      description: 'Beautifully designed townhouse in Business Bay with modern amenities and canal views.',
    },
    {
      id: 5,
      title: 'DIFC Luxury Apartment',
      location: 'Dubai International Financial Centre',
      price: 4200000,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      beds: 2,
      baths: 2,
      sqft: 1800,
      type: 'Apartment',
      featured: false,
      description: 'Elegant apartment in DIFC with stunning city views and premium building amenities.',
    },
    {
      id: 6,
      title: 'Emirates Hills Mansion',
      location: 'Emirates Hills',
      price: 35000000,
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      beds: 7,
      baths: 6,
      sqft: 8500,
      type: 'Mansion',
      featured: false,
      description: 'Luxurious mansion in Emirates Hills with golf course views and breathtaking amenities.',
    },
    {
      id: 7,
      title: 'Jumeirah Beach Residence',
      location: 'Jumeirah Beach Residence',
      price: 8500000,
      image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      beds: 4,
      baths: 4,
      sqft: 3200,
      type: 'Apartment',
      featured: false,
      description: 'Stunning beachfront apartment in JBR with direct beach access and panoramic sea views.',
    },
    {
      id: 8,
      title: 'Arabian Ranches Villa',
      location: 'Arabian Ranches',
      price: 9200000,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      beds: 5,
      baths: 4,
      sqft: 4500,
      type: 'Villa',
      featured: true,
      description: 'Beautiful family villa in Arabian Ranches with golf course access and community amenities.',
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
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const PropertyCard = ({ property, index }: { property: Property; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`bg-white rounded-2xl shadow-lg overflow-hidden card-hover group ${
        viewMode === 'list' ? 'flex' : ''
      }`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-80 flex-shrink-0' : 'h-64'}`}>
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {property.type}
          </span>
        </div>
        {property.featured && (
          <div className="absolute top-4 left-20">
            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Featured
            </span>
          </div>
        )}
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
      <div className="p-6 flex-1">
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          {property.location}
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
          {property.title}
        </h3>
        
        {viewMode === 'list' && (
          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
            {property.description}
          </p>
        )}
        
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
          <div className="text-2xl font-bold text-blue-600">
            {formatPrice(property.price)}
          </div>
          <Link
            href={`/properties/${property.id}`}
            className="btn-primary text-sm py-2 px-4"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container-custom py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Properties
          </h1>
          <p className="text-xl text-gray-600">
            Discover your perfect home from our curated collection of premium Dubai properties
          </p>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search properties..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* View Toggle and Filters */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span>Filters</span>
              </button>
              
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors duration-200`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors duration-200`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Extended Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 pt-6 border-t border-gray-200"
            >
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="villa">Villa</option>
                <option value="townhouse">Townhouse</option>
              </select>

              <input
                type="number"
                placeholder="Min Price"
                value={filters.priceMin}
                onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              <input
                type="number"
                placeholder="Max Price"
                value={filters.priceMax}
                onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              <select
                value={filters.beds}
                onChange={(e) => setFilters({ ...filters, beds: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="any">Any Beds</option>
                <option value="1">1+ Beds</option>
                <option value="2">2+ Beds</option>
                <option value="3">3+ Beds</option>
                <option value="4">4+ Beds</option>
              </select>

              <select
                value={filters.baths}
                onChange={(e) => setFilters({ ...filters, baths: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="any">Any Baths</option>
                <option value="1">1+ Baths</option>
                <option value="2">2+ Baths</option>
                <option value="3">3+ Baths</option>
                <option value="4">4+ Baths</option>
              </select>

              <select
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Locations</option>
                <option value="downtown">Downtown Dubai</option>
                <option value="marina">Dubai Marina</option>
                <option value="palm">Palm Jumeirah</option>
                <option value="business-bay">Business Bay</option>
                <option value="difc">DIFC</option>
                <option value="emirates-hills">Emirates Hills</option>
                <option value="jbr">JBR</option>
                <option value="arabian-ranches">Arabian Ranches</option>
              </select>
            </motion.div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {properties.length} properties
          </p>
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest First</option>
            <option>Oldest First</option>
          </select>
        </div>

        {/* Properties Grid/List */}
        <div className={`${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
            : 'space-y-6'
        }`}>
          {properties.map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              Previous
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              1
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              2
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              3
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;
