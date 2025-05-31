'use client';

import { useState, useMemo } from 'react';
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

const PropertiesPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [likedProperties, setLikedProperties] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filters, setFilters] = useState({
    developer: 'all',
    propertyType: 'all',
    bedrooms: 'any',
    location: 'all',
    completion: 'all',
  });
  const [sortBy, setSortBy] = useState('featured');

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

  // Filter and sort properties
  const filteredAndSortedProperties = useMemo(() => {
    const filtered = properties.filter(property => {
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          property.projectName.toLowerCase().includes(query) ||
          property.developer.toLowerCase().includes(query) ||
          property.location.toLowerCase().includes(query) ||
          property.area.toLowerCase().includes(query) ||
          property.propertyTypes.some(type => type.toLowerCase().includes(query)) ||
          property.amenities.some(amenity => amenity.toLowerCase().includes(query));

        if (!matchesSearch) return false;
      }

      // Developer filter
      if (filters.developer !== 'all' && property.developer !== filters.developer) {
        return false;
      }

      // Property type filter
      if (filters.propertyType !== 'all' &&
          !property.propertyTypes.some(type => type.toLowerCase() === filters.propertyType.toLowerCase())) {
        return false;
      }

      // Bedrooms filter
      if (filters.bedrooms !== 'any' &&
          !property.bedrooms.some(bed => bed.includes(filters.bedrooms))) {
        return false;
      }

      // Location filter
      if (filters.location !== 'all' && property.location !== filters.location) {
        return false;
      }

      // Completion filter
      if (filters.completion !== 'all') {
        const year = property.completionDate.includes('2025') ? '2025' :
                    property.completionDate.includes('2026') ? '2026' : '2027';
        if (year !== filters.completion) return false;
      }

      return true;
    });

    // Sort properties
    filtered.sort((a, b) => {
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

    return filtered;
  }, [searchQuery, filters, sortBy]);

  const toggleLike = (propertyId: number) => {
    setLikedProperties(prev =>
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const handleSearchSelect = (suggestion: { type: string; value: string }) => {
    setSearchQuery(suggestion.value);
    setShowSuggestions(false);

    // Auto-apply filter based on suggestion type
    if (suggestion.type === 'developer') {
      setFilters(prev => ({ ...prev, developer: suggestion.value }));
    } else if (suggestion.type === 'area') {
      setFilters(prev => ({ ...prev, location: suggestion.value }));
    } else if (suggestion.type === 'propertyType') {
      setFilters(prev => ({ ...prev, propertyType: suggestion.value }));
    }
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
        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl p-6 md:p-8 shadow-lg mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
            {/* Enhanced Search with Autocomplete */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by location, developer, or property type..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(e.target.value.length > 0);
                }}
                onFocus={() => setShowSuggestions(searchQuery.length > 0)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="form-field pl-10"
              />

              {/* Search Suggestions */}
              {showSuggestions && searchQuery.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 max-h-64 overflow-y-auto">
                  {getSearchSuggestions(searchQuery).map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearchSelect(suggestion)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 flex items-center space-x-2"
                    >
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded capitalize">
                        {suggestion.type}
                      </span>
                      <span className="text-gray-900">{suggestion.value}</span>
                    </button>
                  ))}
                  {getSearchSuggestions(searchQuery).length === 0 && (
                    <div className="px-4 py-3 text-gray-500 text-sm">
                      No suggestions found
                    </div>
                  )}
                </div>
              )}

              {/* Clear Search */}
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setShowSuggestions(false);
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* View Toggle and Filters */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span>Filters</span>
              </button>

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
          </div>

          {/* Enhanced Filters - No Pricing */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 pt-6 border-t border-gray-200"
            >
              <select
                value={filters.developer}
                onChange={(e) => setFilters({ ...filters, developer: e.target.value })}
                className="form-field"
              >
                <option value="all">All Developers</option>
                {developers.map(dev => (
                  <option key={dev.id} value={dev.name}>{dev.name}</option>
                ))}
              </select>

              <select
                value={filters.propertyType}
                onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
                className="form-field"
              >
                <option value="all">All Property Types</option>
                {searchSuggestions.propertyTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <select
                value={filters.bedrooms}
                onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
                className="form-field"
              >
                <option value="any">Any Bedrooms</option>
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
              </select>

              <select
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="form-field"
              >
                <option value="all">All Locations</option>
                {locations.map(location => (
                  <option key={location.id} value={location.name}>{location.name}</option>
                ))}
              </select>

              <select
                value={filters.completion}
                onChange={(e) => setFilters({ ...filters, completion: e.target.value })}
                className="form-field"
              >
                <option value="all">All Completion Dates</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
              </select>
            </motion.div>
          )}
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
              Showing <span className="font-semibold text-blue-600">{filteredAndSortedProperties.length}</span> off-plan projects
            </p>
            {searchQuery && (
              <p className="text-sm text-gray-500 mt-1">
                Search results for "{searchQuery}"
              </p>
            )}
          </div>
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
        </motion.div>

        {/* Properties Grid/List with Enhanced Spacing */}
        {filteredAndSortedProperties.length > 0 ? (
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
            {filteredAndSortedProperties.map((property, index) => (
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
                  setSearchQuery('');
                  setFilters({
                    developer: 'all',
                    propertyType: 'all',
                    bedrooms: 'any',
                    location: 'all',
                    completion: 'all',
                  });
                }}
                className="btn-primary"
              >
                Clear All Filters
              </button>
            </div>
          </motion.div>
        )}

        {/* Enhanced Pagination */}
        {filteredAndSortedProperties.length > 0 && (
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
