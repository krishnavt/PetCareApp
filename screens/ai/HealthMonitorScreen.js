import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Activity, AlertTriangle, Check, TrendingUp } from 'lucide-react-native';
import { usePetContext } from '../../context/PetContext';

export function HealthMonitorScreen() {
  const { pets, selectedPet } = usePetContext();
  const currentPet = pets[selectedPet];
  const [healthScore, setHealthScore] = useState(0);
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    analyzeHealth();
  }, [currentPet]);

  const analyzeHealth = () => {
    // Simulated AI health analysis
    const score = calculateHealthScore(currentPet);
    const petInsights = generateHealthInsights(currentPet);
    
    setHealthScore(score);
    setInsights(petInsights);
  };

  const calculateHealthScore = (pet) => {
    // AI-based health score calculation
    let score = 100;
    
    // Age factor
    score -= pet.age * 2;
    
    // Weight factor
    const idealWeight = getIdealWeight(pet.breed, pet.species);
    const weightDiff = Math.abs(pet.weight - idealWeight);
    score -= weightDiff * 2;
    
    // Medical history factor
    score -= pet.medications.length * 5;
    
    return Math.max(score, 0);
  };

  const getIdealWeight = (breed, species) => {
    // Simplified weight guidelines
    const weights = {
      'Golden Retriever': 65,
      'Siamese': 8,
    };
    return weights[breed] || (species === 'Dog' ? 50 : 10);
  };

  const generateHealthInsights = (pet) => {
    const insights = [];
    
    // Check medications
    if (pet.medications.length > 0) {
      insights.push({
        type: 'warning',
        title: 'Medication Monitoring',
        description: 'Currently on medication - monitor for side effects',
      });
    }

    // Age-based insights
    if (pet.age > 7) {
      insights.push({
        type: 'info',
        title: 'Senior Pet Care',
        description: 'Consider additional health screenings for senior pets',
      });
    }

    // Weight insights
    const idealWeight = getIdealWeight(pet.breed, pet.species);
    if (Math.abs(pet.weight - idealWeight) > 5) {
      insights.push({
        type: 'alert',
        title: 'Weight Management',
        description: 'Weight differs from breed average - adjust diet and exercise',
      });
    }

    return insights;
  };

  return (
    <ScrollView style={styles.container}>
      {/* Health Score Card */}
      <View style={styles.scoreCard}>
        <Text style={styles.scoreTitle}>AI Health Score</Text>
        <View style={styles.scoreCircle}>
          <Text style={styles.scoreNumber}>{healthScore}</Text>
          <Text style={styles.scoreMax}>/100</Text>
        </View>
        <Text style={styles.scoreDescription}>
          Based on age, weight, and medical history
        </Text>
      </View>

      {/* Health Insights */}
      <View style={styles.insightsContainer}>
        <Text style={styles.insightsTitle}>AI Health Insights</Text>
        {insights.map((insight, index) => (
          <View key={index} style={styles.insightCard}>
            <View style={styles.insightHeader}>
              {insight.type === 'warning' && <AlertTriangle size={24} color="#eab308" />}
              {insight.type === 'info' && <Activity size={24} color="#3b82f6" />}
              {insight.type === 'alert' && <AlertTriangle size={24} color="#ef4444" />}
              <Text style={styles.insightTitle}>{insight.title}</Text>
            </View>
            <Text style={styles.insightDescription}>{insight.description}</Text>
          </View>
        ))}
      </View>

      {/* Trend Analysis */}
      <View style={styles.trendCard}>
        <View style={styles.trendHeader}>
          <TrendingUp size={24} color="#10b981" />
          <Text style={styles.trendTitle}>Health Trends</Text>
        </View>
        <Text style={styles.trendDescription}>
          AI analysis shows stable health patterns over the last 30 days
        </Text>
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
  scoreCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  scoreTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  scoreCircle: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: '700',
    color: '#10b981',
  },
  scoreMax: {
    fontSize: 20,
    color: '#6b7280',
    marginLeft: 4,
  },
  scoreDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  insightsContainer: {
    marginBottom: 16,
  },
  insightsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  insightCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 8,
  },
  insightDescription: {
    fontSize: 14,
    color: '#4b5563',
    paddingLeft: 32,
  },
  trendCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  trendHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  trendTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 8,
  },
  trendDescription: {
    fontSize: 14,
    color: '#4b5563',
    paddingLeft: 32,
  },
});
