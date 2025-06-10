'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Plus,
  Minus,
  Check,
  MapPin,
  Building,
  Calendar,
  Users,
  Car,
  Wifi,
  Dumbbell,
  Shield,
  Waves,
  Trees,
  Search,
  ArrowRight
} from 'lucide-react';
import { properties, type Property } from '@/data/dubaiProperties';

interface PropertyComparisonProps {
  currentProperty: Property;
  onClose: () => void;
}

const PropertyComparison = ({ currentProperty, onClose }: PropertyComparisonProps) => {
  const [selectedProperties, setSelectedProperties] = useState<Property[]>([currentProperty]);
  const [availableProperties, setAvailableProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPropertySelector, setShowPropertySelector] = useState(false);

  useEffect(() => {
    // Get properties excluding the current one
    const available = properties.filter(p => p.id !== currentProperty.id);
    setAvailableProperties(available);
  }, [currentProperty.id]);

  const filteredProperties = availableProperties.filter(property =>
    property.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.developer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addPropertyToComparison = (property: Property) => {
    if (selectedProperties.length < 3 && !selectedProperties.find(p => p.id === property.id)) {
      setSelectedProperties([...selectedProperties, property]);
      setShowPropertySelector(false);
      setSearchTerm('');
    }
  };

  const removePropertyFromComparison = (propertyId: number) => {
    if (selectedProperties.length > 1) {
      setSelectedProperties(selectedProperties.filter(p => p.id !== propertyId));
    }
  };

  const getAmenityIcon = (amenity: string) => {
    const iconMap: { [key: string]: any } = {
      'Swimming Pool': Waves,
      'Gym': Dumbbell,
      'Parking': Car,
      'Security': Shield,
      'WiFi': Wifi,
      'Garden': Trees,
      'Balcony': Building,
      'Elevator': Building,
      'Concierge': Users,
      'Spa': Waves,
      'Tennis Court': Users,
      'Kids Play Area': Users,
      'BBQ Area': Users,
      'Jogging Track': Users,
      'Business Center': Building,
      'Retail Outlets': Building,
      'Metro Access': Car,
      'Beach Access': Waves,
      'Golf Course': Trees,
      'Marina': Waves
    };
    
    const IconComponent = iconMap[amenity] || Building;
    return <IconComponent className="w-4 h-4" />;
  };

  const getAllAmenities = () => {
    const allAmenities = new Set<string>();
    selectedProperties.forEach(property => {
      property.amenities.forEach(amenity => allAmenities.add(amenity));
    });
    return Array.from(allAmenities).sort();
  };

  const hasAmenity = (property: Property, amenity: string) => {
    return property.amenities.includes(amenity);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Property Comparison</h2>
              <p className="text-gray-600">Compare up to 3 properties side by side</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Property selector */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {selectedProperties.map((property, index) => (
                  <div key={property.id} className="flex items-center">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <Image
                          src={property.image}
                          alt={property.projectName}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      {property.id !== currentProperty.id && (
                        <button
                          onClick={() => removePropertyFromComparison(property.id)}
                          className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors duration-200"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                    {index < selectedProperties.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-gray-400 mx-2" />
                    )}
                  </div>
                ))}
              </div>

              {selectedProperties.length < 3 && (
                <button
                  onClick={() => setShowPropertySelector(true)}
                  className="w-12 h-12 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-colors duration-200"
                >
                  <Plus className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Property selector modal */}
            <AnimatePresence>
              {showPropertySelector && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search properties to compare..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="max-h-40 overflow-y-auto space-y-2">
                    {filteredProperties.slice(0, 5).map((property) => (
                      <button
                        key={property.id}
                        onClick={() => addPropertyToComparison(property)}
                        className="w-full flex items-center space-x-3 p-3 hover:bg-white rounded-lg transition-colors duration-200"
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden">
                          <Image
                            src={property.image}
                            alt={property.projectName}
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 text-left">
                          <h4 className="font-medium text-gray-900">{property.projectName}</h4>
                          <p className="text-sm text-gray-600">{property.developer} • {property.area}</p>
                        </div>
                        <Plus className="w-4 h-4 text-blue-600" />
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setShowPropertySelector(false)}
                    className="mt-3 text-sm text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Comparison table */}
          <div className="overflow-auto max-h-[60vh]">
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-900 w-48">Features</th>
                  {selectedProperties.map((property) => (
                    <th key={property.id} className="text-center p-4 min-w-64">
                      <div className="space-y-2">
                        <div className="w-20 h-20 mx-auto rounded-lg overflow-hidden">
                          <Image
                            src={property.image}
                            alt={property.projectName}
                            width={80}
                            height={80}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm">{property.projectName}</h3>
                          <p className="text-xs text-gray-600">{property.developer}</p>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Basic Information */}
                <tr className="border-t border-gray-200">
                  <td className="p-4 font-medium text-gray-900 bg-gray-50">Location</td>
                  {selectedProperties.map((property) => (
                    <td key={property.id} className="p-4 text-center">
                      <div className="flex items-center justify-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        {property.area}
                      </div>
                    </td>
                  ))}
                </tr>

                <tr className="border-t border-gray-200">
                  <td className="p-4 font-medium text-gray-900 bg-gray-50">Developer</td>
                  {selectedProperties.map((property) => (
                    <td key={property.id} className="p-4 text-center">
                      <div className="flex items-center justify-center text-sm text-gray-600">
                        <Building className="w-4 h-4 mr-1" />
                        {property.developer}
                      </div>
                    </td>
                  ))}
                </tr>

                <tr className="border-t border-gray-200">
                  <td className="p-4 font-medium text-gray-900 bg-gray-50">Completion Date</td>
                  {selectedProperties.map((property) => (
                    <td key={property.id} className="p-4 text-center">
                      <div className="flex items-center justify-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-1" />
                        {property.completionDate}
                      </div>
                    </td>
                  ))}
                </tr>

                <tr className="border-t border-gray-200">
                  <td className="p-4 font-medium text-gray-900 bg-gray-50">Property Types</td>
                  {selectedProperties.map((property) => (
                    <td key={property.id} className="p-4 text-center">
                      <div className="space-y-1">
                        {property.propertyTypes.map((type, index) => (
                          <div key={index} className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                            {type}
                          </div>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                <tr className="border-t border-gray-200">
                  <td className="p-4 font-medium text-gray-900 bg-gray-50">Bedrooms</td>
                  {selectedProperties.map((property) => (
                    <td key={property.id} className="p-4 text-center">
                      <div className="flex items-center justify-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-1" />
                        {property.bedrooms.length > 1 
                          ? `${property.bedrooms[0]} - ${property.bedrooms[property.bedrooms.length - 1]}`
                          : property.bedrooms[0]
                        }
                      </div>
                    </td>
                  ))}
                </tr>

                <tr className="border-t border-gray-200">
                  <td className="p-4 font-medium text-gray-900 bg-gray-50">Metro Connectivity</td>
                  {selectedProperties.map((property) => (
                    <td key={property.id} className="p-4 text-center">
                      {property.metroConnectivity ? (
                        <Check className="w-5 h-5 text-green-600 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-red-600 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>

                {/* Amenities Comparison */}
                <tr className="border-t border-gray-200">
                  <td colSpan={selectedProperties.length + 1} className="p-4 bg-gray-100">
                    <h3 className="font-semibold text-gray-900">Amenities Comparison</h3>
                  </td>
                </tr>

                {getAllAmenities().map((amenity) => (
                  <tr key={amenity} className="border-t border-gray-200">
                    <td className="p-4 font-medium text-gray-900 bg-gray-50">
                      <div className="flex items-center">
                        <div className="text-blue-600 mr-2">
                          {getAmenityIcon(amenity)}
                        </div>
                        {amenity}
                      </div>
                    </td>
                    {selectedProperties.map((property) => (
                      <td key={property.id} className="p-4 text-center">
                        {hasAmenity(property, amenity) ? (
                          <Check className="w-5 h-5 text-green-600 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-red-600 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Comparing {selectedProperties.length} of 3 properties
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Close
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Print Comparison
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PropertyComparison;
