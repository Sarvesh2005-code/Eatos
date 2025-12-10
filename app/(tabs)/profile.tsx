import React from 'react';
import { StyleSheet } from 'react-native';

import ProfileScreen from '@/features/profile/screens/ProfileScreen';

export default function TabProfileScreen() {
  return <ProfileScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});