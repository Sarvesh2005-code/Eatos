import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, TextInput as RNTextInput, StyleSheet, Text, View } from 'react-native';

import { CupertinoButton } from '@/components/ui/CupertinoButton';
import { GlassCard } from '@/components/ui/GlassCard';
import { DesignSystem } from '@/constants/DesignSystem';
import { useAuth } from '@/core/context/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ForgotPasswordScreen() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DesignSystem.Colors.dark : DesignSystem.Colors.light;

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword(email);
      Alert.alert(
        'Email Sent',
        'Check your inbox for password reset instructions.',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to send reset email');
    } finally {
      setIsLoading(false);
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
            <Ionicons name="key" size={32} color={theme.primary} />
          </View>
          <Text style={[styles.title, { color: theme.text }]}>Forgot Password?</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            No worries! Enter your email and we'll send you reset instructions.
          </Text>
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

          <CupertinoButton
            title="Send Reset Link"
            onPress={handleResetPassword}
            loading={isLoading}
            style={{ marginTop: 8 }}
          />
        </GlassCard>

        <View style={styles.footer}>
          <CupertinoButton
            title="Back to Login"
            variant="plain"
            onPress={() => router.back()}
          />
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
    paddingHorizontal: 20,
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
    alignItems: 'center',
    marginTop: 24,
  }
});