import {useCallback, useEffect, useRef, useState} from 'react';
import {useGameWebSocket} from './useGameWebSocket';
import {DartThrow, DartTrackedTo} from '../types/api';

interface UseGameStateProps {
    gameId: string;
    playerId: string;
    websocketUrl?: string;
}

interface DartTrackingState {
    currentScore: number | null;
    lastDart: DartThrow | null;
    dartHistory: DartTrackedTo[];
    isGameActive: boolean;
}

export const useGameResult = ({gameId, playerId, websocketUrl}: UseGameStateProps) => {
    const [trackingState, setTrackingState] = useState<DartTrackingState>({
        currentScore: null,
        lastDart: null,
        dartHistory: [],
        isGameActive: false,
    });

    const handleDartTracked = useCallback((dartData: DartTrackedTo) => {
        setTrackingState(prev => ({
            ...prev,
            currentScore: dartData.remainingScore,
            lastDart: dartData.trackedDart,
            dartHistory: [dartData, ...prev.dartHistory.slice(0, 19)],
            isGameActive: true,
        }));
    }, []);

    const handleScoreUpdate = useCallback((updatedPlayerId: string, remainingScore: number) => {
        if (updatedPlayerId === playerId) {
            setTrackingState(prev => ({
                ...prev,
                currentScore: remainingScore,
            }));
        }
    }, [playerId]);

    const captureTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const lastCaptureFunction = useRef<(() => Promise<void>) | null>(null);
    
    const webSocket = useGameWebSocket({
        gameId,
        playerId,
        websocketUrl,
        onDartTracked: handleDartTracked,
        onScoreUpdate: handleScoreUpdate,
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
        if (trackingState.lastDart) {
            if (captureTimeoutRef.current) {
                clearTimeout(captureTimeoutRef.current);
            }
            
            captureTimeoutRef.current = setTimeout(() => {
                if (webSocket.isConnected && lastCaptureFunction.current) {
                    originalStartCapture(lastCaptureFunction.current);
                }
            }, 500);
        }
        
        return () => {
            if (captureTimeoutRef.current) {
                clearTimeout(captureTimeoutRef.current);
            }
        };
    }, [trackingState.lastDart, webSocket, originalStartCapture]);

    const clearTrackingData = useCallback(() => {
        setTrackingState({
            currentScore: null,
            lastDart: null,
            dartHistory: [],
            isGameActive: false,
        });
    }, []);

    const sendCameraFrame = useCallback((imageData: string | ArrayBuffer | Blob) => {
        return webSocket.sendImageData(imageData);
    }, [webSocket]);

    return {
        isConnected: webSocket.isConnected,
        isConnecting: webSocket.isConnecting,
        connectionError: webSocket.error,
        
        currentScore: trackingState.currentScore,
        lastDart: trackingState.lastDart,
        dartHistory: trackingState.dartHistory,
        isGameActive: trackingState.isGameActive,
        
        connect: webSocket.connect,
        disconnect: webSocket.disconnect,
        sendCameraFrame,
        clearTrackingData,
        
        startCapture: enhancedWebSocket.startCapture,
        stopCapture: webSocket.stopCapture,
    };
};
