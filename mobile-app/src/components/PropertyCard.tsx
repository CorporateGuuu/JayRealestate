import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Property } from '../types';
import { RootStackParamList } from '../navigation/AppNavigator';

interface PropertyCardProps {
  property: Property;
  onFavoritePress?: (propertyId: string) => void;
}

type NavigationProp = StackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;

const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  onFavoritePress 
}) => {
  const navigation = useNavigation<NavigationProp>();

  const handlePress = () => {
    navigation.navigate('PropertyDetail', { propertyId: property.id });
  };

  const handleFavoritePress = () => {
    onFavoritePress?.(property.id);
  };

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)}M AED`;
    }
    return `${(price / 1000).toFixed(0)}K AED`;
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <FastImage
          source={{ 
            uri: property.images[0] || 'https://via.placeholder.com/400x300',
            priority: FastImage.priority.normal,
          }}
          style={styles.image}
          resizeMode={FastImage.resizeMode.cover}
        />
        
        {/* Favorite Button */}
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={handleFavoritePress}
        >
          <Icon 
            name={property.isFavorite ? 'favorite' : 'favorite-border'} 
            size={24} 
            color={property.isFavorite ? '#ef4444' : '#ffffff'} 
          />
        </TouchableOpacity>

        {/* Property Status Badge */}
        {property.status && (
          <View style={[styles.statusBadge, 
            property.status === 'new' && styles.newBadge,
            property.status === 'featured' && styles.featuredBadge
          ]}>
            <Text style={styles.statusText}>
              {property.status.toUpperCase()}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>
            {property.title}
          </Text>
          <Text style={styles.price}>
            {formatPrice(property.price)}
          </Text>
        </View>

        <View style={styles.location}>
          <Icon name="location-on" size={16} color="#6b7280" />
          <Text style={styles.locationText} numberOfLines={1}>
            {property.location}
          </Text>
        </View>

        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Icon name="bed" size={16} color="#6b7280" />
            <Text style={styles.detailText}>{property.bedrooms}</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="bathtub" size={16} color="#6b7280" />
            <Text style={styles.detailText}>{property.bathrooms}</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="square-foot" size={16} color="#6b7280" />
            <Text style={styles.detailText}>{property.area} sq ft</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.developer}>
            <Text style={styles.developerText}>by {property.developer}</Text>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="phone" size={18} color="#1e40af" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="message" size={18} color="#1e40af" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  imageContainer: {
    position: 'relative',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  newBadge: {
    backgroundColor: '#10b981',
  },
  featuredBadge: {
    backgroundColor: '#f59e0b',
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e40af',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 4,
    flex: 1,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  developer: {
    flex: 1,
  },
  developerText: {
    fontSize: 12,
    color: '#9ca3af',
    fontStyle: 'italic',
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});

export default PropertyCard;
