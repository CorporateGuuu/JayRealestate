'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Search,
  MapPin,
  Building,
  Calendar,
  Heart,
  Eye,
  Grid,
  List,
  SlidersHorizontal,
  Star,
  Users,
  Train,
  X
} from 'lucide-react';
import { properties, developers, locations, searchSuggestions, type Property } from '@/data/dubaiProperties';
import WhatsAppButton from '@/components/WhatsAppButton';
import AdvancedSearch from '@/components/AdvancedSearch';

const PropertiesPage = () => {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [likedProperties, setLikedProperties] = useState<number[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  const [searchFilters, setSearchFilters] = useState<any>({});
  const [sortBy, setSortBy] = useState('featured');

  // Handle URL parameters on component mount
  useEffect(() => {
    const type = searchParams.get('type');
    const category = searchParams.get('category');

    if (type || category) {
      let filtered = properties;

      // Filter by type (buy, rent, off-plan)
      if (type === 'off-plan') {
        // All properties are off-plan, so no additional filtering needed
        filtered = properties;
      } else if (type === 'buy' || type === 'rent') {
        // For now, all properties are off-plan, but we can set the filter context
        setSearchFilters((prev: any) => ({ ...prev, type }));
      }

      // Filter by category (apartment, villa, townhouse, etc.)
      if (category) {
        filtered = filtered.filter(property =>
          property.propertyTypes.some(propType =>
            propType.toLowerCase().includes(category.toLowerCase())
          )
        );
        setSearchFilters((prev: any) => ({ ...prev, category }));
      }

      setFilteredProperties(filtered);
    }
  }, [searchParams]);

  // Search suggestions logic
  const getSearchSuggestions = (query: string) => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    const suggestions = [
      ...searchSuggestions.areas.filter(area =>
        area.toLowerCase().includes(lowerQuery)
      ).map(area => ({ type: 'area', value: area })),
      ...searchSuggestions.propertyTypes.filter(type =>
        type.toLowerCase().includes(lowerQuery)
      ).map(type => ({ type: 'propertyType', value: type })),
      ...searchSuggestions.developers.filter(dev =>
        dev.toLowerCase().includes(lowerQuery)
      ).map(dev => ({ type: 'developer', value: dev })),
      ...searchSuggestions.amenities.filter(amenity =>
        amenity.toLowerCase().includes(lowerQuery)
      ).map(amenity => ({ type: 'amenity', value: amenity }))
    ];

    return suggestions.slice(0, 8); // Limit to 8 suggestions
  };

  // Sort filtered properties
  const sortedProperties = useMemo(() => {
    const sorted = [...filteredProperties];

    sorted.sort((a, b) => {
      switch (sortBy) {
        case 'featured':
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        case 'newest':
          return a.completionDate.localeCompare(b.completionDate);
        case 'oldest':
          return b.completionDate.localeCompare(a.completionDate);
        case 'developer':
          return a.developer.localeCompare(b.developer);
        default:
          return 0;
      }
    });

    return sorted;
  }, [filteredProperties, sortBy]);

  const toggleLike = (propertyId: number) => {
    setLikedProperties(prev =>
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
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
          alt={`${property.projectName} by ${property.developer}`}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {property.propertyTypes[0]}
          </span>
          {property.featured && (
            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              <Star className="w-3 h-3 inline mr-1" />
              Featured
            </span>
          )}
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
      <div className="p-6 flex-1">
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          {property.location}, {property.area}
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
          {property.projectName}
        </h3>

        <div className="flex items-center text-gray-600 text-sm mb-3">
          <Building className="w-4 h-4 mr-1" />
          <span className="font-medium">{property.developer}</span>
        </div>

        {viewMode === 'list' && (
          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
            {property.description}
          </p>
        )}

        <div className="flex items-center justify-between text-gray-600 text-sm mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {property.bedrooms.length > 1 ? `${property.bedrooms[0]} - ${property.bedrooms[property.bedrooms.length - 1]}` : property.bedrooms[0]}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {property.completionDate}
            </div>
            {property.metroConnectivity && (
              <div className="flex items-center">
                <Train className="w-4 h-4 mr-1" />
                <span className="text-xs">Metro</span>
              </div>
            )}
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {property.amenities.slice(0, 3).map((amenity, idx) => (
              <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                {amenity}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                +{property.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <span className="font-medium text-blue-600">Off-Plan Project</span>
          </div>
          <div className="flex items-center space-x-2">
            <WhatsAppButton
              context={{
                type: 'property',
                propertyName: property.projectName,
                propertyType: property.propertyTypes[0],
                developer: property.developer,
                area: property.area
              }}
              variant="minimal"
              size="sm"
              className="text-xs"
            />
            <Link
              href={`/properties/${property.id}`}
              className="btn-primary text-sm py-2 px-4"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container-custom section-padding-sm">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Off-Plan Properties in Dubai
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Discover exclusive off-plan developments from Dubai's leading developers.
              Invest in your future with premium projects in prime locations.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom section-padding">
        {/* Advanced Search */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <AdvancedSearch
            onResults={setFilteredProperties}
            onFiltersChange={setSearchFilters}
          />
        </motion.div>

        {/* Results Count and Sort */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4"
        >
          <div>
            <p className="text-gray-600 text-lg">
              Showing <span className="font-semibold text-blue-600">{sortedProperties.length}</span> off-plan projects
            </p>
            {searchFilters.query && (
              <p className="text-sm text-gray-500 mt-1">
                Search results for "{searchFilters.query}"
              </p>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-field min-w-48"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="newest">Completion: Earliest First</option>
              <option value="oldest">Completion: Latest First</option>
              <option value="developer">Developer: A-Z</option>
            </select>

            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors duration-200`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors duration-200`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Properties Grid/List with Enhanced Spacing */}
        {sortedProperties.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className={`${
              viewMode === 'grid'
                ? 'property-grid'
                : 'space-y-8'
            }`}
          >
            {sortedProperties.map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center py-16"
          >
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No properties found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or filters to find more properties.
              </p>
              <button
                onClick={() => {
                  setFilteredProperties(properties);
                  setSearchFilters({});
                }}
                className="btn-primary"
              >
                Clear All Filters
              </button>
            </div>
          </motion.div>
        )}

        {/* Enhanced Pagination */}
        {sortedProperties.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex justify-center mt-16"
          >
            <div className="flex space-x-2">
              <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium">
                Previous
              </button>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium">
                1
              </button>
              <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium">
                2
              </button>
              <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium">
                3
              </button>
              <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium">
                Next
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PropertiesPage;
