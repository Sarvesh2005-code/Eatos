import { DesignSystem } from '@/constants/DesignSystem';
import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { GlassView } from './GlassView';

interface GlassCardProps {
    children: React.ReactNode;
    style?: ViewStyle;
    variant?: 'elevated' | 'flat';
}

export function GlassCard({ children, style, variant = 'elevated' }: GlassCardProps) {
    return (
        <GlassView
            intensity={70}
            tint="default"
            style={[
                styles.card,
                variant === 'elevated' && DesignSystem.Shadows.light.sm,
                style
            ]}
        >
            {children}
        </GlassView>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: DesignSystem.Spacing.lg,
        borderRadius: DesignSystem.BorderRadius.xl,
        overflow: 'hidden', // Required for blur to respect border radius on some versions
    },
});
