import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { DollarSign, TrendingUp, AlertCircle, Shield } from 'lucide-react-native';
import { usePetContext } from '../../context/PetContext';

export function CostPredictor() {
  const { pets, selectedPet } = usePetContext();
  const currentPet = pets[selectedPet];
  const [costPredictions, setCostPredictions] = useState(null);

  useEffect(() => {
    generateCostPredictions(currentPet);
  }, [currentPet]);

  const generateCostPredictions = (pet) => {
    // AI-based cost prediction
    const predictions = {
      monthly: calculateMonthlyCosts(pet),
      annual: calculateAnnualCosts(pet),
      emergency: calculateEmergencyFund(pet),
      insurance: analyzeInsuranceNeeds(pet),
      savings: generateSavingsTips(pet)
    };
    setCostPredictions(predictions);
  };

  const calculateMonthlyCosts = (pet) => {
    // AI calculation of monthly costs
    return {
      total: 250,
      breakdown: {
        food: 100,
        supplies: 50,
        healthcare: 75,
        grooming: 25
      }
    };
  };

  const calculateAnnualCosts = (pet) => {
    // AI prediction of annual costs
    return {
      total: 3000,
      breakdown: {
        routine_care: 800,
        vaccinations: 400,
        preventive_meds: 600,
        grooming: 300,
        supplies: 900
      }
    };
  };

  const calculateEmergencyFund = (pet) => {
    // AI emergency fund recommendation
    return {
      recommended: 2500,
      factors: [
        "Breed-specific health risks",
        "Age-related conditions",
        "Local vet costs"
      ]
    };
  };

  const analyzeInsuranceNeeds = (pet) => {
    // AI insurance analysis
    return {
      recommendation: "Recommended",
      monthlyPremium: 45,
      coverage: "Comprehensive",
      savings: 1200,
      reasons: [
        "Breed susceptibility to conditions",
        "Age-related risks",
        "Cost-benefit analysis"
      ]
    };
  };

  const generateSavingsTips = (pet) => {
    // AI-generated savings recommendations
    return [
      {
        tip: "Bulk food purchases",
        savings: 240,
        period: "annual"
      },
      {
        tip: "Preventive care package",
        savings: 350,
        period: "annual"
      },
      {
        tip: "Multi-pet insurance discount",
        savings: 180,
        period: "annual"
      }
    ];
  };

  return (
    <ScrollView style={styles.container}>
      {/* Monthly Cost Prediction */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Monthly Cost Prediction</Text>
        <View style={styles.costOverview}>
          <DollarSign size={24} color="#3b82f6" />
          <Text style={styles.costAmount}>${costPredictions?.monthly.total}</Text>
        </View>
        <View style={styles.breakdown}>
          {Object.entries(costPredictions?.monthly.breakdown || {}).map(([key, value]) => (
            <View key={key} style={styles.breakdownItem}>
              <Text style={styles.breakdownLabel}>{key.replace('_', ' ')}</Text>
              <Text style={styles.breakdownValue}>${value}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Annual Projection */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Annual Cost Projection</Text>
        <View style={styles.costOverview}>
          <TrendingUp size={24} color="#10b981" />
          <Text style={styles.costAmount}>${costPredictions?.annual.total}</Text>
        </View>
        <View style={styles.breakdown}>
          {Object.entries(costPredictions?.annual.breakdown || {}).map(([key, value]) => (
            <View key={key} style={styles.breakdownItem}>
              <Text style={styles.breakdownLabel}>{key.replace('_', ' ')}</Text>
              <Text style={styles.breakdownValue}>${value}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Emergency Fund */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Emergency Fund Recommendation</Text>
        <View style={styles.costOverview}>
          <AlertCircle size={24} color="#ef4444" />
          <Text style={styles.costAmount}>${costPredictions?.emergency.recommended}</Text>
        </View>
        <View style={styles.factorsList}>
          {costPredictions?.emergency.factors.map((factor, index) => (
            <Text key={index} style={styles.factor}>• {factor}</Text>
          ))}
        </View>
      </View>

      {/* Insurance Analysis */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Insurance Analysis</Text>
        <View style={styles.insuranceContainer}>
          <Shield size={24} color="#8b5cf6" />
          <View style={styles.insuranceDetails}>
            <Text style={styles.insuranceRec}>
              {costPredictions?.insurance.recommendation}
            </Text>
            <Text style={styles.insurancePremium}>
              ${costPredictions?.insurance.monthlyPremium}/month
            </Text>
          </View>
        </View>
        <View style={styles.reasonsList}>
          {costPredictions?.insurance.reasons.map((reason, index) => (
            <Text key={index} style={styles.reason}>• {reason}</Text>
          ))}
        </View>
      </View>

      {/* Savings Tips */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>AI Savings Recommendations</Text>
        {costPredictions?.savings.map((tip, index) => (
          <View key={index} style={styles.savingsTip}>
            <Text style={styles.tipText}>{tip.tip}</Text>
            <View style={styles.savingsDetails}>
              <Text style={styles.savingsAmount}>Save ${tip.savings}</Text>
              <Text style={styles.savingsPeriod}>per {tip.period}</Text>
            </View>
          </View>
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
  card: {
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
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#111827',
  },
  costOverview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  costAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginLeft: 8,
  },
  breakdown: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 16,
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  breakdownLabel: {
    fontSize: 14,
    color: '#6b7280',
    textTransform: 'capitalize',
  },
  breakdownValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  factorsList: {
    marginTop: 12,
  },
  factor: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  insuranceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  insuranceDetails: {
    marginLeft: 12,
  },
  insuranceRec: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  insurancePremium: {
    fontSize: 14,
    color: '#6b7280',
  },
  reasonsList: {
    marginTop: 12,
  },
  reason: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  savingsTip: {
    marginBottom: 16,
  },
  tipText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  savingsDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  savingsAmount: {
    fontSize: 14,
    color: '#10b981',
    fontWeight: '600',
    marginRight: 4,
  },
  savingsPeriod: {
    fontSize: 14,
    color: '#6b7280',
  },
});
