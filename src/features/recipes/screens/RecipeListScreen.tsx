import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CupertinoButton } from '@/components/ui/CupertinoButton';
import { GlassCard } from '@/components/ui/GlassCard';
import { DesignSystem } from '@/constants/DesignSystem';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface Recipe {
    id: string;
    title: string;
    calories: number;
    time: string;
    image?: string;
}

const MOCK_RECIPES: Recipe[] = [
    { id: '1', title: 'Avocado Toast with Egg', calories: 350, time: '10 min', image: 'https://images.unsplash.com/photo-1525351484163-7529414395d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    { id: '2', title: 'Chicken Salad', calories: 450, time: '15 min', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    { id: '3', title: 'Oatmeal & Berries', calories: 280, time: '5 min' },
];

export default function RecipeListScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? DesignSystem.Colors.dark : DesignSystem.Colors.light;

    const renderRecipeItem = ({ item }: { item: Recipe }) => (
        <TouchableOpacity onPress={() => console.log('View Recipe', item.id)}>
            <GlassCard style={styles.card}>
                {item.image && (
                    <Image source={{ uri: item.image }} style={styles.recipeImage} />
                )}
                <View style={styles.cardContent}>
                    <Text style={[styles.recipeTitle, { color: theme.text }]}>{item.title}</Text>
                    <View style={styles.metaRow}>
                        <View style={styles.metaItem}>
                            <Ionicons name="flame-outline" size={14} color={DesignSystem.Colors.light.calories} />
                            <Text style={[styles.metaText, { color: theme.textSecondary }]}>{item.calories} kcal</Text>
                        </View>
                        <View style={styles.metaItem}>
                            <Ionicons name="time-outline" size={14} color={theme.textSecondary} />
                            <Text style={[styles.metaText, { color: theme.textSecondary }]}>{item.time}</Text>
                        </View>
                    </View>
                </View>
            </GlassCard>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: theme.text }]}>My Recipes</Text>
                <CupertinoButton
                    title="Add"
                    variant="tinted"
                    onPress={() => console.log('Add Recipe')}
                    icon={<Ionicons name="add" size={20} color={theme.primary} />}
                    style={{ height: 36, paddingVertical: 0, paddingHorizontal: 12 }}
                />
            </View>

            <FlatList
                data={MOCK_RECIPES}
                renderItem={renderRecipeItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <Text style={[styles.emptyText, { color: theme.textSecondary }]}>No recipes yet.</Text>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
    },
    listContent: {
        padding: 16,
        gap: 16,
    },
    card: {
        padding: 0, // Reset padding for image
    },
    recipeImage: {
        width: '100%',
        height: 150,
        backgroundColor: '#EEE',
    },
    cardContent: {
        padding: 16,
    },
    recipeTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
    metaRow: {
        flexDirection: 'row',
        gap: 16,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    metaText: {
        fontSize: 14,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 40,
    }
});
