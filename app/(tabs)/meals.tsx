import React from 'react';
import { StyleSheet } from 'react-native';

import RecipeListScreen from '@/features/recipes/screens/RecipeListScreen';

export default function TabMealsScreen() {
  return <RecipeListScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});