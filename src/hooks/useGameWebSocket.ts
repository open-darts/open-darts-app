import {useCallback, useEffect} from 'react';
import {useWebSocketMessages} from './useWebSocketMessages';
import {WEBSOCKET_CONFIG} from '../config/config';
import {CurrentGameState} from "@/src/types/api";

interface UseGameWebSocketProps {
    gameId: string;
    playerId: string;
    websocketUrl?: string;
    fps?: number;
    onGameStateUpdate: (currentGameState: CurrentGameState) => void;
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

    const webSocketMessages = useWebSocketMessages({
        url: wsUrl,
        fps,
        autoConnect: true,
        reconnectAttempts: WEBSOCKET_CONFIG.RECONNECT_ATTEMPTS,
        reconnectDelay: WEBSOCKET_CONFIG.RECONNECT_DELAY,
        heartbeatInterval: WEBSOCKET_CONFIG.HEARTBEAT_INTERVAL,
    });

    useEffect(() => {
        return webSocketMessages.onMessage<CurrentGameState>('currentGameState', (currentGameState) => {
            console.log('Updated game state:', currentGameState);
            onGameStateUpdate(currentGameState);
        });
    }, [webSocketMessages, onGameStateUpdate]);

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
