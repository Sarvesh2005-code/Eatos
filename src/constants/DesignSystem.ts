import { Platform } from 'react-native';

/**
 * Eatos Design System
 * Apple-inspired aesthetic: Clean, Minimal, Blur, Roundness.
 */

export const Colors = {
    light: {
        primary: '#007AFF', // Apple Blue
        secondary: '#5856D6', // Apple Purple
        success: '#34C759', // Apple Green
        warning: '#FF9500', // Apple Orange
        danger: '#FF3B30', // Apple Red

        background: '#F2F2F7', // iOS System Grouped Background
        card: '#FFFFFF',
        text: '#000000',
        textSecondary: '#8E8E93',
        border: '#C6C6C8',

        // Feature specific
        calories: '#FF9500', // Orange for Ring
        protein: '#FF3B30', // Red
        carbs: '#34C759', // Green
        fat: '#007AFF', // Blue

        tint: '#007AFF',
        tabIconDefault: '#8E8E93',
        tabIconSelected: '#007AFF',
    },
    dark: {
        primary: '#0A84FF',
        secondary: '#5E5CE6',
        success: '#30D158',
        warning: '#FF9F0A',
        danger: '#FF453A',

        background: '#000000',
        card: '#1C1C1E', // iOS System Gray 6
        text: '#FFFFFF',
        textSecondary: '#8E8E93',
        border: '#38383A',

        // Feature specific
        calories: '#FF9F0A',
        protein: '#FF453A',
        carbs: '#30D158',
        fat: '#0A84FF',

        tint: '#0A84FF',
        tabIconDefault: '#8E8E93',
        tabIconSelected: '#0A84FF',
    },
};

export const Typography = {
    fontFamily: {
        // San Francisco is default on iOS, Roboto on Android.
        // We can use system fonts or integrate specific ones if needed.
        default: Platform.select({ ios: 'System', android: 'Roboto' }),
        serif: Platform.select({ ios: 'Georgia', android: 'serif' }),
        mono: Platform.select({ ios: 'Menlo', android: 'monospace' }),
    },
    size: {
        xs: 11,
        sm: 13,
        md: 15,
        lg: 17, // Standard Body
        xl: 20,
        xxl: 22,
        xxxl: 28, // Large Title
        display: 34,
    },
    weight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
    },
};

export const Spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16, // Standard padding
    xl: 24,
    xxl: 32,
};

export const BorderRadius = {
    sm: 8,
    md: 12,
    lg: 16, // Standard Card
    xl: 24,
    full: 9999,
};

export const Shadows = {
    light: {
        sm: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
        },
        md: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 6,
            elevation: 4,
        },
    },
    dark: {
        sm: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.3,
            shadowRadius: 2,
            elevation: 2,
        },
        md: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.4,
            shadowRadius: 6,
            elevation: 4,
        },
    },
};

export const DesignSystem = {
    Colors,
    Typography,
    Spacing,
    BorderRadius,
    Shadows,
};
