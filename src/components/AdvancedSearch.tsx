'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Building,
  Users,
  Calendar,
  DollarSign,
  Filter,
  X,
  Heart,
  Bell,
  Map,
  List,
  Grid3X3
} from 'lucide-react';
import { properties, developers, locations, type Property } from '@/data/dubaiProperties';

interface SearchFilters {
  query: string;
  area: string;
  developer: string;
  propertyType: string;
  bedrooms: string;
  priceRange: [number, number];
  completionYear: string;
  amenities: string[];
  metroConnectivity: boolean | null;
}

interface AdvancedSearchProps {
  onResults: (results: Property[]) => void;
  onFiltersChange: (filters: SearchFilters) => void;
  className?: string;
}

const AdvancedSearch = ({ onResults, onFiltersChange, className = '' }: AdvancedSearchProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [savedSearches, setSavedSearches] = useState<any[]>([]);
  const [showSaveSearch, setShowSaveSearch] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    area: '',
    developer: '',
    propertyType: '',
    bedrooms: '',
    priceRange: [0, 10000000],
    completionYear: '',
    amenities: [],
    metroConnectivity: null
  });

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Available amenities for filtering
  const availableAmenities = [
    'Swimming Pool', 'Gym', 'Parking', 'Security', 'WiFi', 'Garden',
    'Balcony', 'Elevator', 'Concierge', 'Spa', 'Tennis Court',
    'Kids Play Area', 'BBQ Area', 'Jogging Track', 'Business Center',
    'Retail Outlets', 'Metro Access', 'Beach Access', 'Golf Course', 'Marina'
  ];

  // Load saved searches from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedSearches') || '[]');
    setSavedSearches(saved);
  }, []);

  // Generate search suggestions
  useEffect(() => {
    if (filters.query.length > 1) {
      const allSuggestions: string[] = [
        ...properties.map(p => p.projectName),
        ...properties.map(p => p.area),
        ...developers.map(d => typeof d === 'string' ? d : d.name),
        ...locations.map(l => typeof l === 'string' ? l : l.name),
        'Luxury apartments', 'Waterfront properties', 'Golf course view',
        'Marina view', 'City center', 'Beach access', 'Metro connected'
      ];

      const filtered = allSuggestions
        .filter(suggestion =>
          suggestion.toLowerCase().includes(filters.query.toLowerCase())
        )
        .slice(0, 5);
      
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [filters.query]);

  // Filter properties based on current filters
  useEffect(() => {
    let filtered = properties;

    // Text search
    if (filters.query) {
      filtered = filtered.filter(property =>
        property.projectName.toLowerCase().includes(filters.query.toLowerCase()) ||
        property.area.toLowerCase().includes(filters.query.toLowerCase()) ||
        property.developer.toLowerCase().includes(filters.query.toLowerCase()) ||
        property.description.toLowerCase().includes(filters.query.toLowerCase())
      );
    }

    // Area filter
    if (filters.area) {
      filtered = filtered.filter(property => property.area === filters.area);
    }

    // Developer filter
    if (filters.developer) {
      filtered = filtered.filter(property => property.developer === filters.developer);
    }

    // Property type filter
    if (filters.propertyType) {
      filtered = filtered.filter(property => 
        property.propertyTypes.includes(filters.propertyType)
      );
    }

    // Bedrooms filter
    if (filters.bedrooms) {
      filtered = filtered.filter(property => 
        property.bedrooms.includes(filters.bedrooms)
      );
    }

    // Completion year filter
    if (filters.completionYear) {
      filtered = filtered.filter(property => 
        property.completionDate.includes(filters.completionYear)
      );
    }

    // Amenities filter
    if (filters.amenities.length > 0) {
      filtered = filtered.filter(property =>
        filters.amenities.every(amenity => property.amenities.includes(amenity))
      );
    }

    // Metro connectivity filter
    if (filters.metroConnectivity !== null) {
      filtered = filtered.filter(property =>
        Boolean(property.metroConnectivity) === filters.metroConnectivity
      );
    }

    onResults(filtered);
    onFiltersChange(filters);
  }, [filters, onResults, onFiltersChange]);

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleAmenity = (amenity: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      area: '',
      developer: '',
      propertyType: '',
      bedrooms: '',
      priceRange: [0, 10000000],
      completionYear: '',
      amenities: [],
      metroConnectivity: null
    });
  };

  const saveSearch = () => {
    if (!searchName.trim()) return;
    
    const newSearch = {
      id: Date.now(),
      name: searchName,
      filters: { ...filters },
      createdAt: new Date().toISOString()
    };
    
    const updated = [...savedSearches, newSearch];
    setSavedSearches(updated);
    localStorage.setItem('savedSearches', JSON.stringify(updated));
    setSearchName('');
    setShowSaveSearch(false);
  };

  const loadSavedSearch = (search: any) => {
    setFilters(search.filters);
  };

  const deleteSavedSearch = (searchId: number) => {
    const updated = savedSearches.filter(s => s.id !== searchId);
    setSavedSearches(updated);
    localStorage.setItem('savedSearches', JSON.stringify(updated));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      notation: price >= 1000000 ? 'compact' : 'standard'
    }).format(price);
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-200 ${className}`}>
      {/* Main Search Bar */}
      <div className="p-6">
        <div className="relative">
          <div className="flex items-center space-x-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by project name, area, or developer..."
                value={filters.query}
                onChange={(e) => updateFilter('query', e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              
              {/* Search Suggestions */}
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1"
                  >
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          updateFilter('query', suggestion);
                          setShowSuggestions(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center px-4 py-3 rounded-xl border transition-colors duration-200 ${
                showFilters 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filters
            </button>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'map' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                }`}
              >
                <Map className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex items-center space-x-3 mt-4">
          <span className="text-sm font-medium text-gray-700">Quick filters:</span>
          {['Downtown Dubai', 'Dubai Marina', 'Business Bay', 'Palm Jumeirah'].map((area) => (
            <button
              key={area}
              onClick={() => updateFilter('area', filters.area === area ? '' : area)}
              className={`px-3 py-1 text-sm rounded-full border transition-colors duration-200 ${
                filters.area === area
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {area}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-gray-200 overflow-hidden"
          >
            <div className="p-6 space-y-6">
              {/* Location and Developer */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Area
                  </label>
                  <select
                    value={filters.area}
                    onChange={(e) => updateFilter('area', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Areas</option>
                    {locations.map((location, index) => (
                      <option key={index} value={typeof location === 'string' ? location : location.name}>
                        {typeof location === 'string' ? location : location.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Building className="w-4 h-4 inline mr-1" />
                    Developer
                  </label>
                  <select
                    value={filters.developer}
                    onChange={(e) => updateFilter('developer', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Developers</option>
                    {developers.map((developer, index) => (
                      <option key={index} value={typeof developer === 'string' ? developer : developer.name}>
                        {typeof developer === 'string' ? developer : developer.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="w-4 h-4 inline mr-1" />
                    Bedrooms
                  </label>
                  <select
                    value={filters.bedrooms}
                    onChange={(e) => updateFilter('bedrooms', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Any</option>
                    <option value="Studio">Studio</option>
                    <option value="1 BR">1 Bedroom</option>
                    <option value="2 BR">2 Bedrooms</option>
                    <option value="3 BR">3 Bedrooms</option>
                    <option value="4 BR">4+ Bedrooms</option>
                  </select>
                </div>
              </div>

              {/* Property Type and Completion */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                  <select
                    value={filters.propertyType}
                    onChange={(e) => updateFilter('propertyType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Types</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Penthouse">Penthouse</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Completion Year
                  </label>
                  <select
                    value={filters.completionYear}
                    onChange={(e) => updateFilter('completionYear', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Any Year</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                  </select>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Amenities</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {availableAmenities.slice(0, 12).map((amenity) => (
                    <button
                      key={amenity}
                      onClick={() => toggleAmenity(amenity)}
                      className={`text-left px-3 py-2 text-sm rounded-lg border transition-colors duration-200 ${
                        filters.amenities.includes(amenity)
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {amenity}
                    </button>
                  ))}
                </div>
              </div>

              {/* Metro Connectivity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Metro Connectivity</label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => updateFilter('metroConnectivity', null)}
                    className={`px-4 py-2 text-sm rounded-lg border transition-colors duration-200 ${
                      filters.metroConnectivity === null
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    Any
                  </button>
                  <button
                    onClick={() => updateFilter('metroConnectivity', true)}
                    className={`px-4 py-2 text-sm rounded-lg border transition-colors duration-200 ${
                      filters.metroConnectivity === true
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    Metro Connected
                  </button>
                  <button
                    onClick={() => updateFilter('metroConnectivity', false)}
                    className={`px-4 py-2 text-sm rounded-lg border transition-colors duration-200 ${
                      filters.metroConnectivity === false
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    No Metro
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={clearFilters}
                    className="text-sm text-gray-600 hover:text-gray-800"
                  >
                    Clear all filters
                  </button>
                  <button
                    onClick={() => setShowSaveSearch(true)}
                    className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                  >
                    <Bell className="w-4 h-4 mr-1" />
                    Save search
                  </button>
                </div>

                <div className="text-sm text-gray-600">
                  {Object.values(filters).some(v => v && (Array.isArray(v) ? v.length > 0 : true)) && (
                    <span>Active filters applied</span>
                  )}
                </div>
              </div>

              {/* Saved Searches */}
              {savedSearches.length > 0 && (
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Saved Searches</h4>
                  <div className="space-y-2">
                    {savedSearches.map((search) => (
                      <div key={search.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <button
                          onClick={() => loadSavedSearch(search)}
                          className="flex-1 text-left text-sm font-medium text-gray-900 hover:text-blue-600"
                        >
                          {search.name}
                        </button>
                        <button
                          onClick={() => deleteSavedSearch(search.id)}
                          className="text-gray-400 hover:text-red-600 p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Save Search Modal */}
      <AnimatePresence>
        {showSaveSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowSaveSearch(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Save Search</h3>
              <input
                type="text"
                placeholder="Enter search name..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              />
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowSaveSearch(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={saveSearch}
                  disabled={!searchName.trim()}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedSearch;
