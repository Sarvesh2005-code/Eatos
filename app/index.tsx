import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { useAuth } from '@/core/context/AuthContext';
import LoginScreen from '@/features/auth/screens/LoginScreen';

export default function Index() {
  const { isAuthenticated } = useAuth();

  // Redirect to tabs if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated]);

  return (
    <View style={styles.container}>
      <LoginScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});