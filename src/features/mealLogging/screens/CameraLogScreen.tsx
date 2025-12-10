import { CupertinoButton } from '@/components/ui/CupertinoButton';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function CameraLogScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const router = useRouter();

    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <CupertinoButton onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing="back">
                <View style={styles.overlay}>
                    <CupertinoButton
                        title="Cancel"
                        variant="plain"
                        onPress={() => router.back()}
                        textStyle={{ color: '#FFF' }}
                        style={styles.backButton}
                    />
                    <View style={styles.shutterContainer}>
                        <CupertinoButton
                            title=""
                            onPress={() => alert('Snap! (AI Analysis Coming Soon)')}
                            style={styles.shutterButton}
                        />
                    </View>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.1)', // Slight dim
    },
    backButton: {
        alignSelf: 'flex-start',
        marginTop: 40,
    },
    shutterContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
    },
    shutterButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#FFF',
        borderWidth: 5,
        borderColor: 'rgba(255,255,255,0.5)',
    }
});
