import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { useAuth } from '@/core/context/AuthContext';
import ForgotPasswordScreen from '@/features/auth/screens/ForgotPasswordScreen';

export default function ForgotPassword() {
  const { isAuthenticated } = useAuth();

  // Redirect to tabs if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated]);

  return (
    <View style={styles.container}>
      <ForgotPasswordScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});