import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CupertinoButton } from '@/components/ui/CupertinoButton';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassView } from '@/components/ui/GlassView';
import { DesignSystem } from '@/constants/DesignSystem';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RecipeDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const navigation = useNavigation();
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? DesignSystem.Colors.dark : DesignSystem.Colors.light;

    // Mock Data (Replace with fetch)
    const recipe = {
        id,
        title: 'Avocado Toast with Egg',
        image: 'https://images.unsplash.com/photo-1525351484163-7529414395d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        calories: 350,
        macros: { protein: 12, carbs: 30, fat: 18 },
        ingredients: [
            '1 slice whole grain bread',
            '1/2 ripe avocado',
            '1 large egg',
            'Salt and pepper',
            'Red pepper flakes'
        ],
        instructions: [
            'Toast the bread to your liking.',
            'Mash the avocado with salt and pepper.',
            'Fry the egg in a small pan.',
            'Spread avocado on toast and top with egg.',
            'Sprinkle with red pepper flakes.'
        ]
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
                {/* Hero Image */}
                <View style={styles.imageContainer}>
                    <Image source={{ uri: recipe.image }} style={styles.image} />
                    <SafeAreaView style={styles.headerOverlay}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                            <GlassView intensity={50} style={styles.backButtonBlur}>
                                <Ionicons name="chevron-back" size={24} color="#FFF" />
                            </GlassView>
                        </TouchableOpacity>
                    </SafeAreaView>
                </View>

                <View style={styles.content}>
                    <Text style={[styles.title, { color: theme.text }]}>{recipe.title}</Text>

                    <View style={styles.statsRow}>
                        <View style={[styles.statBadge, { backgroundColor: theme.card }]}>
                            <Text style={[styles.statValue, { color: theme.text }]}>{recipe.calories}</Text>
                            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>kcal</Text>
                        </View>
                        <View style={[styles.statBadge, { backgroundColor: theme.card }]}>
                            <Text style={[styles.statValue, { color: theme.text }]}>{recipe.macros.protein}g</Text>
                            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Prot</Text>
                        </View>
                        <View style={[styles.statBadge, { backgroundColor: theme.card }]}>
                            <Text style={[styles.statValue, { color: theme.text }]}>{recipe.macros.carbs}g</Text>
                            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Carbs</Text>
                        </View>
                        <View style={[styles.statBadge, { backgroundColor: theme.card }]}>
                            <Text style={[styles.statValue, { color: theme.text }]}>{recipe.macros.fat}g</Text>
                            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Fat</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: theme.text }]}>Ingredients</Text>
                        <GlassCard variant="flat" style={styles.ingredientsList}>
                            {recipe.ingredients.map((ing, index) => (
                                <View key={index} style={styles.ingredientRow}>
                                    <View style={[styles.bullet, { backgroundColor: theme.primary }]} />
                                    <Text style={[styles.ingredientText, { color: theme.text }]}>{ing}</Text>
                                </View>
                            ))}
                        </GlassCard>
                    </View>

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: theme.text }]}>Instructions</Text>
                        {recipe.instructions.map((step, index) => (
                            <View key={index} style={styles.stepRow}>
                                <View style={[styles.stepNumber, { backgroundColor: theme.card }]}>
                                    <Text style={[styles.stepNumberText, { color: theme.primary }]}>{index + 1}</Text>
                                </View>
                                <Text style={[styles.stepText, { color: theme.text }]}>{step}</Text>
                            </View>
                        ))}
                    </View>

                </View>
            </ScrollView>

            {/* Floating Action Bar */}
            <GlassView intensity={80} style={[styles.bottomBar, { borderTopColor: theme.border }]}>
                <CupertinoButton
                    title="Log This Meal"
                    onPress={() => alert('Meal Logged!')}
                    icon={<Ionicons name="add-circle" size={20} color="#FFF" />}
                />
            </GlassView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        height: 300,
        width: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    headerOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 16,
    },
    backButton: {
        marginTop: 8,
    },
    backButtonBlur: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    content: {
        marginTop: -30,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 24,
        backgroundColor: 'transparent', // Let parent bg show through if needed, but usually we want solid or blurry
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 20,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
    },
    statBadge: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 12,
        alignItems: 'center',
        minWidth: 70,
    },
    statValue: {
        fontSize: 16,
        fontWeight: '700',
    },
    statLabel: {
        fontSize: 12,
        fontWeight: '500',
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 16,
    },
    ingredientsList: {
        gap: 12,
    },
    ingredientRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    bullet: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    ingredientText: {
        fontSize: 16,
    },
    stepRow: {
        flexDirection: 'row',
        marginBottom: 20,
        gap: 16,
    },
    stepNumber: {
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepNumberText: {
        fontWeight: '700',
        fontSize: 14,
    },
    stepText: {
        flex: 1,
        fontSize: 16,
        lineHeight: 24,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        paddingBottom: 40,
        borderTopWidth: StyleSheet.hairlineWidth,
    }
});
