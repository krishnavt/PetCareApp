import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { ShoppingCart, Star } from 'lucide-react-native';

function SmartShopScreen() {
  const recommendations = [
    {
      id: 1,
      name: 'Premium Dog Food',
      price: '$49.99',
      rating: 4.8,
      match: '98%'
    },
    {
      id: 2,
      name: 'Joint Supplements',
      price: '$29.99',
      rating: 4.5,
      match: '95%'
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Product Recommendations</Text>
      </View>

      {recommendations.map(item => (
        <View key={item.id} style={styles.productCard}>
          <View style={styles.matchBadge}>
            <Text style={styles.matchText}>{item.match} Match</Text>
          </View>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>{item.price}</Text>
          <View style={styles.ratingContainer}>
            <Star size={16} color="#fbbf24" fill="#fbbf24" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <ShoppingCart size={20} color="white" />
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  matchBadge: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  matchText: {
    color: 'white',
    fontWeight: '600',
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingText: {
    marginLeft: 4,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#3b82f6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: '600',
  },
});

export default SmartShopScreen;
