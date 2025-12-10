import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { GlassView } from '@/components/ui/GlassView';
import { DesignSystem } from '@/constants/DesignSystem';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DesignSystem.Colors.dark : DesignSystem.Colors.light;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: () => (
          <GlassView
            intensity={80}
            tint={colorScheme === 'dark' ? 'dark' : 'light'}
            style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, borderTopWidth: 0 }}
          />
        ),
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            elevation: 0,
            borderTopWidth: 0,
            backgroundColor: 'transparent',
          },
          default: {
            elevation: 0,
            borderTopWidth: 0,
            backgroundColor: theme.background,
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size || 24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="meals"
        options={{
          title: 'Meals',
          tabBarIcon: ({ color, size }) => <Ionicons name="restaurant-outline" size={size || 24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: 'Community',
          tabBarIcon: ({ color, size }) => <Ionicons name="people-outline" size={size || 24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size || 24} color={color} />,
        }}
      />
    </Tabs>
  );
}
