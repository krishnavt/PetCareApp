import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { MapPin, Clock, Star, Search, Filter } from 'lucide-react-native';
import { usePetContext } from '../../context/PetContext';

export function SmartClinicScreen() {
  const { pets, selectedPet } = usePetContext();
  const currentPet = pets[selectedPet];
  const [recommendedClinics, setRecommendedClinics] = useState([]);

  const getSmartRecommendations = (pet) => {
    // AI logic to recommend clinics based on:
    // 1. Pet's medical history
    // 2. Species-specific needs
    // 3. Location/proximity
    // 4. Available specialists
    // 5. Wait times
    // 6. Previous visit history
    return recommendClinics(pet);
  };

  const recommendClinics = (pet) => {
    // AI scoring system for clinics
    return clinicsData.clinics.map(clinic => ({
      ...clinic,
      aiScore: calculateClinicScore(clinic, pet),
      matchReasons: getMatchReasons(clinic, pet)
    })).sort((a, b) => b.aiScore - a.aiScore);
  };

  const calculateClinicScore = (clinic, pet) => {
    let score = 0;
    
    // Species specialization
    if (clinic.specialties.includes(pet.species)) score += 20;
    
    // Breed-specific expertise
    if (clinic.specialties.includes(pet.breed)) score += 15;
    
    // Wait time factor
    const waitTime = parseInt(clinic.waitTime);
    score += Math.max(0, 20 - waitTime);
    
    // Rating factor
    score += clinic.rating * 10;
    
    return score;
  };

  const getMatchReasons = (clinic, pet) => {
    const reasons = [];
    
    if (clinic.specialties.includes(pet.species)) {
      reasons.push(`Specialized in ${pet.species} care`);
    }
    
    if (clinic.specialties.includes(pet.breed)) {
      reasons.push(`Experience with ${pet.breed}s`);
    }
    
    return reasons;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Search size={20} color="#6b7280" />
          <Text style={styles.searchPlaceholder}>Search clinics...</Text>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#3b82f6" />
        </TouchableOpacity>
      </View>

      <View style={styles.recommendationsSection}>
        <Text style={styles.sectionTitle}>
          AI-Recommended Clinics for {currentPet.name}
        </Text>
        
        {recommendedClinics.map(clinic => (
          <TouchableOpacity key={clinic.id} style={styles.clinicCard}>
            <View style={styles.clinicHeader}>
              <Text style={styles.clinicName}>{clinic.name}</Text>
              <View style={styles.matchScore}>
                <Text style={styles.matchScoreText}>
                  {Math.round(clinic.aiScore)}% Match
                </Text>
              </View>
            </View>

            <View style={styles.locationInfo}>
              <MapPin size={16} color="#6b7280" />
              <Text style={styles.locationText}>
                {clinic.location.city}, {clinic.location.state}
              </Text>
            </View>

            <View style={styles.clinicDetails}>
              <View style={styles.detailItem}>
                <Clock size={16} color="#6b7280" />
                <Text style={styles.detailText}>
                  Wait time: {clinic.waitTime}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Star size={16} color="#fbbf24" />
                <Text style={styles.detailText}>
                  {clinic.rating.toFixed(1)}
                </Text>
              </View>
            </View>

            <View style={styles.matchReasons}>
              {clinic.matchReasons.map((reason, index) => (
                <View key={index} style={styles.reasonBadge}>
                  <Text style={styles.reasonText}>{reason}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.bookButton}>
              <Text style={styles.bookButtonText}>Book Appointment</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 16,
  },
  searchSection: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
  },
  searchPlaceholder: {
    marginLeft: 8,
    color: '#6b7280',
  },
  filterButton: {
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  recommendationsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  clinicCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
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
  },
  matchScore: {
    backgroundColor: '#10b981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  matchScoreText: {
    color: 'white',
    fontWeight: '600',
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    marginLeft: 8,
    color: '#6b7280',
  },
  clinicDetails: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    marginLeft: 4,
    color: '#6b7280',
  },
  matchReasons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  reasonBadge: {
    backgroundColor: '#e0f2fe',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  reasonText: {
    color: '#3b82f6',
    fontSize: 12,
  },
  bookButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});
