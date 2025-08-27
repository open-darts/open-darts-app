import React from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import {useGameStore} from "@/src/stores/gameStore";
import InGameHeader from "@/src/components/game/header/InGameHeader";
import {styled} from 'nativewind';
import {useErrorHandler} from "@/src/hooks/useErrorHandler";
import {useGameCapture} from "@/src/hooks/useGameCapture";
import {useDartProcessedResult} from "@/src/hooks/useDartProcessedResult";
import X01ScoreView from "@/src/components/game/ingame/score/X01ScoreView";
import {useCameraUI} from "@/src/hooks/useCameraUI";
import ZoomCameraView from "@/src/components/game/autoscore/ZoomCameraView";

const StyledView = styled(View);

interface GameViewProps {
    gameId: string;
    playerId: string;
    websocketUrl?: string;
    fps?: number;
}

export default function GameView({gameId, playerId, websocketUrl, fps}: GameViewProps) {
    const isAutoScoreEnabled = useGameStore((state) => state.isAutoScoreEnabled);
    const {isCameraExpanded, handleToggleCamera} = useCameraUI();

    const {
        isConnected,
        isConnecting,
        connectionError,
        connect,
        sendCameraFrame,
        startCapture,
        stopCapture,
        dartProcessedResult,
        calibrated
    } = useDartProcessedResult({
        gameId,
        playerId,
        websocketUrl,
    });

    useGameCapture({
        isConnected,
        sendBinary: sendCameraFrame,
        startCapture,
        stopCapture,
        isCameraActive: isAutoScoreEnabled
    });

    useErrorHandler(connectionError);

    const handleReconnect = () => {
        connect();
    };

    return (
        <StyledView className="flex-1 bg-background p-0">
            <InGameHeader
                isConnected={isConnected}
                isConnecting={isConnecting}
                handleReconnect={handleReconnect}
                isAutoScoreEnabled={isAutoScoreEnabled}
                isCameraExpanded={isCameraExpanded}
                onToggleCamera={handleToggleCamera}
                calibrated={calibrated}
            />

            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <X01ScoreView dartProcessedResult={dartProcessedResult}/>
            </ScrollView>

            {isAutoScoreEnabled && (
                <ZoomCameraView
                    onClose={handleToggleCamera}
                    isVisible={isCameraExpanded}
                />
            )}
        </StyledView>
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
});
