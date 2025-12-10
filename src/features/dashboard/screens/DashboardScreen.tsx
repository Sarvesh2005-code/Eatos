import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CalorieRing } from '@/components/ui/CalorieRing';
import { CupertinoButton } from '@/components/ui/CupertinoButton';
import { GlassCard } from '@/components/ui/GlassCard';
import { MacroBar } from '@/components/ui/MacroBar';
import { DesignSystem } from '@/constants/DesignSystem';
import { useAuth } from '@/core/context/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function DashboardScreen() {
  const { user } = useAuth();
  const colorScheme = useColorScheme();
  const router = useRouter();
  const theme = colorScheme === 'dark' ? DesignSystem.Colors.dark : DesignSystem.Colors.light;

  // Mock data (replace with real Firestore stream later)
  const todayStats = {
    calories: 1450,
    caloriesGoal: 2000,
    protein: 75,
    proteinGoal: 120,
    carbs: 150,
    carbsGoal: 200,
    fat: 45,
    fatGoal: 65,
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <SafeAreaView edges={['top']} style={styles.header}>
          <View>
            <Text style={[styles.date, { color: theme.textSecondary }]}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).toUpperCase()}
            </Text>
            <Text style={[styles.greeting, { color: theme.text }]}>Summary</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/profile')}>
            { /* Use a placeholder if no photoURL */}
            <Image
              source={{ uri: user?.photoURL || 'https://ui-avatars.com/api/?name=' + (user?.displayName || 'User') + '&background=0D8ABC&color=fff' }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </SafeAreaView>

        {/* Main Calorie Card */}
        <View style={styles.ringContainer}>
          <CalorieRing
            caloriesConsumed={todayStats.calories}
            caloriesTarget={todayStats.caloriesGoal}
            size={220}
          />
        </View>

        {/* Macros */}
        <GlassCard style={styles.macroCard}>
          <MacroBar label="Protein" value={todayStats.protein} total={todayStats.proteinGoal} color={DesignSystem.Colors.light.protein} />
          <MacroBar label="Carbs" value={todayStats.carbs} total={todayStats.carbsGoal} color={DesignSystem.Colors.light.carbs} />
          <MacroBar label="Fat" value={todayStats.fat} total={todayStats.fatGoal} color={DesignSystem.Colors.light.fat} />
        </GlassCard>

        {/* Quick Actions */}
        <View style={styles.actionGrid}>
          <CupertinoButton
            title="Scan Meal"
            onPress={() => router.push('/camera-log')}
            icon={<Ionicons name="camera" size={20} color="#FFF" />}
            style={{ flex: 1, marginRight: 8 }}
          />
          <CupertinoButton
            title="Log Text"
            variant="tinted"
            onPress={() => router.push('/log-food')}
            icon={<Ionicons name="create-outline" size={20} color={theme.primary} />}
            style={{ flex: 1, marginLeft: 8 }}
          />
        </View>

        {/* Recent Meals Section */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Meals</Text>
          <TouchableOpacity onPress={() => router.push('/meals')}>
            <Text style={[styles.seeAll, { color: theme.primary }]}>Show All</Text>
          </TouchableOpacity>
        </View>

        {/* Placeholder for empty state or list */}
        <GlassCard style={styles.emptyStateCard}>
          <Text style={{ color: theme.textSecondary, textAlign: 'center' }}>No meals logged yet today.</Text>
        </GlassCard>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: DesignSystem.Spacing.lg,
    paddingBottom: 100, // Space for TabBar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: DesignSystem.Spacing.xl,
  },
  date: {
    fontSize: DesignSystem.Typography.size.xs,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 4,
  },
  greeting: {
    fontSize: DesignSystem.Typography.size.xxxl,
    fontWeight: '800',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEE',
  },
  ringContainer: {
    alignItems: 'center',
    marginBottom: DesignSystem.Spacing.xl,
  },
  macroCard: {
    marginBottom: DesignSystem.Spacing.xl,
  },
  actionGrid: {
    flexDirection: 'row',
    marginBottom: DesignSystem.Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: DesignSystem.Spacing.md,
  },
  sectionTitle: {
    fontSize: DesignSystem.Typography.size.xl,
    fontWeight: '700',
  },
  seeAll: {
    fontSize: DesignSystem.Typography.size.md,
    fontWeight: '600',
  },
  emptyStateCard: {
    paddingVertical: DesignSystem.Spacing.xl
  }
});