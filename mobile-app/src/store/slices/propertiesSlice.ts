import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Property, PropertiesState, SearchFilters } from '../../types';
import { propertyService } from '../../services/propertyService';

// Initial state
const initialState: PropertiesState = {
  properties: [],
  featuredProperties: [],
  searchResults: [],
  currentProperty: null,
  loading: false,
  error: null,
  filters: {},
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
};

// Async thunks
export const fetchFeaturedProperties = createAsyncThunk(
  'properties/fetchFeatured',
  async (_, { rejectWithValue }) => {
    try {
      const response = await propertyService.getFeaturedProperties();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProperties = createAsyncThunk(
  'properties/fetchProperties',
  async (params: { page?: number; limit?: number; filters?: SearchFilters }, { rejectWithValue }) => {
    try {
      const response = await propertyService.getProperties(params);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPropertyById = createAsyncThunk(
  'properties/fetchById',
  async (propertyId: string, { rejectWithValue }) => {
    try {
      const response = await propertyService.getPropertyById(propertyId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchProperties = createAsyncThunk(
  'properties/search',
  async (filters: SearchFilters, { rejectWithValue }) => {
    try {
      const response = await propertyService.searchProperties(filters);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleFavorite = createAsyncThunk(
  'properties/toggleFavorite',
  async (propertyId: string, { rejectWithValue }) => {
    try {
      const response = await propertyService.toggleFavorite(propertyId);
      return { propertyId, isFavorite: response.data.isFavorite };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<SearchFilters>) => {
      state.filters = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    setCurrentProperty: (state, action: PayloadAction<Property | null>) => {
      state.currentProperty = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    updatePropertyInList: (state, action: PayloadAction<Property>) => {
      const property = action.payload;
      
      // Update in properties array
      const propertyIndex = state.properties.findIndex(p => p.id === property.id);
      if (propertyIndex !== -1) {
        state.properties[propertyIndex] = property;
      }
      
      // Update in featured properties
      const featuredIndex = state.featuredProperties.findIndex(p => p.id === property.id);
      if (featuredIndex !== -1) {
        state.featuredProperties[featuredIndex] = property;
      }
      
      // Update in search results
      const searchIndex = state.searchResults.findIndex(p => p.id === property.id);
      if (searchIndex !== -1) {
        state.searchResults[searchIndex] = property;
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch featured properties
    builder
      .addCase(fetchFeaturedProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredProperties = action.payload;
      })
      .addCase(fetchFeaturedProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch properties
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        const { properties, pagination } = action.payload;
        
        if (pagination.page === 1) {
          state.properties = properties;
        } else {
          state.properties = [...state.properties, ...properties];
        }
        
        state.pagination = pagination;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch property by ID
    builder
      .addCase(fetchPropertyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertyById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProperty = action.payload;
      })
      .addCase(fetchPropertyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Search properties
    builder
      .addCase(searchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload.properties;
      })
      .addCase(searchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Toggle favorite
    builder
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const { propertyId, isFavorite } = action.payload;
        
        // Update in all property arrays
        [state.properties, state.featuredProperties, state.searchResults].forEach(array => {
          const property = array.find(p => p.id === propertyId);
          if (property) {
            property.isFavorite = isFavorite;
          }
        });
        
        // Update current property if it matches
        if (state.currentProperty?.id === propertyId) {
          state.currentProperty.isFavorite = isFavorite;
        }
      });
  },
});

export const {
  setFilters,
  clearFilters,
  setCurrentProperty,
  clearError,
  updatePropertyInList,
} = propertiesSlice.actions;

export default propertiesSlice.reducer;
