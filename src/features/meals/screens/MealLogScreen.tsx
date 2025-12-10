import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Button, TextInput, Card } from '@/src/components/ui';

export default function MealLogScreen() {
  const colorScheme = useColorScheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMealType, setSelectedMealType] = useState('breakfast');

  // Mock food data
  const popularFoods = [
    { id: 1, name: 'Oatmeal with Berries', calories: 320, image: '🥣' },
    { id: 2, name: 'Avocado Toast', calories: 280, image: '🥑' },
    { id: 3, name: 'Greek Yogurt', calories: 150, image: '🥛' },
    { id: 4, name: 'Scrambled Eggs', calories: 220, image: '🍳' },
    { id: 5, name: 'Banana', calories: 105, image: '🍌' },
  ];

  const recentFoods = [
    { id: 6, name: 'Chicken Salad', calories: 350, image: '🥗' },
    { id: 7, name: 'Protein Shake', calories: 180, image: '🥤' },
    { id: 8, name: 'Salmon', calories: 280, image: '🐟' },
  ];

  const mealTypes = [
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'lunch', label: 'Lunch' },
    { id: 'dinner', label: 'Dinner' },
    { id: 'snack', label: 'Snack' },
  ];

  const renderFoodItem = (item: typeof popularFoods[0]) => (
    <Card key={item.id} variant="outlined" style={styles.foodCard} onPress={() => console.log(`Selected ${item.name}`)}>
      <View style={styles.foodCardContent}>
        <Text style={styles.foodEmoji}>{item.image}</Text>
        <View style={styles.foodInfo}>
          <Text style={[styles.foodName, { color: Colors[colorScheme ?? 'light'].text }]}>{item.name}</Text>
          <Text style={[styles.foodCalories, { color: Colors[colorScheme ?? 'light'].textSecondary }]}>
            {item.calories} kcal
          </Text>
        </View>
        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}
          onPress={() => console.log(`Added ${item.name}`)}
        >
          <Ionicons name="add" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>Log Meal</Text>
        </View>

        <TextInput
          placeholder="Search foods..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon={<Ionicons name="search" size={20} color={Colors[colorScheme ?? 'light'].icon} />}
          style={styles.searchInput}
        />

        <View style={styles.mealTypeContainer}>
          {mealTypes.map((mealType) => (
            <TouchableOpacity
              key={mealType.id}
              style={[
                styles.mealTypeButton,
                selectedMealType === mealType.id && {
                  backgroundColor: Colors[colorScheme ?? 'light'].primary,
                },
              ]}
              onPress={() => setSelectedMealType(mealType.id)}
            >
              <Text
                style={[
                  styles.mealTypeText,
                  { color: selectedMealType === mealType.id ? '#fff' : Colors[colorScheme ?? 'light'].text },
                ]}
              >
                {mealType.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>Popular Foods</Text>
          {popularFoods.map(renderFoodItem)}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>Recent Foods</Text>
          {recentFoods.map(renderFoodItem)}
        </View>

        <View style={styles.section}>
          <Button
            title="Add Custom Food"
            onPress={() => console.log('Add custom food')}
            leftIcon={<Ionicons name="add-circle-outline" size={20} color="#fff" />}
            fullWidth
          />
        </View>

        <View style={styles.section}>
          <Button
            title="Scan Barcode"
            onPress={() => console.log('Scan barcode')}
            leftIcon={<Ionicons name="barcode-outline" size={20} color="#fff" />}
            variant="secondary"
            fullWidth
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchInput: {
    marginBottom: 16,
  },
  mealTypeContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 8,
  },
  mealTypeButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  mealTypeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  foodCard: {
    marginBottom: 8,
  },
  foodCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  foodEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '500',
  },
  foodCalories: {
    fontSize: 14,
    marginTop: 2,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});