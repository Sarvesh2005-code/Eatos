import { DesignSystem } from '@/constants/DesignSystem';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface MacroBarProps {
    label: string;
    value: number;
    total: number;
    color: string;
}

export function MacroBar({ label, value, total, color }: MacroBarProps) {
    const progress = Math.min(value / total, 1) * 100;

    return (
        <View style={styles.container}>
            <View style={styles.labelRow}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.value}>{value}g <Text style={styles.total}>/ {total}g</Text></Text>
            </View>
            <View style={styles.track}>
                <View style={[styles.fill, { width: `${progress}%`, backgroundColor: color }]} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: DesignSystem.Spacing.md,
        width: '100%',
    },
    labelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: DesignSystem.Spacing.xs,
    },
    label: {
        fontSize: DesignSystem.Typography.size.sm,
        color: DesignSystem.Colors.light.textSecondary,
        fontWeight: '500',
    },
    value: {
        fontSize: DesignSystem.Typography.size.sm,
        color: DesignSystem.Colors.light.text,
        fontWeight: '600',
    },
    total: {
        color: DesignSystem.Colors.light.textSecondary,
        fontWeight: '400',
    },
    track: {
        height: 6,
        backgroundColor: DesignSystem.Colors.light.background,
        borderRadius: 3,
        overflow: 'hidden',
    },
    fill: {
        height: '100%',
        borderRadius: 3,
    },
});
