import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CupertinoButton, GlassCard } from '@/components/ui';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/core/context/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const colorScheme = useColorScheme();
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Mock user preferences
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(colorScheme === 'dark');

  // Mock user stats
  const userStats = {
    daysActive: 15,
    mealsLogged: 42,
    weightLost: 2.5,
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };

  const handleToggleDarkMode = (value: boolean) => {
    setDarkModeEnabled(value);
  };

  const renderSettingItem = (icon: string, title: string, component: React.ReactNode) => (
    <View style={styles.settingItem}>
      <View style={styles.settingLeft}>
        <Ionicons name={icon as any} size={22} color={Colors[colorScheme ?? 'light'].icon} style={styles.settingIcon} />
        <Text style={[styles.settingTitle, { color: Colors[colorScheme ?? 'light'].text }]}>{title}</Text>
      </View>
      {component}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>Profile</Text>
        </View>

        <View style={styles.profileSection}>
          <View style={[styles.avatarContainer, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}>
            <Text style={styles.avatarText}>{user?.displayName?.[0] || user?.email?.[0] || 'U'}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: Colors[colorScheme ?? 'light'].text }]}>
              {user?.displayName || 'User'}
            </Text>
            <Text style={[styles.profileEmail, { color: Colors[colorScheme ?? 'light'].textSecondary }]}>
              {user?.email}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditingProfile(true)}
          >
            <Ionicons name="pencil" size={18} color={Colors[colorScheme ?? 'light'].primary} />
          </TouchableOpacity>
        </View>

        <GlassCard style={styles.statsCard}>
          <Text style={[styles.cardTitle, { color: Colors[colorScheme ?? 'light'].text }]}>Your Progress</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: Colors[colorScheme ?? 'light'].primary }]}>{userStats.daysActive}</Text>
              <Text style={[styles.statLabel, { color: Colors[colorScheme ?? 'light'].textSecondary }]}>Days Active</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: Colors[colorScheme ?? 'light'].primary }]}>{userStats.mealsLogged}</Text>
              <Text style={[styles.statLabel, { color: Colors[colorScheme ?? 'light'].textSecondary }]}>Meals Logged</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: Colors[colorScheme ?? 'light'].primary }]}>{userStats.weightLost} kg</Text>
              <Text style={[styles.statLabel, { color: Colors[colorScheme ?? 'light'].textSecondary }]}>Weight Lost</Text>
            </View>
          </View>
        </GlassCard>

        <GlassCard style={styles.settingsCard}>
          <Text style={[styles.cardTitle, { color: Colors[colorScheme ?? 'light'].text }]}>Settings</Text>

          {renderSettingItem('notifications-outline', 'Notifications',
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#d0d0d0', true: Colors[colorScheme ?? 'light'].primary }}
            />
          )}

          {renderSettingItem('moon-outline', 'Dark Mode',
            <Switch
              value={darkModeEnabled}
              onValueChange={handleToggleDarkMode}
              trackColor={{ false: '#d0d0d0', true: Colors[colorScheme ?? 'light'].primary }}
            />
          )}

          {renderSettingItem('lock-closed-outline', 'Privacy',
            <Ionicons name="chevron-forward" size={20} color={Colors[colorScheme ?? 'light'].icon} />
          )}

          {renderSettingItem('help-circle-outline', 'Help & Support',
            <Ionicons name="chevron-forward" size={20} color={Colors[colorScheme ?? 'light'].icon} />
          )}

          {renderSettingItem('information-circle-outline', 'About',
            <Ionicons name="chevron-forward" size={20} color={Colors[colorScheme ?? 'light'].icon} />
          )}
        </GlassCard>

        <View style={styles.signOutContainer}>
          <CupertinoButton
            title="Sign Out"
            onPress={handleSignOut}
            variant="filled"
            style={{ backgroundColor: '#FF3B30' }} // Red for sign out
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
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
  },
  profileEmail: {
    fontSize: 14,
    marginTop: 2,
  },
  editButton: {
    padding: 8,
  },
  statsCard: {
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  settingsCard: {
    padding: 16,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 16,
  },
  signOutContainer: {
    marginBottom: 24,
  },
});