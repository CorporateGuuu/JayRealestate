// Property Types
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  propertyType: 'apartment' | 'villa' | 'townhouse' | 'penthouse' | 'duplex';
  status?: 'new' | 'featured' | 'sold' | 'rented';
  images: string[];
  developer: string;
  developerId: string;
  amenities: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  completionDate?: string;
  isFavorite: boolean;
  isOffPlan: boolean;
  createdAt: string;
  updatedAt: string;
}

// Developer Types
export interface Developer {
  id: string;
  name: string;
  logo: string;
  description?: string;
  established?: string;
  projects?: string[];
  website?: string;
  contact?: {
    phone: string;
    email: string;
    address: string;
  };
}

// Service Types
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features?: string[];
}

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  comment: string;
  property?: string;
  date: string;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  preferences: {
    currency: 'AED' | 'USD' | 'EUR';
    language: 'en' | 'ar';
    notifications: {
      push: boolean;
      email: boolean;
      sms: boolean;
    };
  };
  favorites: string[];
  searches: SavedSearch[];
  createdAt: string;
}

// Search Types
export interface SearchFilters {
  location?: string;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: string;
  bathrooms?: number;
  minArea?: number;
  maxArea?: number;
  developer?: string;
  amenities?: string[];
  isOffPlan?: boolean;
}

export interface SavedSearch {
  id: string;
  name: string;
  filters: SearchFilters;
  alertsEnabled: boolean;
  createdAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PropertySearchResponse {
  properties: Property[];
  total: number;
  filters: {
    locations: string[];
    propertyTypes: string[];
    priceRanges: { min: number; max: number }[];
    developers: Developer[];
  };
}

// Contact Types
export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyId?: string;
  inquiryType: 'general' | 'property' | 'investment' | 'consultation';
}

// Navigation Types
export interface PropertyDetailParams {
  propertyId: string;
}

// Redux State Types
export interface PropertiesState {
  properties: Property[];
  featuredProperties: Property[];
  searchResults: Property[];
  currentProperty: Property | null;
  loading: boolean;
  error: string | null;
  filters: SearchFilters;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface AppState {
  isOnboardingCompleted: boolean;
  theme: 'light' | 'dark';
  language: 'en' | 'ar';
  networkStatus: 'online' | 'offline';
}

// Utility Types
export type PropertyStatus = 'available' | 'sold' | 'rented' | 'off-market';
export type InquiryType = 'buy' | 'rent' | 'sell' | 'consultation';
export type SortOption = 'price-asc' | 'price-desc' | 'date-desc' | 'area-desc';

// Form Types
export interface PropertyInquiry {
  propertyId: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  inquiryType: InquiryType;
  preferredContactTime?: string;
}

// Notification Types
export interface PushNotification {
  id: string;
  title: string;
  body: string;
  data?: {
    propertyId?: string;
    type: 'property_alert' | 'price_change' | 'new_property' | 'general';
  };
  timestamp: string;
  read: boolean;
}

// Location Types
export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

export interface LocationInfo {
  coordinates: LocationCoordinates;
  address: string;
  city: string;
  country: string;
  postalCode?: string;
}
