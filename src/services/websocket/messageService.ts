import {MessageHandler, MessageHandlers, WebSocketMessage} from '../../types/api';

export class WebSocketMessageService {
    private handlers: MessageHandlers = {};
    private readonly instanceId: string;
    private messageQueue: any[] = [];

    constructor() {
        this.instanceId = Math.random().toString(36).substr(2, 9);
    }

    onMessage<T>(messageType: string, handler: MessageHandler<T>): () => void {
        this.handlers[messageType] = handler;
        this.processQueuedMessages(messageType);
        
        return () => {
            delete this.handlers[messageType];
        };
    }

    handleMessage(message: MessageEvent): void {
        try {
            let parsedMessage: any;

            try {
                parsedMessage = JSON.parse(message.data);
            } catch {
                return;
            }

            if (parsedMessage.type) {
                this.handleTypedMessage(parsedMessage);
            } else {
                this.handleDirectMessage(parsedMessage);
            }

        } catch (error) {
            console.error('Error processing WebSocket message:', error);
        }
    }

    private handleTypedMessage(message: WebSocketMessage): void {
        const handler = this.handlers[message.type];
        if (handler) {
            handler(message.data);
        } else {
            console.debug(`No handler registered for message type: ${message.type}`);
        }
    }

    private handleDirectMessage(message: any): void {
        const messageType = this.inferMessageType(message);

        if (messageType) {
            const handler = this.handlers[messageType];
            if (handler) {
                handler(message);
            } else {
                this.messageQueue.push({ type: messageType, message: message, timestamp: Date.now() });
            }
        }
    }

    private processQueuedMessages(messageType: string): void {
        const handler = this.handlers[messageType];
        if (!handler) return;

        const messagesToProcess = this.messageQueue.filter(item => item.type === messageType);
        if (messagesToProcess.length > 0) {
            messagesToProcess.forEach(item => {
                handler(item.message);
            });
            
            this.messageQueue = this.messageQueue.filter(item => item.type !== messageType);
        }
    }

    private inferMessageType(message: any): string | null {
        if (typeof message.remainingScore === 'number' &&
            message.currentTurnDarts &&
            Array.isArray(message.currentTurnDarts) &&
            typeof message.currentDartNumber === 'number') {
            return 'dartProcessedResult';
        }
        return null;
    }

    clearHandlers(): void {
        this.handlers = {};
    }
}
