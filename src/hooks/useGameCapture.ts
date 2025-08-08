import {useCallback, useEffect, useState} from 'react';
import {AppState, Platform} from 'react-native';
import {CameraService} from '../services/camera/cameraService';
import {CAMERA_CONFIG} from '../config/config';
import {useGameStore} from "@/src/stores/gameStore";
import {isWeb} from "@/src/utils/platform";

interface UseGameCaptureProps {
    isConnected: boolean;
    sendBinary: (data: string | ArrayBuffer | Blob) => boolean;
    startCapture: (callback: () => Promise<void>) => void;
    stopCapture: () => void;
}

export const useGameCapture = ({
                                   isConnected,
                                   sendBinary,
                                   startCapture,
                                   stopCapture
                               }: UseGameCaptureProps) => {
    const [isCapturing, setIsCapturing] = useState(false);
    const isAutoScoreEnabled = useGameStore((state) => state.isAutoScoreEnabled);

    const cameraService = CameraService.getInstance();

    const handleCameraCapture = useCallback(async () => {
        try {
            const success = await cameraService.captureAndSend(
                sendBinary,
                {
                    quality: CAMERA_CONFIG.DEFAULT_QUALITY,
                    skipProcessing: CAMERA_CONFIG.SKIP_PROCESSING,
                }
            );
        } catch (error) {
            console.error('Camera capture error:', error);
        }
    }, [sendBinary, cameraService]);

    const startCaptureWhenReady = useCallback(() => {
        if (cameraService.isCameraReady()) {
            console.log('Camera is ready, starting video stream capture...');
            cameraService.startVideoRecording();
            startCapture(handleCameraCapture);
        } else {
            setTimeout(startCaptureWhenReady, 500);
        }
    }, [cameraService, startCapture, handleCameraCapture]);

    const stopCaptureAndRecording = useCallback(() => {
        console.log('Stopping capture...');
        setIsCapturing(false);
        cameraService.stopVideoRecording();
        stopCapture();
    }, [cameraService, stopCapture]);
    useEffect(() => {

        if (isConnected && !isCapturing && isAutoScoreEnabled && !isWeb()) {
            setIsCapturing(true);
            setTimeout(startCaptureWhenReady, 1000);
        } else if ((!isConnected || !isAutoScoreEnabled || isWeb()) && isCapturing) {
            stopCaptureAndRecording();
        }

        return () => {
            stopCapture();
            cameraService.stopVideoRecording();
        };
    }, [isConnected, isCapturing, isAutoScoreEnabled, startCaptureWhenReady, stopCaptureAndRecording]);
    useEffect(() => {
        const handleAppStateChange = (nextAppState: string) => {
            // Auto-scoring is not available on web
            const isWebPlatform = Platform.OS === 'web';
            
            if (nextAppState === 'background') {
                console.log('App going to background, pausing capture...');
                stopCaptureAndRecording();
            } else if (nextAppState === 'active' && isConnected && isAutoScoreEnabled && !isWebPlatform) {
                console.log('App became active, resuming capture...');
                setTimeout(() => {
                    if (cameraService.isCameraReady()) {
                        cameraService.startVideoRecording();
                        startCapture(handleCameraCapture);
                        setIsCapturing(true);
                    }
                }, 1000);
            }
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);
        return () => subscription?.remove();
    }, [isConnected, isAutoScoreEnabled, startCapture, handleCameraCapture, cameraService, stopCaptureAndRecording]);

    return {
        isCapturing,
        handleCameraCapture
    };
};
