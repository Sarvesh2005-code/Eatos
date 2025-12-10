import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, TextInput as RNTextInput, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { CupertinoButton } from '@/components/ui/CupertinoButton';
import { GlassCard } from '@/components/ui/GlassCard';
import { DesignSystem } from '@/constants/DesignSystem';
import { useAuth } from '@/core/context/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function SignupScreen() {
  const { signUp, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DesignSystem.Colors.dark : DesignSystem.Colors.light;

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    try {
      await signUp(email, password);
      router.replace('/(tabs)');
    } catch (err: any) {
      Alert.alert('Signup Failed', err.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, justifyContent: 'center', padding: 20 }}
      >
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="person-add" size={32} color={theme.primary} />
          </View>
          <Text style={[styles.title, { color: theme.text }]}>Create Account</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Join Eatos and transform your health</Text>
        </View>

        <GlassCard style={styles.formCard}>
          <View style={[styles.inputContainer, { backgroundColor: theme.background, borderColor: theme.border }]}>
            <Ionicons name="mail-outline" size={20} color={theme.textSecondary} style={styles.inputIcon} />
            <RNTextInput
              style={[styles.input, { color: theme.text }]}
              placeholder="Email"
              placeholderTextColor={theme.textSecondary}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={[styles.inputContainer, { backgroundColor: theme.background, borderColor: theme.border }]}>
            <Ionicons name="lock-closed-outline" size={20} color={theme.textSecondary} style={styles.inputIcon} />
            <RNTextInput
              style={[styles.input, { color: theme.text }]}
              placeholder="Password"
              placeholderTextColor={theme.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <View style={[styles.inputContainer, { backgroundColor: theme.background, borderColor: theme.border }]}>
            <Ionicons name="lock-closed-outline" size={20} color={theme.textSecondary} style={styles.inputIcon} />
            <RNTextInput
              style={[styles.input, { color: theme.text }]}
              placeholder="Confirm Password"
              placeholderTextColor={theme.textSecondary}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          <CupertinoButton
            title="Create Account"
            onPress={handleSignup}
            loading={isLoading}
            style={{ marginTop: 16 }}
          />
        </GlassCard>

        <View style={styles.footer}>
          <Text style={{ color: theme.textSecondary }}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={{ color: theme.primary, fontWeight: '700' }}>Sign In</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(52, 199, 89, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  formCard: {
    padding: 24,
    borderRadius: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: '100%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  }
});