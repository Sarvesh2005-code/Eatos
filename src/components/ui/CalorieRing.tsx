import { DesignSystem } from '@/constants/DesignSystem';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { Easing, useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Circle, G } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CalorieRingProps {
    caloriesConsumed: number;
    caloriesTarget: number;
    size?: number;
    strokeWidth?: number;
}

export function CalorieRing({
    caloriesConsumed,
    caloriesTarget,
    size = 180,
    strokeWidth = 15
}: CalorieRingProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const progress = Math.min(caloriesConsumed / caloriesTarget, 1);

    const animatedProgress = useSharedValue(0);

    useEffect(() => {
        animatedProgress.value = withTiming(progress, {
            duration: 1500,
            easing: Easing.out(Easing.exp),
        });
    }, [progress]);

    const animatedProps = useAnimatedProps(() => {
        return {
            strokeDashoffset: circumference * (1 - animatedProgress.value),
        };
    });

    return (
        <View style={[styles.container, { width: size, height: size }]}>
            <Svg width={size} height={size}>
                <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
                    {/* Background Circle */}
                    <Circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke={DesignSystem.Colors.light.background} // Or a darker shade for contrast
                        strokeWidth={strokeWidth}
                        fill="transparent"
                    />
                    {/* Progress Circle */}
                    <AnimatedCircle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke={DesignSystem.Colors.light.calories}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        animatedProps={animatedProps}
                        strokeLinecap="round"
                        fill="transparent"
                    />
                </G>
            </Svg>
            <View style={styles.textContainer}>
                <Text style={styles.valueText}>{caloriesConsumed}</Text>
                <Text style={styles.targetText}>/ {caloriesTarget} kcal</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    valueText: {
        fontFamily: DesignSystem.Typography.fontFamily.default,
        fontSize: 32,
        fontWeight: '700',
        color: DesignSystem.Colors.light.text,
    },
    targetText: {
        fontFamily: DesignSystem.Typography.fontFamily.default,
        fontSize: 14,
        color: DesignSystem.Colors.light.textSecondary,
        marginTop: 4,
    },
});
