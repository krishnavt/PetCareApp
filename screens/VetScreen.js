import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { MapPin, Clock, Star, Search, Filter, Phone } from 'lucide-react-native';

// Static clinic data
const clinicsData = [
  {
    id: 1,
    name: "Healthy Paws SF",
    location: {
      city: "San Francisco",
      state: "CA",
      address: "123 Pet Care Lane",
      zip: "94105",
    },
    rating: 4.8,
    waitTime: "15 mins",
    services: ["General Care", "Surgery", "Dental"],
    doctors: 5,
    isOpen: true
  },
  {
    id: 2,
    name: "Manhattan Pet Hospital",
    location: {
      city: "New York",
      state: "NY",
      address: "456 Vet Street",
      zip: "10001",
    },
    rating: 4.9,
    waitTime: "20 mins",
    services: ["Emergency Care", "General Care", "Dental"],
    doctors: 8,
    isOpen: true
  },
  {
    id: 3,
    name: "Chicago Pet Wellness",
    location: {
      city: "Chicago",
      state: "IL",
      address: "789 Animal Ave",
      zip: "60601",
    },
    rating: 4.7,
    waitTime: "10 mins",
    services: ["General Care", "Vaccination", "Grooming"],
    doctors: 4,
    isOpen: true
  }
];

export function VetScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredClinics, setFilteredClinics] = useState(clinicsData);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = clinicsData.filter(clinic => 
      clinic.name.toLowerCase().includes(text.toLowerCase()) ||
      clinic.location.city.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredClinics(filtered);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star 
        key={index}
        size={16}
        color={index < Math.floor(rating) ? '#fbbf24' : '#e5e7eb'}
        fill={index < Math.floor(rating) ? '#fbbf24' : 'none'}
      />
    ));
  };

  return (
    <ScrollView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#6b7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search clinics..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#3b82f6" />
        </TouchableOpacity>
      </View>

      {/* Clinics List */}
      {filteredClinics.map(clinic => (
        <View key={clinic.id} style={styles.clinicCard}>
          <View style={styles.clinicHeader}>
            <Text style={styles.clinicName}>{clinic.name}</Text>
            {clinic.isOpen && (
              <View style={styles.openBadge}>
                <Text style={styles.openText}>Open</Text>
              </View>
            )}
          </View>

          <View style={styles.locationContainer}>
            <MapPin size={16} color="#6b7280" />
            <Text style={styles.locationText}>
              {clinic.location.address}, {clinic.location.city}, {clinic.location.state}
            </Text>
          </View>

          <View style={styles.ratingContainer}>
            <View style={styles.stars}>
              {renderStars(clinic.rating)}
              <Text style={styles.ratingText}>{clinic.rating}</Text>
            </View>
            <View style={styles.waitTime}>
              <Clock size={16} color="#6b7280" />
              <Text style={styles.waitTimeText}>Wait: {clinic.waitTime}</Text>
            </View>
          </View>

          <View style={styles.servicesContainer}>
            {clinic.services.map((service, index) => (
              <View key={index} style={styles.serviceBadge}>
                <Text style={styles.serviceText}>{service}</Text>
              </View>
            ))}
          </View>

          <View style={styles.doctorsInfo}>
            <Text style={styles.doctorsText}>
              {clinic.doctors} Veterinarians Available
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.appointmentButton}>
              <Text style={styles.buttonText}>Book Appointment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.callButton}>
              <Phone size={20} color="#3b82f6" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  filterButton: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
    justifyContent: 'center',
  },
  clinicCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  clinicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  clinicName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  openBadge: {
    backgroundColor: '#10b981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  openText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    marginLeft: 8,
    color: '#6b7280',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  stars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    color: '#6b7280',
  },
  waitTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  waitTimeText: {
    marginLeft: 4,
    color: '#6b7280',
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  serviceBadge: {
    backgroundColor: '#e0f2fe',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  serviceText: {
    color: '#3b82f6',
    fontSize: 12,
  },
  doctorsInfo: {
    marginBottom: 12,
  },
  doctorsText: {
    color: '#6b7280',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appointmentButton: {
    flex: 1,
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginRight: 8,
  },
  callButton: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});
