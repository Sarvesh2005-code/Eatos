import { useEffect, useState } from 'react';
import { ColorSchemeName, useColorScheme as _useColorScheme } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const THEME_PREFERENCE_KEY = 'eatos_theme_preference';

type ThemePreference = 'system' | 'light' | 'dark';

/**
 * Enhanced color scheme hook that respects user preferences
 * and allows manual theme switching
 */
export function useColorScheme(): NonNullable<ColorSchemeName> {
  // Get the device color scheme
  const deviceColorScheme = _useColorScheme();
  
  // State to track the user's theme preference
  const [themePreference, setThemePreference] = useState<ThemePreference>('system');

  // Load the saved theme preference on mount
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedPreference = await SecureStore.getItemAsync(THEME_PREFERENCE_KEY);
        if (savedPreference && (savedPreference === 'light' || savedPreference === 'dark' || savedPreference === 'system')) {
          setThemePreference(savedPreference as ThemePreference);
        }
      } catch (error) {
        console.error('Error loading theme preference:', error);
      }
    };

    loadThemePreference();
  }, []);

  // Function to set and save the theme preference
  const setAndSaveThemePreference = async (preference: ThemePreference) => {
    try {
      await SecureStore.setItemAsync(THEME_PREFERENCE_KEY, preference);
      setThemePreference(preference);
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  // Determine the actual color scheme based on preference
  let actualColorScheme: NonNullable<ColorSchemeName> = 'light';
  
  if (themePreference === 'system') {
    actualColorScheme = deviceColorScheme || 'light';
  } else {
    actualColorScheme = themePreference;
  }

  // Attach the setter to the returned value
  Object.defineProperty(actualColorScheme, 'setTheme', {
    value: setAndSaveThemePreference,
    writable: false,
  });

  return actualColorScheme;
}

// Type definition for the enhanced color scheme
export type ColorSchemeWithSetter = NonNullable<ColorSchemeName> & {
  setTheme: (preference: ThemePreference) => Promise<void>;
};