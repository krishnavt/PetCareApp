import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar, Clock, Repeat, Bell, CheckCircle, PlusCircle } from 'lucide-react-native';
import { usePetContext } from '../../context/PetContext';

export function CareScheduleScreen() {
  const { pets, selectedPet } = usePetContext();
  const currentPet = pets[selectedPet];
  const [careRoutines, setCareRoutines] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);

  useEffect(() => {
    generateCareRoutines();
    getUpcomingTasks();
  }, [currentPet]);

  const generateCareRoutines = () => {
    // AI-generated care routines based on pet profile
    const routines = generateSmartRoutines(currentPet);
    setCareRoutines(routines);
  };

  const generateSmartRoutines = (pet) => {
    // AI logic to create personalized care routines
    return [
      {
        id: 1,
        category: 'Exercise',
        tasks: [
          {
            id: 1,
            name: `${pet.species === 'Dog' ? 'Walk' : 'Play Time'}`,
            frequency: 'Daily',
            duration: '30 minutes',
            importance: 'High',
            timeSlot: '8:00 AM'
          },
          {
            id: 2,
            name: 'Active Play',
            frequency: 'Daily',
            duration: '15 minutes',
            importance: 'Medium',
            timeSlot: '5:00 PM'
          }
        ]
      },
      {
        id: 2,
        category: 'Health Care',
        tasks: [
          {
            id: 3,
            name: 'Medication',
            frequency: 'Daily',
            duration: '5 minutes',
            importance: 'High',
            timeSlot: '9:00 AM'
          },
          {
            id: 4,
            name: 'Grooming',
            frequency: 'Weekly',
            duration: '20 minutes',
            importance: 'Medium',
            timeSlot: 'Saturday 10:00 AM'
          }
        ]
      },
      {
        id: 3,
        category: 'Nutrition',
        tasks: [
          {
            id: 5,
            name: 'Breakfast',
            frequency: 'Daily',
            duration: '10 minutes',
            importance: 'High',
            timeSlot: '7:30 AM'
          },
          {
            id: 6,
            name: 'Dinner',
            frequency: 'Daily',
            duration: '10 minutes',
            importance: 'High',
            timeSlot: '6:00 PM'
          }
        ]
      }
    ];
  };

  const getUpcomingTasks = () => {
    // Simulate fetching upcoming tasks
    setUpcomingTasks([
      {
        id: 1,
        name: 'Morning Walk',
        date: 'Today',
        time: '8:00 AM',
        status: 'pending'
      },
      {
        id: 2,
        name: 'Give Medication',
        date: 'Today',
        time: '9:00 AM',
        status: 'pending'
      },
      {
        id: 3,
        name: 'Grooming Session',
        date: 'Tomorrow',
        time: '10:00 AM',
        status: 'scheduled'
      }
    ]);
  };

  const getImportanceColor = (importance) => {
    switch (importance.toLowerCase()) {
      case 'high':
        return '#ef4444';
      case 'medium':
        return '#f59e0b';
      default:
        return '#10b981';
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Today's Schedule */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Care Schedule</Text>
        <View style={styles.upcomingTasks}>
          {upcomingTasks.map(task => (
            <TouchableOpacity key={task.id} style={styles.taskCard}>
              <View style={styles.taskHeader}>
                <View style={styles.taskTime}>
                  <Clock size={16} color="#6b7280" />
                  <Text style={styles.taskTimeText}>{task.time}</Text>
                </View>
                <TouchableOpacity
                  style={[
                    styles.taskStatus,
                    task.status === 'completed' && styles.taskCompleted
                  ]}
                >
                  <CheckCircle size={20} color={task.status === 'completed' ? '#10b981' : '#6b7280'} />
                </TouchableOpacity>
              </View>
              <Text style={styles.taskName}>{task.name}</Text>
              <Text style={styles.taskDate}>{task.date}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* AI Care Routines */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AI-Generated Care Routines</Text>
        <Text style={styles.sectionSubtitle}>
          Personalized for {currentPet.name}'s needs
        </Text>

        {careRoutines.map(routine => (
          <View key={routine.id} style={styles.routineCard}>
            <Text style={styles.routineCategory}>{routine.category}</Text>
            {routine.tasks.map(task => (
              <View key={task.id} style={styles.routineTask}>
                <View style={styles.taskInfo}>
                  <View style={styles.taskMain}>
                    <Text style={styles.taskTitle}>{task.name}</Text>
                    <View style={[
                      styles.importanceBadge,
                      { backgroundColor: getImportanceColor(task.importance) + '20' }
                    ]}>
                      <Text style={[
                        styles.importanceText,
                        { color: getImportanceColor(task.importance) }
                      ]}>{task.importance}</Text>
                    </View>
                  </View>
                  <View style={styles.taskDetails}>
                    <View style={styles.taskDetail}>
                      <Repeat size={16} color="#6b7280" />
                      <Text style={styles.detailText}>{task.frequency}</Text>
                    </View>
                    <View style={styles.taskDetail}>
                      <Clock size={16} color="#6b7280" />
                      <Text style={styles.detailText}>{task.duration}</Text>
                    </View>
                    <View style={styles.taskDetail}>
                      <Bell size={16} color="#6b7280" />
                      <Text style={styles.detailText}>{task.timeSlot}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ))}
      </View>

      {/* Add Custom Task Button */}
      <TouchableOpacity style={styles.addButton}>
        <PlusCircle size={24} color="white" />
        <Text style={styles.addButtonText}>Add Custom Care Task</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  taskCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskTimeText: {
    marginLeft: 6,
    color: '#6b7280',
    fontSize: 14,
  },
  taskName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  taskDate: {
    fontSize: 14,
    color: '#6b7280',
  },
  routineCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  routineCategory: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  routineTask: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    paddingBottom: 12,
  },
  taskInfo: {
    flex: 1,
  },
  taskMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  importanceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  importanceText: {
    fontSize: 12,
    fontWeight: '500',
  },
  taskDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  taskDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#6b7280',
  },
  addButton: {
    backgroundColor: '#3b82f6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
