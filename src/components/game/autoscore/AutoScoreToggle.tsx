import React from "react";
import {TouchableOpacity, View} from "react-native";
import {Feather} from "@expo/vector-icons";
import {useGameStore} from "@/src/stores/gameStore";
import {isWeb} from "@/src/utils/platform";

interface AutoScoreToggleProps {
    isAutoScoreEnabled: boolean;
    isCameraExpanded: boolean;
    onToggleCamera: () => void;
}

export default function AutoScoreToggle({isAutoScoreEnabled, isCameraExpanded, onToggleCamera}: AutoScoreToggleProps) {
    const {toggleAutoScore} = useGameStore();

    return (
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
            <TouchableOpacity
                onPress={isWeb() ? undefined : toggleAutoScore}
                style={isWeb() ? {opacity: 0.5} : {}}
            >
                {isAutoScoreEnabled ? <Feather name="camera" size={24} color="black"/> :
                    <Feather name="camera-off" size={24} color="black"/>}
            </TouchableOpacity>

            {isAutoScoreEnabled && !isWeb() && (
                <TouchableOpacity onPress={onToggleCamera}>
                    <Feather
                        name={isCameraExpanded ? "minimize-2" : "maximize-2"}
                        size={20}
                        color="black"
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};