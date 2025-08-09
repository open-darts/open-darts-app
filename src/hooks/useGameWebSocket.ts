import {useCallback, useEffect} from 'react';
import {useWebSocketMessages} from './useWebSocketMessages';
import {WEBSOCKET_CONFIG} from '../config/config';
import {DartTrackedTo} from '../types/api';

interface UseGameWebSocketProps {
    gameId: string;
    playerId: string;
    websocketUrl?: string;
    fps?: number;
    onDartTracked?: (dartData: DartTrackedTo) => void;
    onScoreUpdate?: (playerId: string, remainingScore: number) => void;
}

export const useGameWebSocket = ({
                                     gameId,
                                     playerId,
                                     websocketUrl,
                                     fps = WEBSOCKET_CONFIG.DEFAULT_FPS,
                                     onDartTracked,
                                     onScoreUpdate,
                                 }: UseGameWebSocketProps) => {
    let wsUrl: string;
    if (websocketUrl) {
        wsUrl = websocketUrl;
    } else {
        wsUrl = `${WEBSOCKET_CONFIG.DEFAULT_BASE_URL}/ws/app/${playerId}/${gameId}`;
    }

    const webSocketMessages = useWebSocketMessages({
        url: wsUrl,
        fps,
        autoConnect: true,
        reconnectAttempts: WEBSOCKET_CONFIG.RECONNECT_ATTEMPTS,
        reconnectDelay: WEBSOCKET_CONFIG.RECONNECT_DELAY,
        heartbeatInterval: WEBSOCKET_CONFIG.HEARTBEAT_INTERVAL,
    });

    useEffect(() => {
        return webSocketMessages.onMessage<DartTrackedTo>('dartTracked', (dartData) => {
            console.log('Dart tracked:', dartData);
            onDartTracked?.(dartData);
            onScoreUpdate?.(dartData.currentPlayer, dartData.remainingScore);
        });
    }, [webSocketMessages, onDartTracked, onScoreUpdate]);

    const sendImageData = useCallback((imageData: string | ArrayBuffer | Blob) => {
        return webSocketMessages.sendBinary(imageData);
    }, [webSocketMessages]);

    const sendMessage = useCallback((message: any) => {
        return webSocketMessages.sendMessage(message);
    }, [webSocketMessages]);

    return {
        ...webSocketMessages,
        sendImageData,
        sendMessage,
    };
};
