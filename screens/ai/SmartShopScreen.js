import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { ShoppingCart, Package, Star, Repeat, Clock } from 'lucide-react-native';
import { usePetContext } from '../../context/PetContext';

export function SmartShopScreen() {
  const { pets, selectedPet } = usePetContext();
  const currentPet = pets[selectedPet];
  const [recommendations, setRecommendations] = useState([]);
  const [autoShipments, setAutoShipments] = useState([]);

  useEffect(() => {
    generateRecommendations();
    getAutoShipments();
  }, [currentPet]);

  const generateRecommendations = () => {
    // AI-based product recommendations
    const petProducts = getSmartRecommendations(currentPet);
    setRecommendations(petProducts);
  };

  const getSmartRecommendations = (pet) => {
    // Simulated AI product recommendations based on pet profile
    const products = [
      {
        id: 1,
        name: `Premium ${pet.species} Food`,
        description: 'Specially formulated for your pet\'s age and breed',
        price: 49.99,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=150',
        match: 98
      },
      {
        id: 2,
        name: 'Joint Health Supplement',
        description: 'Recommended based on breed and age',
        price: 34.99,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1512069766149-4c7cc3a21b0c?w=150',
        match: 95
      },
      {
        id: 3,
        name: 'Dental Care Kit',
        description: 'Essential for maintaining oral health',
        price: 29.99,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1583947581924-860bda3c4381?w=150',
        match: 92
      }
    ];
    return products;
  };

  const getAutoShipments = () => {
    // Simulated auto-shipment data
    setAutoShipments([
      {
        id: 1,
        product: `Premium ${currentPet.species} Food`,
        nextDelivery: '2024-01-20',
        frequency: 'Monthly',
        price: 49.99
      },
      {
        id: 2,
        product: 'Joint Supplements',
        nextDelivery: '2024-01-25',
        frequency: 'Monthly',
        price: 34.99
      }
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Smart Recommendations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AI-Powered Recommendations</Text>
        <Text style={styles.sectionSubtitle}>
          Based on {currentPet.name}'s profile and needs
        </Text>
        
        {recommendations.map(product => (
          <View key={product.id} style={styles.productCard}>
            <View style={styles.matchBadge}>
              <Text style={styles.matchText}>{product.match}% Match</Text>
            </View>
            <View style={styles.productContent}>
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productDescription}>{product.description}</Text>
                <View style={styles.productMeta}>
                  <Text style={styles.productPrice}>${product.price}</Text>
                  <View style={styles.ratingContainer}>
                    <Star size={16} color="#fbbf24" fill="#fbbf24" />
                    <Text style={styles.ratingText}>{product.rating}</Text>
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.addButton}>
              <ShoppingCart size={20} color="white" />
              <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Auto-Shipments */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Smart Auto-Shipments</Text>
        {autoShipments.map(shipment => (
          <View key={shipment.id} style={styles.shipmentCard}>
            <View style={styles.shipmentHeader}>
              <Package size={20} color="#3b82f6" />
              <Text style={styles.shipmentProduct}>{shipment.product}</Text>
            </View>
            <View style={styles.shipmentDetails}>
              <View style={styles.shipmentInfo}>
                <Clock size={16} color="#6b7280" />
                <Text style={styles.shipmentText}>
                  Next delivery: {shipment.nextDelivery}
                </Text>
              </View>
              <View style={styles.shipmentInfo}>
                <Repeat size={16} color="#6b7280" />
                <Text style={styles.shipmentText}>{shipment.frequency}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.modifyButton}>
              <Text style={styles.modifyButtonText}>Modify Subscription</Text>
            </TouchableOpacity>
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
  productCard: {
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
  matchBadge: {
    position: 'absolute',
    right: 16,
    top: 16,
    backgroundColor: '#10b981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  matchText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  productContent: {
    flexDirection: 'row',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  productMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#6b7280',
  },
  addButton: {
    backgroundColor: '#3b82f6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
  },
  shipmentCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  shipmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  shipmentProduct: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  shipmentDetails: {
    marginBottom: 12,
  },
  shipmentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  shipmentText: {
    marginLeft: 8,
    color: '#6b7280',
  },
  modifyButton: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modifyButtonText: {
    color: '#3b82f6',
    fontWeight: '500',
  },
});
