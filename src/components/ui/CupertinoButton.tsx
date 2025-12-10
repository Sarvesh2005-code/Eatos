import { DesignSystem } from '@/constants/DesignSystem';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

interface CupertinoButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'filled' | 'tinted' | 'plain';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    icon?: React.ReactNode;
}

export function CupertinoButton({
    title,
    onPress,
    variant = 'filled',
    size = 'md',
    loading = false,
    disabled = false,
    style,
    textStyle,
    icon,
}: CupertinoButtonProps) {

    const getBackgroundColor = () => {
        if (disabled) return DesignSystem.Colors.light.background; // Gray-ish
        if (variant === 'filled') return DesignSystem.Colors.light.primary;
        if (variant === 'tinted') return 'rgba(0, 122, 255, 0.15)';
        return 'transparent';
    };

    const getTextColor = () => {
        if (disabled) return DesignSystem.Colors.light.textSecondary;
        if (variant === 'filled') return '#FFFFFF';
        return DesignSystem.Colors.light.primary;
    };

    const getPadding = () => {
        switch (size) {
            case 'sm': return { paddingVertical: 6, paddingHorizontal: 12 };
            case 'lg': return { paddingVertical: 14, paddingHorizontal: 24 };
            default: return { paddingVertical: 10, paddingHorizontal: 16 }; // md
        }
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
            style={[
                styles.button,
                {
                    backgroundColor: getBackgroundColor(),
                    borderRadius: DesignSystem.BorderRadius.md,
                },
                getPadding(),
                style,
            ]}
        >
            {loading ? (
                <ActivityIndicator color={getTextColor()} />
            ) : (
                <>
                    {icon}
                    <Text
                        style={[
                            styles.text,
                            {
                                color: getTextColor(),
                                fontSize: size === 'lg' ? 17 : size === 'sm' ? 13 : 15,
                                fontWeight: '600'
                            },
                            icon ? { marginLeft: 8 } : {},
                            textStyle,
                        ]}
                    >
                        {title}
                    </Text>
                </>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontFamily: DesignSystem.Typography.fontFamily.default,
    },
});
