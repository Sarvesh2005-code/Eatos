import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CupertinoButton } from '@/components/ui/CupertinoButton';
import { GlassCard } from '@/components/ui/GlassCard';
import { DesignSystem } from '@/constants/DesignSystem';
import { useColorScheme } from '@/hooks/use-color-scheme';

const MOCK_POSTS = [
    {
        id: '1',
        user: 'Sarah M.',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        time: '2h ago',
        content: 'Just made this amazing Key Lime Pie with low-cal sweetener! 🥧😋',
        image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        likes: 24,
        comments: 5,
    },
    {
        id: '2',
        user: 'Mike T.',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        time: '5h ago',
        content: 'Hit my protein goal for the week! progress 💪',
        likes: 89,
        comments: 12,
    },
    {
        id: '3',
        user: 'Healthy Eats',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        time: '1d ago',
        content: 'Meal prep Sunday! Who else is ready for the week?',
        image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        likes: 156,
        comments: 34,
    },
];

export default function CommunityFeedScreen() {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? DesignSystem.Colors.dark : DesignSystem.Colors.light;

    const renderPost = ({ item }: { item: any }) => (
        <GlassCard style={styles.postCard}>
            <View style={styles.postHeader}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                <View style={styles.headerText}>
                    <Text style={[styles.userName, { color: theme.text }]}>{item.user}</Text>
                    <Text style={[styles.time, { color: theme.textSecondary }]}>{item.time}</Text>
                </View>
                <TouchableOpacity>
                    <Ionicons name="ellipsis-horizontal" size={20} color={theme.textSecondary} />
                </TouchableOpacity>
            </View>

            <Text style={[styles.content, { color: theme.text }]}>{item.content}</Text>

            {item.image && (
                <Image source={{ uri: item.image }} style={styles.postImage} />
            )}

            <View style={styles.actions}>
                <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="heart-outline" size={24} color={theme.text} />
                    <Text style={[styles.actionText, { color: theme.text }]}>{item.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="chatbubble-outline" size={24} color={theme.text} />
                    <Text style={[styles.actionText, { color: theme.text }]}>{item.comments}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="paper-plane-outline" size={24} color={theme.text} />
                </TouchableOpacity>
            </View>
        </GlassCard>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.screenHeader}>
                <Text style={[styles.screenTitle, { color: theme.text }]}>Community</Text>
                <TouchableOpacity>
                    <Ionicons name="search" size={24} color={theme.text} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={MOCK_POSTS}
                renderItem={renderPost}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.feed}
                showsVerticalScrollIndicator={false}
            />

            {/* FAB for creating post */}
            <View style={styles.fabContainer}>
                <CupertinoButton
                    title="Post"
                    onPress={() => console.log('New Post')}
                    icon={<Ionicons name="add" size={24} color="#FFF" />}
                    style={styles.fab}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    screenHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    screenTitle: {
        fontSize: 28,
        fontWeight: '700',
    },
    feed: {
        padding: 16,
        gap: 16,
        paddingBottom: 100,
    },
    postCard: {
        padding: 16,
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    headerText: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: '600',
    },
    time: {
        fontSize: 12,
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 12,
    },
    postImage: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        marginBottom: 12,
    },
    actions: {
        flexDirection: 'row',
        gap: 24,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    actionText: {
        fontSize: 14,
        fontWeight: '500',
    },
    fabContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    fab: {
        width: 100,
        borderRadius: 25,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    }
});
