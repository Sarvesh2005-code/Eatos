import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { useAuth } from '@/core/context/AuthContext';
import SignupScreen from '@/features/auth/screens/SignupScreen';

export default function Signup() {
  const { isAuthenticated } = useAuth();

  // Redirect to tabs if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated]);

  return (
    <View style={styles.container}>
      <SignupScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});