import React from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import {useGameStore} from "@/src/stores/gameStore";
import {isWeb} from "@/src/utils/platform";
import InGameHeader from "@/src/components/game/header/InGameHeader";
import CameraSection from "@/src/components/game/autoscore/CameraSection";
import {GlobalStyles} from "@/src/styles/GlobalStyles";
import {useErrorHandler} from "@/src/hooks/useErrorHandler";
import {useGameCapture} from "@/src/hooks/useGameCapture";
import {useGameResult} from "@/src/hooks/useGameResult";

interface GameViewProps {
    gameId: string;
    playerId: string;
    websocketUrl?: string;
    fps?: number;
}

export default function GameView({gameId, playerId, websocketUrl, fps}: GameViewProps) {
    const isAutoScoreEnabled = useGameStore((state) => state.isAutoScoreEnabled);

    const {
        isConnected,
        isConnecting,
        connectionError,
        connect,
        sendCameraFrame,
        startCapture,
        stopCapture,
    } = useGameResult({
        gameId,
        playerId,
        websocketUrl,
    });

    useGameCapture({
        isConnected,
        sendBinary: sendCameraFrame,
        startCapture,
        stopCapture
    });

    useErrorHandler(connectionError);

    const handleReconnect = () => {
        connect();
    };

    return (
        <View style={GlobalStyles.containerWithHeader}>
            <InGameHeader
                isConnected={isConnected}
                isConnecting={isConnecting}
                handleReconnect={handleReconnect}
            />

            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                {isAutoScoreEnabled && !isWeb() && (
                    <View style={styles.cameraContainer}>
                        <CameraSection/>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
    },
    contentContainer: {
        paddingBottom: 20,
    },
    cameraContainer: {
        marginTop: 10,
    },
});
