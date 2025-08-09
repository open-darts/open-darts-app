import {useCallback, useEffect, useRef, useState} from 'react';
import {useGameWebSocket} from './useGameWebSocket';
import {CurrentGameState} from '../types/api';

interface UseGameStateProps {
    gameId: string;
    playerId: string;
    websocketUrl?: string;
}

export const useCurrentGameState = ({gameId, playerId, websocketUrl}: UseGameStateProps) => {
    const [trackingState, setTrackingState] = useState<Partial<CurrentGameState>>({
        remainingScore: 0,
        currentTurnDarts: [],
    });

    const handleDartTracked = useCallback((currentGameState: CurrentGameState) => {
        setTrackingState(currentGameState);
    }, []);

    const handleScoreUpdate = useCallback((updatedPlayerId: string, remainingScore: number) => {
        if (updatedPlayerId === playerId) {
            setTrackingState(prev => ({
                ...prev,
                remainingScore: remainingScore,
            }));
        }
    }, [playerId]);

    const captureTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const lastCaptureFunction = useRef<(() => Promise<void>) | null>(null);

    const webSocket = useGameWebSocket({
        gameId,
        playerId,
        websocketUrl,
        onGameStateUpdate: handleDartTracked
    });

    const originalStartCapture = webSocket.startCapture;

    const startCaptureWithTracking = useCallback((captureFunction: () => Promise<void>) => {
        lastCaptureFunction.current = captureFunction;
        originalStartCapture(captureFunction);
    }, [originalStartCapture]);

    const enhancedWebSocket = {
        ...webSocket,
        startCapture: startCaptureWithTracking,
    };

    useEffect(() => {
        if (captureTimeoutRef.current) {
            clearTimeout(captureTimeoutRef.current);
        }

        captureTimeoutRef.current = setTimeout(() => {
            if (webSocket.isConnected && lastCaptureFunction.current) {
                originalStartCapture(lastCaptureFunction.current);
            }
        }, 500);

        return () => {
            if (captureTimeoutRef.current) {
                clearTimeout(captureTimeoutRef.current);
            }
        };
    }, [webSocket, originalStartCapture]);

    const sendCameraFrame = useCallback((imageData: string | ArrayBuffer | Blob) => {
        return webSocket.sendImageData(imageData);
    }, [webSocket]);

    return {
        isConnected: webSocket.isConnected,
        isConnecting: webSocket.isConnecting,
        connectionError: webSocket.error,

        connect: webSocket.connect,
        disconnect: webSocket.disconnect,
        sendCameraFrame,

        startCapture: enhancedWebSocket.startCapture,
        stopCapture: webSocket.stopCapture,

        trackingState: trackingState,
    };
};
