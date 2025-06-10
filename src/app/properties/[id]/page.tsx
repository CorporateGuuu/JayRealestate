'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Heart,
  Share2,
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
  Phone,
  Mail,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  X,
  ExternalLink,
  Calculator,
  Download,
  Eye,
  Clock
} from 'lucide-react';
import { properties, type Property } from '@/data/dubaiProperties';
import WhatsAppButton from '@/components/WhatsAppButton';
import PropertyComparison from '@/components/PropertyComparison';
import PropertyGallery from '@/components/PropertyGallery';
import MortgageCalculator from '@/components/MortgageCalculator';

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const propertyId = parseInt(params.id as string);
  
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [showMortgageCalculator, setShowMortgageCalculator] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [relatedProperties, setRelatedProperties] = useState<Property[]>([]);
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    // Find property by ID
    const foundProperty = properties.find(p => p.id === propertyId);
    if (foundProperty) {
      setProperty(foundProperty);
      
      // Find related properties (same developer or area)
      const related = properties
        .filter(p => 
          p.id !== propertyId && 
          (p.developer === foundProperty.developer || p.area === foundProperty.area)
        )
        .slice(0, 3);
      setRelatedProperties(related);
      
      // Check if property is in favorites
      const favorites = JSON.parse(localStorage.getItem('favoriteProperties') || '[]');
      setIsFavorite(favorites.includes(propertyId));
      
      // Increment view count
      const views = parseInt(localStorage.getItem(`property_views_${propertyId}`) || '0');
      const newViewCount = views + 1;
      localStorage.setItem(`property_views_${propertyId}`, newViewCount.toString());
      setViewCount(newViewCount);
      
      // Track property view
      trackPropertyView(foundProperty);
    }
    setLoading(false);
  }, [propertyId]);

  const trackPropertyView = async (property: Property) => {
    try {
      await fetch('/api/analytics/property-view', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          propertyId: property.id,
          propertyName: property.projectName,
          developer: property.developer,
          area: property.area,
          timestamp: new Date().toISOString()
        }),
      });
    } catch (error) {
      console.error('Failed to track property view:', error);
    }
  };

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteProperties') || '[]');
    let updatedFavorites;
    
    if (isFavorite) {
      updatedFavorites = favorites.filter((id: number) => id !== propertyId);
    } else {
      updatedFavorites = [...favorites, propertyId];
    }
    
    localStorage.setItem('favoriteProperties', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  const handleShare = async (platform: string) => {
    const url = window.location.href;
    const title = `${property?.projectName} by ${property?.developer} - JAY Real Estate`;
    const text = `Check out this amazing property in ${property?.area}, Dubai!`;

    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`);
        break;
      case 'copy':
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        break;
    }
    setShowShareModal(false);
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
    return <IconComponent className="w-5 h-5" />;
  };

  if (loading) {
    return (
      <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-6">The property you're looking for doesn't exist.</p>
          <Link href="/properties" className="btn-primary">
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Properties
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center text-sm text-gray-500">
                <Eye className="w-4 h-4 mr-1" />
                {viewCount} views
              </div>
              
              <button
                onClick={toggleFavorite}
                className={`p-2 rounded-full transition-colors duration-200 ${
                  isFavorite 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
                }`}
              >
                <Heart className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} />
              </button>
              
              <button
                onClick={() => setShowShareModal(true)}
                className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Property Gallery */}
      <PropertyGallery 
        images={[property.image, property.image, property.image, property.image]} 
        propertyName={property.projectName}
        onViewGallery={() => setShowGallery(true)}
      />

      {/* Property Information */}
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-lg"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {property.projectName}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span className="text-lg">{property.location}, {property.area}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Building className="w-5 h-5 mr-2" />
                    <span className="font-medium">{property.developer}</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-semibold mb-2">
                    Off-Plan Project
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {property.completionDate}
                  </div>
                </div>
              </div>

              {/* Property Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {property.bedrooms.length > 1 
                      ? `${property.bedrooms[0]} - ${property.bedrooms[property.bedrooms.length - 1]}`
                      : property.bedrooms[0]
                    }
                  </div>
                  <div className="text-sm text-gray-600">Bedrooms</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{property.propertyTypes.length}</div>
                  <div className="text-sm text-gray-600">Property Types</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{property.amenities.length}+</div>
                  <div className="text-sm text-gray-600">Amenities</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {property.metroConnectivity ? 'Yes' : 'No'}
                  </div>
                  <div className="text-sm text-gray-600">Metro Access</div>
                </div>
              </div>
            </motion.div>

            {/* Property Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Property</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {property.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Property Types</h3>
                  <div className="space-y-2">
                    {property.propertyTypes.map((type, index) => (
                      <div key={index} className="flex items-center">
                        <Building className="w-4 h-4 mr-2 text-blue-600" />
                        <span className="text-gray-600">{type}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Bedroom Options</h3>
                  <div className="space-y-2">
                    {property.bedrooms.map((bedroom, index) => (
                      <div key={index} className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-blue-600" />
                        <span className="text-gray-600">{bedroom}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Amenities */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Amenities & Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-blue-600 mr-3">
                      {getAmenityIcon(amenity)}
                    </div>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-lg sticky top-24"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Interested in this property?</h3>
              
              <div className="space-y-4 mb-6">
                <WhatsAppButton
                  context={{
                    type: 'property',
                    propertyName: property.projectName,
                    propertyType: property.propertyTypes[0],
                    developer: property.developer,
                    area: property.area
                  }}
                  variant="inline"
                  className="w-full"
                />
                
                <button
                  onClick={() => setShowMortgageCalculator(true)}
                  className="w-full flex items-center justify-center px-4 py-3 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors duration-200"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Mortgage Calculator
                </button>
                
                <button
                  onClick={() => setShowComparison(true)}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                >
                  <Building className="w-5 h-5 mr-2" />
                  Compare Properties
                </button>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Phone className="w-4 h-4 mr-2" />
                  +971 55 208 9241
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  info@jayrealestate.ae
                </div>
              </div>
            </motion.div>

            {/* Related Properties */}
            {relatedProperties.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Properties</h3>
                <div className="space-y-4">
                  {relatedProperties.map((relatedProperty) => (
                    <Link
                      key={relatedProperty.id}
                      href={`/properties/${relatedProperty.id}`}
                      className="block group"
                    >
                      <div className="flex space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={relatedProperty.image}
                            alt={relatedProperty.projectName}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-200"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200 truncate">
                            {relatedProperty.projectName}
                          </h4>
                          <p className="text-sm text-gray-600 truncate">{relatedProperty.developer}</p>
                          <p className="text-xs text-gray-500">{relatedProperty.area}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Share Property</h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleShare('whatsapp')}
                  className="flex items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <MessageCircle className="w-5 h-5 mr-2 text-green-600" />
                  WhatsApp
                </button>
                <button
                  onClick={() => handleShare('facebook')}
                  className="flex items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <ExternalLink className="w-5 h-5 mr-2 text-blue-600" />
                  Facebook
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="flex items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <ExternalLink className="w-5 h-5 mr-2 text-sky-600" />
                  Twitter
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="flex items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <ExternalLink className="w-5 h-5 mr-2 text-blue-700" />
                  LinkedIn
                </button>
                <button
                  onClick={() => handleShare('email')}
                  className="flex items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <Mail className="w-5 h-5 mr-2 text-gray-600" />
                  Email
                </button>
                <button
                  onClick={() => handleShare('copy')}
                  className="flex items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <Download className="w-5 h-5 mr-2 text-gray-600" />
                  Copy Link
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Component Modals */}
      {showGallery && (
        <PropertyGallery 
          images={[property.image, property.image, property.image, property.image]}
          propertyName={property.projectName}
          isModal={true}
          onClose={() => setShowGallery(false)}
        />
      )}
      
      {showComparison && (
        <PropertyComparison 
          currentProperty={property}
          onClose={() => setShowComparison(false)}
        />
      )}
      
      {showMortgageCalculator && (
        <MortgageCalculator 
          onClose={() => setShowMortgageCalculator(false)}
        />
      )}
    </div>
  );
}
