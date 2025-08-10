import {Camera, useCameraDevice, useCameraPermission} from "react-native-vision-camera";
import React, {useEffect, useRef, useState} from "react";
import {Animated, Text, TouchableOpacity, View} from "react-native";
import Slider from "@react-native-community/slider";
import {useCameraUI} from "@/src/hooks/useCameraUI";
import {GameViewStyles} from "@/src/styles/GameViewStyles";
import {CameraService} from "@/src/services/camera/cameraService";

export default function ZoomCameraView() {
    const {hasPermission, requestPermission} = useCameraPermission();
    const [zoom, setZoom] = useState(1);
    const cameraRef = useRef<Camera | null>(null);
    const device = useCameraDevice('back');
    const cameraService = CameraService.getInstance();

    const {isCameraExpanded, handleToggleCamera} = useCameraUI();

    const scale = useRef(new Animated.Value(0)).current;

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
    }, [cameraService, device]);

    useEffect(() => {
        Animated.timing(scale, {
            toValue: isCameraExpanded ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [isCameraExpanded, scale]);

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
    const handleZoom = (zoomLevel: number) => {
        const clampedZoom = Math.max(minZoom, Math.min(maxZoom, zoomLevel));
        setZoom(clampedZoom);
    };

    // Determine container style based on expansion state
    const containerStyle = isCameraExpanded
        ? GameViewStyles.expandedCamera
        : GameViewStyles.compactCamera;

    return (
        <View style={containerStyle}>
            <TouchableOpacity
                style={GameViewStyles.camera}
                onPress={handleToggleCamera}
                activeOpacity={1}
            >
                <Camera
                    ref={cameraRef}
                    style={GameViewStyles.camera}
                    device={device}
                    isActive={true}
                    photo={true}
                    zoom={zoom}
                />
                <View style={GameViewStyles.cameraOverlay}/>
                {!isCameraExpanded && (
                    <View style={GameViewStyles.expandButton}>
                        <Text style={GameViewStyles.buttonText}>+</Text>
                    </View>
                )}
                {isCameraExpanded && (
                    <View style={GameViewStyles.closeButton}>
                        <Text style={GameViewStyles.buttonText}>×</Text>
                    </View>
                )}
            </TouchableOpacity>
            {isCameraExpanded && (
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
