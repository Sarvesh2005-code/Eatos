import { DesignSystem } from '@/constants/DesignSystem';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Platform, StyleSheet, View, ViewProps } from 'react-native';

interface GlassViewProps extends ViewProps {
    intensity?: number;
    tint?: 'light' | 'dark' | 'default';
}

export function GlassView({
    style,
    intensity = 50,
    tint = 'default',
    children,
    ...props
}: GlassViewProps) {
    const isDark = tint === 'dark'; // Simplified logic, ideally check system theme

    if (Platform.OS === 'android') {
        // Android doesn't support BlurView well natively in all versions/Expo versions without config
        // Fallback to semi-transparent background
        return (
            <View
                style={[
                    styles.androidContainer,
                    { backgroundColor: isDark ? 'rgba(30,30,30,0.9)' : 'rgba(255,255,255,0.9)' },
                    style
                ]}
                {...props}
            >
                {children}
            </View>
        );
    }

    return (
        <BlurView
            intensity={intensity}
            tint={tint}
            style={[styles.container, style]}
            {...props}
        >
            {children}
        </BlurView>
    );
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        borderRadius: DesignSystem.BorderRadius.lg,
        // Add subtle border for glass effect
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    androidContainer: {
        overflow: 'hidden',
        borderRadius: DesignSystem.BorderRadius.lg,
        borderWidth: 1,
        borderColor: 'rgba(200,200,200,0.2)',
    }
});
