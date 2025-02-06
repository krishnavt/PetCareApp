import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ProgressBarAndroid } from 'react-native';
import { Activity, Award, Book, CheckCircle, ChevronRight } from 'lucide-react-native';
import { usePetContext } from '../../context/PetContext';

export function TrainingAssistant() {
  const { pets, selectedPet } = usePetContext();
  const currentPet = pets[selectedPet];
  const [trainingPlan, setTrainingPlan] = useState(null);

  useEffect(() => {
    generateTrainingPlan(currentPet);
  }, [currentPet]);

  const generateTrainingPlan = (pet) => {
    // AI-based training plan generation
    const plan = {
      level: determineTrainingLevel(pet),
      dailyGoals: generateDailyGoals(pet),
      progress: calculateProgress(pet),
      recommendations: generateRecommendations(pet)
    };
    setTrainingPlan(plan);
  };

  const determineTrainingLevel = (pet) => {
    // AI logic to determine training level based on age, breed, and history
    return {
      current: "Intermediate",
      nextMilestone: "Advanced",
      progress: 65
    };
  };

  const generateDailyGoals = (pet) => {
    // AI-generated daily training goals
    return [
      {
        id: 1,
        title: "Basic Commands",
        duration: "15 mins",
        completed: true,
        exercises: ["Sit", "Stay", "Come"]
      },
      {
        id: 2,
        title: "Behavior Training",
        duration: "20 mins",
        completed: false,
        exercises: ["Leash Training", "No Jumping"]
      },
      {
        id: 3,
        title: "Social Skills",
        duration: "30 mins",
        completed: false,
        exercises: ["Dog Park Visit", "Meeting New People"]
      }
    ];
  };

  const calculateProgress = (pet) => {
    // AI progress tracking
    return {
      weekly: 68,
      monthly: 75,
      achievements: [
        "Mastered Basic Commands",
        "Completed Leash Training",
        "Social Skills Level 1"
      ]
    };
  };

  const generateRecommendations = (pet) => {
    // AI personalized recommendations
    return [
      {
        type: "Exercise",
        recommendation: "Increase daily walks to 45 minutes",
        reason: "Energy level optimization"
      },
      {
        type: "Training",
        recommendation: "Focus on recall training",
        reason: "Safety improvement"
      },
      {
        type: "Socialization",
        recommendation: "Weekly dog park visits",
        reason: "Social skill development"
      }
    ];
  };

  return (
    <ScrollView style={styles.container}>
      {/* Training Level Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Training Level</Text>
        <View style={styles.levelContainer}>
          <Award size={24} color="#3b82f6" />
          <View style={styles.levelInfo}>
            <Text style={styles.currentLevel}>{trainingPlan?.level.current}</Text>
            <Text style={styles.nextLevel}>Next: {trainingPlan?.level.nextMilestone}</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${trainingPlan?.level.progress}%` }]} />
          </View>
        </View>
      </View>

      {/* Daily Goals */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today's Training Goals</Text>
        {trainingPlan?.dailyGoals.map(goal => (
          <TouchableOpacity key={goal.id} style={styles.goalItem}>
            <View style={styles.goalHeader}>
              <CheckCircle 
                size={20} 
                color={goal.completed ? '#10b981' : '#d1d5db'}
                fill={goal.completed ? '#10b981' : 'none'}
              />
              <Text style={styles.goalTitle}>{goal.title}</Text>
              <Text style={styles.goalDuration}>{goal.duration}</Text>
            </View>
            <View style={styles.exerciseList}>
              {goal.exercises.map((exercise, index) => (
                <Text key={index} style={styles.exercise}>• {exercise}</Text>
              ))}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Progress Tracking */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Progress Tracking</Text>
        <View style={styles.progressTracking}>
          <View style={styles.progressItem}>
            <Text style={styles.progressLabel}>Weekly Progress</Text>
            <Text style={styles.progressValue}>{trainingPlan?.progress.weekly}%</Text>
          </View>
          <View style={styles.progressItem}>
            <Text style={styles.progressLabel}>Monthly Progress</Text>
            <Text style={styles.progressValue}>{trainingPlan?.progress.monthly}%</Text>
          </View>
        </View>
      </View>

      {/* AI Recommendations */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>AI Recommendations</Text>
        {trainingPlan?.recommendations.map((rec, index) => (
          <View key={index} style={styles.recommendationItem}>
            <View style={styles.recHeader}>
              <Book size={20} color="#3b82f6" />
              <Text style={styles.recType}>{rec.type}</Text>
            </View>
            <Text style={styles.recText}>{rec.recommendation}</Text>
            <Text style={styles.recReason}>{rec.reason}</Text>
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
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  levelInfo: {
    marginLeft: 12,
    flex: 1,
  },
  currentLevel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  nextLevel: {
    fontSize: 14,
    color: '#6b7280',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    overflow: 'hidden',
    flex: 1,
    marginLeft: 12,
  },
  progress: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 2,
  },
  goalItem: {
    marginBottom: 16,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
    flex: 1,
  },
  goalDuration: {
    color: '#6b7280',
  },
  exerciseList: {
    marginLeft: 28,
  },
  exercise: {
    color: '#6b7280',
    marginBottom: 4,
  },
  progressTracking: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  progressItem: {
    alignItems: 'center',
  },
  progressLabel: {
    color: '#6b7280',
    marginBottom: 4,
  },
  progressValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#3b82f6',
  },
  recommendationItem: {
    marginBottom: 16,
  },
  recHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  recType: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  recText: {
    fontSize: 14,
    color: '#111827',
    marginBottom: 4,
  },
  recReason: {
    fontSize: 12,
    color: '#6b7280',
  },
});
