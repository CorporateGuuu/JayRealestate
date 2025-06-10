import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNPickerSelect from 'react-native-picker-select';

interface SearchFormProps {
  onSearch?: (searchData: SearchData) => void;
}

interface SearchData {
  location: string;
  propertyType: string;
  bedrooms: string;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [searchData, setSearchData] = useState<SearchData>({
    location: '',
    propertyType: '',
    bedrooms: '',
  });
  const [showModal, setShowModal] = useState(false);

  const locations = [
    { label: 'All Locations', value: '' },
    { label: 'Downtown Dubai', value: 'downtown' },
    { label: 'Dubai Marina', value: 'marina' },
    { label: 'Palm Jumeirah', value: 'palm' },
    { label: 'Business Bay', value: 'business-bay' },
    { label: 'DIFC', value: 'difc' },
    { label: 'JBR', value: 'jbr' },
  ];

  const propertyTypes = [
    { label: 'All Types', value: '' },
    { label: 'Apartment', value: 'apartment' },
    { label: 'Villa', value: 'villa' },
    { label: 'Townhouse', value: 'townhouse' },
    { label: 'Penthouse', value: 'penthouse' },
    { label: 'Duplex', value: 'duplex' },
  ];

  const bedroomOptions = [
    { label: 'Any Bedrooms', value: '' },
    { label: '1 Bedroom', value: '1' },
    { label: '2 Bedrooms', value: '2' },
    { label: '3 Bedrooms', value: '3' },
    { label: '4+ Bedrooms', value: '4+' },
  ];

  const handleSearch = () => {
    onSearch?.(searchData);
    setShowModal(false);
  };

  const QuickSearchButton = () => (
    <TouchableOpacity
      style={styles.quickSearchButton}
      onPress={() => setShowModal(true)}
    >
      <Icon name="search" size={20} color="#6b7280" />
      <Text style={styles.quickSearchText}>Search properties...</Text>
      <Icon name="tune" size={20} color="#6b7280" />
    </TouchableOpacity>
  );

  const FullSearchModal = () => (
    <Modal
      visible={showModal}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setShowModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setShowModal(false)}>
            <Icon name="close" size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Search Properties</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={styles.modalContent}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Location</Text>
            <View style={styles.pickerContainer}>
              <Icon name="location-on" size={20} color="#6b7280" style={styles.pickerIcon} />
              <RNPickerSelect
                onValueChange={(value) => setSearchData({ ...searchData, location: value })}
                items={locations}
                style={pickerSelectStyles}
                placeholder={{ label: 'Select location...', value: '' }}
                value={searchData.location}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Property Type</Text>
            <View style={styles.pickerContainer}>
              <Icon name="home" size={20} color="#6b7280" style={styles.pickerIcon} />
              <RNPickerSelect
                onValueChange={(value) => setSearchData({ ...searchData, propertyType: value })}
                items={propertyTypes}
                style={pickerSelectStyles}
                placeholder={{ label: 'Select property type...', value: '' }}
                value={searchData.propertyType}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Bedrooms</Text>
            <View style={styles.pickerContainer}>
              <Icon name="bed" size={20} color="#6b7280" style={styles.pickerIcon} />
              <RNPickerSelect
                onValueChange={(value) => setSearchData({ ...searchData, bedrooms: value })}
                items={bedroomOptions}
                style={pickerSelectStyles}
                placeholder={{ label: 'Select bedrooms...', value: '' }}
                value={searchData.bedrooms}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Icon name="search" size={20} color="#ffffff" />
            <Text style={styles.searchButtonText}>Search Properties</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <QuickSearchButton />
      <FullSearchModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  quickSearchButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickSearchText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#6b7280',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
  },
  pickerIcon: {
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: '#1e40af',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 20,
  },
  searchButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: '#374151',
    paddingRight: 30,
    flex: 1,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: '#374151',
    paddingRight: 30,
    flex: 1,
  },
});

export default SearchForm;
