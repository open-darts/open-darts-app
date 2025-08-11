import {useCallback, useEffect} from 'react';
import {useGameMessages} from './useGameMessages';
import {WEBSOCKET_CONFIG} from '../config/config';
import {DartProcessedResult} from "@/src/types/api";

interface UseGameWebSocketProps {
    gameId: string;
    playerId: string;
    websocketUrl?: string;
    fps?: number;
    onGameStateUpdate: (dartProcessedResult: DartProcessedResult) => void;
}

export const useGameWebSocket = ({
                                     gameId,
                                     playerId,
                                     websocketUrl,
                                     fps = WEBSOCKET_CONFIG.DEFAULT_FPS,
                                     onGameStateUpdate
                                 }: UseGameWebSocketProps) => {
    let wsUrl: string;
    if (websocketUrl) {
        wsUrl = websocketUrl;
    } else {
        wsUrl = `${WEBSOCKET_CONFIG.DEFAULT_BASE_URL}/ws/app/${playerId}/${gameId}`;
    }

    const gameMessages = useGameMessages({
        url: wsUrl,
        fps,
        autoConnect: true,
        reconnectAttempts: WEBSOCKET_CONFIG.RECONNECT_ATTEMPTS,
        reconnectDelay: WEBSOCKET_CONFIG.RECONNECT_DELAY,
        heartbeatInterval: WEBSOCKET_CONFIG.HEARTBEAT_INTERVAL,
    });

    useEffect(() => {
        return gameMessages.onMessage<DartProcessedResult>('dartProcessedResult', (dartProcessedResult) => {
            console.log('Dart processed:', dartProcessedResult);
            onGameStateUpdate(dartProcessedResult);
        });
    }, [gameMessages, onGameStateUpdate]);

    const sendImageData = useCallback((imageData: string | ArrayBuffer | Blob) => {
        return gameMessages.sendBinary(imageData);
    }, [gameMessages]);

    const sendMessage = useCallback((message: any) => {
        return gameMessages.sendMessage(message);
    }, [gameMessages]);

    return {
        ...gameMessages,
        sendImageData,
        sendMessage,
    };
};
