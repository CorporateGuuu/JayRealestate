import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

import SearchForm from '../components/SearchForm';
import PropertyCard from '../components/PropertyCard';
import DeveloperCard from '../components/DeveloperCard';
import ServiceCard from '../components/ServiceCard';
import TestimonialCard from '../components/TestimonialCard';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchFeaturedProperties } from '../store/slices/propertiesSlice';
import { Property, Developer, Service, Testimonial } from '../types';

const { width, height } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { featuredProperties, loading } = useAppSelector(state => state.properties);
  const [refreshing, setRefreshing] = useState(false);

  const developers: Developer[] = [
    { id: '1', name: 'EMAAR', logo: 'emaar-logo' },
    { id: '2', name: 'NAKHEEL', logo: 'nakheel-logo' },
    { id: '3', name: 'MERAAS', logo: 'meraas-logo' },
    { id: '4', name: 'SOBHA', logo: 'sobha-logo' },
    { id: '5', name: 'BINGHATTI', logo: 'binghatti-logo' },
  ];

  const services: Service[] = [
    {
      id: '1',
      title: 'Property Investment',
      description: 'Expert guidance for property investment in Dubai',
      icon: 'trending-up',
    },
    {
      id: '2',
      title: 'Property Management',
      description: 'Complete property management services',
      icon: 'business',
    },
    {
      id: '3',
      title: 'Legal Consultation',
      description: 'Legal support for property transactions',
      icon: 'gavel',
    },
  ];

  useEffect(() => {
    dispatch(fetchFeaturedProperties());
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchFeaturedProperties());
    setRefreshing(false);
  };

  const renderHeroSection = () => (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800' }}
      style={styles.heroContainer}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.6)']}
        style={styles.heroGradient}
      >
        <SafeAreaView style={styles.heroContent}>
          <View style={styles.heroHeader}>
            <Text style={styles.heroTitle}>Find Your</Text>
            <Text style={styles.heroTitleAccent}>Dream Home</Text>
            <Text style={styles.heroSubtitle}>in Dubai</Text>
          </View>
          
          <Text style={styles.heroDescription}>
            Discover premium off-plan properties in Dubai's most prestigious locations
          </Text>

          <SearchForm />

          <View style={styles.heroActions}>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Browse Properties</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Contact Us</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );

  const renderFeaturedProperties = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Featured Properties</Text>
      <Text style={styles.sectionSubtitle}>
        Handpicked premium properties in Dubai's prime locations
      </Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalScroll}
      >
        {featuredProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </ScrollView>
    </View>
  );

  const renderDevelopers = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Best Real Estate Developers</Text>
      <View style={styles.developersGrid}>
        {developers.map((developer) => (
          <DeveloperCard key={developer.id} developer={developer} />
        ))}
      </View>
    </View>
  );

  const renderServices = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Our Services</Text>
      <Text style={styles.sectionSubtitle}>
        Comprehensive real estate services tailored to your needs
      </Text>
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {renderHeroSection()}
      {renderFeaturedProperties()}
      {renderDevelopers()}
      {renderServices()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  heroContainer: {
    height: height * 0.8,
    justifyContent: 'center',
  },
  heroGradient: {
    flex: 1,
    justifyContent: 'center',
  },
  heroContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  heroHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  heroTitleAccent: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fbbf24',
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 24,
    fontWeight: '500',
    color: '#93c5fd',
    textAlign: 'center',
    marginTop: 8,
  },
  heroDescription: {
    fontSize: 16,
    color: '#e5e7eb',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  heroActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  primaryButton: {
    backgroundColor: '#1e40af',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 0.45,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#ffffff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 0.45,
  },
  secondaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 20,
    lineHeight: 24,
  },
  horizontalScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  developersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
