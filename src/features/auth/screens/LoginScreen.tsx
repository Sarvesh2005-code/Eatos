import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, TextInput as RNTextInput, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { CupertinoButton } from '@/components/ui/CupertinoButton';
import { GlassCard } from '@/components/ui/GlassCard';
import { DesignSystem } from '@/constants/DesignSystem';
import { useAuth } from '@/core/context/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function LoginScreen() {
  const { signIn, signInWithGoogle, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DesignSystem.Colors.dark : DesignSystem.Colors.light;

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      await signIn(email, password);
      router.replace('/(tabs)');
    } catch (err: any) {
      Alert.alert('Login Failed', err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      router.replace('/(tabs)');
    } catch (err: any) {
      Alert.alert('Google Login Failed', err.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Optional: Add a subtle background image or gradient here */}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, justifyContent: 'center', padding: 20 }}
      >
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="leaf" size={48} color={theme.primary} />
          </View>
          <Text style={[styles.title, { color: theme.text }]}>Welcome Back</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Sign in to continue your healthy journey</Text>
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

          <TouchableOpacity onPress={() => router.push('/forgot-password')} style={styles.forgotPassword}>
            <Text style={{ color: theme.primary, fontSize: 14, fontWeight: '600' }}>Forgot Password?</Text>
          </TouchableOpacity>

          <CupertinoButton
            title="Sign In"
            onPress={handleLogin}
            loading={isLoading}
            style={{ marginTop: 8 }}
          />

          <View style={styles.divider}>
            <View style={[styles.line, { backgroundColor: theme.border }]} />
            <Text style={[styles.orText, { color: theme.textSecondary }]}>OR</Text>
            <View style={[styles.line, { backgroundColor: theme.border }]} />
          </View>

          <CupertinoButton
            title="Sign in with Google"
            variant="filled"
            style={{ backgroundColor: '#DBDBDB' }}
            onPress={handleGoogleLogin}
            icon={<Ionicons name="logo-google" size={20} color={theme.text} />}
          />
        </GlassCard>

        <View style={styles.footer}>
          <Text style={{ color: theme.textSecondary }}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text style={{ color: theme.primary, fontWeight: '700' }}>Sign Up</Text>
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
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(52, 199, 89, 0.1)', // Light green tint
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  line: {
    flex: 1,
    height: 1,
  },
  orText: {
    paddingHorizontal: 16,
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  }
});