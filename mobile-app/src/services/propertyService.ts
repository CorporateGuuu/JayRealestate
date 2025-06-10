import axios from 'axios';
import { Property, SearchFilters, ApiResponse, PropertySearchResponse } from '../types';

// API Configuration
const API_BASE_URL = __DEV__ 
  ? 'http://localhost:3000/api' 
  : 'https://jay-real-estate.vercel.app/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    // const token = getAuthToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      // logout();
    }
    return Promise.reject(error);
  }
);

export const propertyService = {
  // Get featured properties
  getFeaturedProperties: async (): Promise<ApiResponse<Property[]>> => {
    try {
      const response = await apiClient.get('/properties/featured');
      return response.data;
    } catch (error) {
      // Fallback to mock data for development
      return {
        success: true,
        data: mockFeaturedProperties,
      };
    }
  },

  // Get all properties with pagination and filters
  getProperties: async (params: {
    page?: number;
    limit?: number;
    filters?: SearchFilters;
  }): Promise<ApiResponse<{ properties: Property[]; pagination: any }>> => {
    try {
      const response = await apiClient.get('/properties', { params });
      return response.data;
    } catch (error) {
      // Fallback to mock data
      return {
        success: true,
        data: {
          properties: mockProperties,
          pagination: {
            page: params.page || 1,
            limit: params.limit || 10,
            total: mockProperties.length,
          },
        },
      };
    }
  },

  // Get property by ID
  getPropertyById: async (propertyId: string): Promise<ApiResponse<Property>> => {
    try {
      const response = await apiClient.get(`/properties/${propertyId}`);
      return response.data;
    } catch (error) {
      // Fallback to mock data
      const property = mockProperties.find(p => p.id === propertyId);
      if (property) {
        return { success: true, data: property };
      }
      throw new Error('Property not found');
    }
  },

  // Search properties
  searchProperties: async (filters: SearchFilters): Promise<ApiResponse<PropertySearchResponse>> => {
    try {
      const response = await apiClient.post('/properties/search', filters);
      return response.data;
    } catch (error) {
      // Fallback to mock search
      const filteredProperties = mockProperties.filter(property => {
        if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) {
          return false;
        }
        if (filters.propertyType && property.propertyType !== filters.propertyType) {
          return false;
        }
        if (filters.minPrice && property.price < filters.minPrice) {
          return false;
        }
        if (filters.maxPrice && property.price > filters.maxPrice) {
          return false;
        }
        return true;
      });

      return {
        success: true,
        data: {
          properties: filteredProperties,
          total: filteredProperties.length,
          filters: {
            locations: ['Downtown Dubai', 'Dubai Marina', 'Palm Jumeirah'],
            propertyTypes: ['apartment', 'villa', 'townhouse'],
            priceRanges: [
              { min: 0, max: 1000000 },
              { min: 1000000, max: 5000000 },
              { min: 5000000, max: 10000000 },
            ],
            developers: [],
          },
        },
      };
    }
  },

  // Toggle favorite status
  toggleFavorite: async (propertyId: string): Promise<ApiResponse<{ isFavorite: boolean }>> => {
    try {
      const response = await apiClient.post(`/properties/${propertyId}/favorite`);
      return response.data;
    } catch (error) {
      // Mock toggle favorite
      return {
        success: true,
        data: { isFavorite: Math.random() > 0.5 },
      };
    }
  },

  // Submit property inquiry
  submitInquiry: async (inquiry: any): Promise<ApiResponse<{ success: boolean }>> => {
    try {
      const response = await apiClient.post('/inquiries', inquiry);
      return response.data;
    } catch (error) {
      return {
        success: true,
        data: { success: true },
      };
    }
  },
};

// Mock data for development
const mockFeaturedProperties: Property[] = [
  {
    id: '1',
    title: 'Luxury Apartment in Downtown Dubai',
    description: 'Stunning 2-bedroom apartment with Burj Khalifa views',
    price: 2500000,
    location: 'Downtown Dubai',
    area: 1200,
    bedrooms: 2,
    bathrooms: 2,
    propertyType: 'apartment',
    status: 'featured',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    ],
    developer: 'EMAAR',
    developerId: '1',
    amenities: ['Pool', 'Gym', 'Parking', 'Security'],
    coordinates: { latitude: 25.1972, longitude: 55.2744 },
    isFavorite: false,
    isOffPlan: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'Beachfront Villa in Palm Jumeirah',
    description: 'Exclusive 4-bedroom villa with private beach access',
    price: 8500000,
    location: 'Palm Jumeirah',
    area: 3500,
    bedrooms: 4,
    bathrooms: 5,
    propertyType: 'villa',
    status: 'new',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
    ],
    developer: 'NAKHEEL',
    developerId: '2',
    amenities: ['Private Beach', 'Pool', 'Garden', 'Maid Room'],
    coordinates: { latitude: 25.1124, longitude: 55.1390 },
    isFavorite: true,
    isOffPlan: false,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
];

const mockProperties: Property[] = [...mockFeaturedProperties];
