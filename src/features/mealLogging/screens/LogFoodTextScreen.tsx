import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CupertinoButton } from '@/components/ui/CupertinoButton';
import { GlassCard } from '@/components/ui/GlassCard';
import { DesignSystem } from '@/constants/DesignSystem';
import { GeminiService } from '@/features/ai/GeminiService';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function LogFoodTextScreen() {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const colorScheme = useColorScheme();
    const router = useRouter();
    const theme = colorScheme === 'dark' ? DesignSystem.Colors.dark : DesignSystem.Colors.light;

    const handleAnalyze = async () => {
        if (!input.trim()) return;
        setIsLoading(true);
        setResult(null);
        try {
            const data = await GeminiService.analyzeText(input);
            setResult(data);
        } catch (error) {
            alert('Failed to analyze food. check API Key.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = () => {
        // TODO: Save to Firestore
        alert('Meal Logged!');
        router.back();
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.header}>
                <CupertinoButton
                    title="Back"
                    variant="plain"
                    onPress={() => router.back()}
                    icon={<Ionicons name="chevron-back" size={24} color={theme.primary} />}
                />
                <Text style={[styles.title, { color: theme.text }]}>Log Meal</Text>
                <View style={{ width: 60 }} />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.content}>
                    <Text style={[styles.label, { color: theme.textSecondary }]}>
                        Description
                    </Text>
                    <View style={[styles.inputContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
                        <TextInput
                            style={[styles.input, { color: theme.text }]}
                            placeholder="e.g. 2 eggs and toast..."
                            placeholderTextColor={theme.textSecondary}
                            multiline
                            value={input}
                            onChangeText={setInput}
                            autoFocus
                        />
                    </View>

                    <CupertinoButton
                        title={isLoading ? "Analyzing..." : "Analyze"}
                        onPress={handleAnalyze}
                        loading={isLoading}
                        disabled={!input.trim()}
                        style={styles.analyzeParams}
                    />

                    {result && (
                        <GlassCard style={styles.resultCard}>
                            <Text style={[styles.resultTitle, { color: theme.text }]}>{result.name}</Text>

                            <View style={styles.macroRow}>
                                <View style={styles.macroItem}>
                                    <Text style={[styles.macroValue, { color: DesignSystem.Colors.light.calories }]}>{result.calories}</Text>
                                    <Text style={[styles.macroLabel, { color: theme.textSecondary }]}>Cal</Text>
                                </View>
                                <View style={styles.macroItem}>
                                    <Text style={[styles.macroValue, { color: DesignSystem.Colors.light.protein }]}>{result.protein}g</Text>
                                    <Text style={[styles.macroLabel, { color: theme.textSecondary }]}>Prot</Text>
                                </View>
                                <View style={styles.macroItem}>
                                    <Text style={[styles.macroValue, { color: DesignSystem.Colors.light.carbs }]}>{result.carbs}g</Text>
                                    <Text style={[styles.macroLabel, { color: theme.textSecondary }]}>Carbs</Text>
                                </View>
                                <View style={styles.macroItem}>
                                    <Text style={[styles.macroValue, { color: DesignSystem.Colors.light.fat }]}>{result.fat}g</Text>
                                    <Text style={[styles.macroLabel, { color: theme.textSecondary }]}>Fat</Text>
                                </View>
                            </View>

                            <CupertinoButton
                                title="Save Meal"
                                onPress={handleSave}
                                style={{ marginTop: 16 }}
                            />
                        </GlassCard>
                    )}

                </ScrollView>
            </KeyboardAvoidingView>
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
        paddingHorizontal: 8,
        paddingBottom: 8,
    },
    title: {
        fontSize: 17,
        fontWeight: '600',
    },
    content: {
        padding: 20,
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    inputContainer: {
        borderRadius: 12,
        borderWidth: 1,
        padding: 12,
        minHeight: 100,
        marginBottom: 20,
    },
    input: {
        fontSize: 17,
        textAlignVertical: 'top',
    },
    analyzeParams: {
        marginBottom: 24,
    },
    resultCard: {

    },
    resultTitle: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 16,
        textAlign: 'center',
    },
    macroRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 8,
    },
    macroItem: {
        alignItems: 'center',
    },
    macroValue: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 4,
    },
    macroLabel: {
        fontSize: 13,
        fontWeight: '500',
    }
});
