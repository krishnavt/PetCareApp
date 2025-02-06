import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Activity, AlertTriangle } from 'lucide-react-native';
import { usePetContext } from '../../context/PetContext';

function HealthMonitorScreen() {
  const { pets, selectedPet } = usePetContext();
  const currentPet = pets[selectedPet];
  const [healthScore, setHealthScore] = useState(85);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.scoreCard}>
        <Text style={styles.scoreTitle}>AI Health Score</Text>
        <Text style={styles.scoreValue}>{healthScore}</Text>
        <Text style={styles.scoreSubtitle}>Overall Health Status</Text>
      </View>

      <View style={styles.insightsCard}>
        <Text style={styles.cardTitle}>Health Insights</Text>
        <View style={styles.insightItem}>
          <Activity size={24} color="#3b82f6" />
          <Text style={styles.insightText}>Activity level normal for breed</Text>
        </View>
        <View style={styles.insightItem}>
          <AlertTriangle size={24} color="#ef4444" />
          <Text style={styles.insightText}>Vaccination due in 2 weeks</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  scoreCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  scoreSubtitle: {
    color: '#666',
    marginTop: 8,
  },
  insightsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  insightText: {
    marginLeft: 12,
    fontSize: 16,
  },
});

export default HealthMonitorScreen;
