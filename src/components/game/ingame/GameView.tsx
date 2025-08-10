import React from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import {useGameStore} from "@/src/stores/gameStore";
import InGameHeader from "@/src/components/game/header/InGameHeader";
import CameraSection from "@/src/components/game/autoscore/CameraSection";
import {GlobalStyles} from "@/src/styles/GlobalStyles";
import {useErrorHandler} from "@/src/hooks/useErrorHandler";
import {useGameCapture} from "@/src/hooks/useGameCapture";
import {useCurrentGameState} from "@/src/hooks/useCurrentGameState";
import X01ScoreView from "@/src/components/game/ingame/score/X01ScoreView";
import {useCameraUI} from "@/src/hooks/useCameraUI";

interface GameViewProps {
    gameId: string;
    playerId: string;
    websocketUrl?: string;
    fps?: number;
}

export default function GameView({gameId, playerId, websocketUrl, fps}: GameViewProps) {
    const isAutoScoreEnabled = useGameStore((state) => state.isAutoScoreEnabled);
    const {isCameraExpanded} = useCameraUI();

    const {
        isConnected,
        isConnecting,
        connectionError,
        connect,
        sendCameraFrame,
        startCapture,
        stopCapture,
        currentGameState
    } = useCurrentGameState({
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

            {isAutoScoreEnabled && isCameraExpanded ? (
                // When camera is expanded, show it full screen
                <View style={styles.fullScreenContainer}>
                    <CameraSection/>
                </View>
            ) : (
                // When camera is not expanded or auto score is disabled
                <>
                    <ScrollView
                        style={styles.scrollContainer}
                        contentContainerStyle={styles.contentContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        <X01ScoreView currentState={currentGameState}/>
                    </ScrollView>

                    {isAutoScoreEnabled && !isCameraExpanded && (
                        <View style={styles.compactCameraContainer}>
                            <CameraSection/>
                        </View>
                    )}
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
    },
    contentContainer: {
        paddingBottom: 20,
        paddingTop: 20,
    },
    compactCameraContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        zIndex: 10,
    },
    fullScreenContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
    },
});
