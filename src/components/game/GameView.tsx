import React, {useEffect} from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import CameraSection from "./CameraSection";
import {GlobalStyles} from "../../styles/GlobalStyles";
import {useDartTracking} from "../../hooks/useDartTracking";
import {useGameCapture} from "../../hooks/useGameCapture";
import {useErrorHandler} from "../../hooks/useErrorHandler";
import InGameHeader from "@/src/components/game/InGameHeader";
import {DartHistory} from "./DartHistory";
import {RemainingScore} from "./RemainingScore";
import {useGameStore} from "@/src/stores/gameStore";
import {isWeb} from "@/src/utils/platform";

interface GameViewProps {
    gameId: string;
    playerId: string;
    websocketUrl?: string;
    fps?: number;
}

export default function GameView({ gameId, playerId, websocketUrl, fps }: GameViewProps) {
    const isAutoScoreEnabled = useGameStore((state) => state.isAutoScoreEnabled);

    const {
        isConnected,
        isConnecting,
        connectionError,
        currentScore,
        lastDart,
        dartHistory,
        isGameActive,
        connect,
        disconnect,
        sendCameraFrame,
        startCapture,
        stopCapture,
        clearTrackingData,
    } = useDartTracking({
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

    useEffect(() => {
        if (lastDart) {
            console.log('New dart detected:', {
                score: lastDart.score,
                multiplier: lastDart.multiplier,
                segment: lastDart.segment,
                remainingScore: currentScore
            });
        }
    }, [lastDart, currentScore]);

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
                <RemainingScore
                    score={currentScore}
                    playerId={playerId}
                    isGameActive={isGameActive}
                />

                <DartHistory dartHistory={dartHistory} maxDarts={3} />

                {isAutoScoreEnabled && !isWeb() && (
                    <View style={styles.cameraContainer}>
                        <CameraSection />
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
