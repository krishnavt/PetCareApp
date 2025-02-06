import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Heart, User, Bell, Activity, DollarSign, Book } from 'lucide-react-native';
import { HomeScreen } from './screens/HomeScreen';
import { PetsScreen } from './screens/PetsScreen';
import { VetScreen } from './screens/VetScreen';
import { AlertsScreen } from './screens/AlertsScreen';
import { TrainingAssistant } from './screens/ai/TrainingAssistant';
import { CostPredictor } from './screens/ai/CostPredictor';
import { PetProvider } from './context/PetContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PetProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              switch (route.name) {
                case 'Home':
                  return <Home size={size} color={color} />;
                case 'Pets':
                  return <Heart size={size} color={color} />;
                case 'Training':
                  return <Book size={size} color={color} />;
                case 'Costs':
                  return <DollarSign size={size} color={color} />;
                case 'Vet':
                  return <User size={size} color={color} />;
                case 'Alerts':
                  return <Bell size={size} color={color} />;
                default:
                  return <Home size={size} color={color} />;
              }
            },
            tabBarActiveTintColor: '#3b82f6',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ title: 'Dashboard' }}
          />
          <Tab.Screen 
            name="Pets" 
            component={PetsScreen}
            options={{ title: 'My Pets' }}
          />
          <Tab.Screen 
            name="Training" 
            component={TrainingAssistant}
            options={{ title: 'AI Training' }}
          />
          <Tab.Screen 
            name="Costs" 
            component={CostPredictor}
            options={{ title: 'Cost AI' }}
          />
          <Tab.Screen 
            name="Vet" 
            component={VetScreen}
            options={{ title: 'Vet Care' }}
          />
          <Tab.Screen 
            name="Alerts" 
            component={AlertsScreen}
            options={{ title: 'Alerts' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PetProvider>
  );
}
