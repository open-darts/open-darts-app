import {Camera, useCameraDevice, useCameraPermission} from "react-native-vision-camera";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {Animated, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Slider from "@react-native-community/slider";
import {GameViewStyles} from "@/src/styles/GameViewStyles";
import {CameraService} from "@/src/services/camera/cameraService";

interface ZoomCameraViewProps {
    onClose?: () => void;
    isVisible?: boolean;
}

export default function ZoomCameraView({onClose, isVisible = true}: ZoomCameraViewProps) {
    const {hasPermission, requestPermission} = useCameraPermission();
    const [zoom, setZoom] = useState(1);
    const cameraRef = useRef<Camera | null>(null);
    const device = useCameraDevice('back');
    const cameraService = CameraService.getInstance();

    const scale = useRef(new Animated.Value(1)).current;

    const sliderBottomPosition = 80;

    const minZoom = 1;
    const maxZoom = 3;
    const neutralZoom = 1;

    useEffect(() => {
        setZoom(neutralZoom);
    }, [device]);

    useEffect(() => {
        if (cameraRef.current && device) {
            cameraService.setCameraRef(cameraRef.current);
            cameraService.setDevice(device);
        }

        return () => {
            if (!device) {
                cameraService.setCameraRef(null);
            }
        };
    }, [cameraService, device]);

    useEffect(() => {
        if (isVisible) {
            Animated.timing(scale, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false,
            }).start();
        } else {
            scale.setValue(0);
        }
    }, [scale, isVisible]);

    useEffect(() => {
        return () => {
            cameraService.setCameraRef(null);
        };
    }, [cameraService]);

    if (hasPermission === null) {
        return <View/>;
    }

    if (!hasPermission) {
        return (
            <View style={GameViewStyles.permissionContainer}>
                <Text style={GameViewStyles.permissionMessage}>
                    We need your permission to show the camera
                </Text>
                <TouchableOpacity
                    style={GameViewStyles.permissionButton}
                    onPress={requestPermission}
                >
                    <Text style={GameViewStyles.permissionButtonText}>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (!device) {
        return (
            <View style={GameViewStyles.permissionContainer}>
                <Text style={GameViewStyles.permissionMessage}>
                    No camera device found
                </Text>
            </View>);
    }
    const handleCameraRef = useCallback((ref: Camera | null) => {
        cameraRef.current = ref;
        if (ref && device) {
            cameraService.setCameraRef(ref);
            cameraService.setDevice(device);
        }
    }, [cameraService, device]);

    const handleZoom = (zoomLevel: number) => {
        const clampedZoom = Math.max(minZoom, Math.min(maxZoom, zoomLevel));
        setZoom(clampedZoom);
    };

    return (
        <View style={[
            isVisible ? GameViewStyles.expandedCamera : styles.hiddenCamera,
            {zIndex: isVisible ? 1000 : -1}
        ]}>
            <TouchableOpacity
                style={GameViewStyles.camera}
                onPress={isVisible ? onClose : undefined}
                activeOpacity={isVisible ? 1 : 0}
                disabled={!isVisible}
            >
                <Camera
                    ref={handleCameraRef}
                    style={GameViewStyles.camera}
                    device={device}
                    isActive={true}
                    photo={true}
                    zoom={zoom}
                />
                {isVisible && <View style={GameViewStyles.cameraOverlay}/>}
                {isVisible && (
                    <View style={GameViewStyles.closeButton}>
                        <Text style={GameViewStyles.buttonText}>×</Text>
                    </View>
                )}
            </TouchableOpacity>
            {isVisible && (
                <Animated.View
                    style={[
                        GameViewStyles.zoomSliderContainer,
                        {
                            opacity: scale,
                            bottom: sliderBottomPosition,
                            transform: [{
                                translateY: scale.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [50, 0],
                                })
                            }]
                        }
                    ]}
                >
                    <Slider
                        style={GameViewStyles.zoomSlider}
                        minimumValue={minZoom}
                        maximumValue={maxZoom}
                        value={zoom}
                        onValueChange={handleZoom}
                        minimumTrackTintColor="#10b981"
                        maximumTrackTintColor="#e5e7eb"
                        thumbTintColor="#10b981"
                    />
                    <Text style={GameViewStyles.zoomText}>
                        {`${Math.round(zoom * 10) / 10}x`}
                    </Text>
                </Animated.View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    hiddenCamera: {
        position: 'absolute',
        top: -1000,
        left: -1000,
        width: 1,
        height: 1,
        opacity: 0,
        pointerEvents: 'none',
    },
});
