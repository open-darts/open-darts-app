import React from "react";
import {TouchableOpacity} from "react-native";
import {Feather} from "@expo/vector-icons";
import {useGameStore} from "@/src/stores/gameStore";
import {isWeb} from "@/src/utils/platform";

export default function AutoScoreToggle() {
    const {isAutoScoreEnabled, toggleAutoScore} = useGameStore();


    return (
        <TouchableOpacity
            onPress={isWeb() ? undefined : toggleAutoScore}
            style={isWeb() ? {opacity: 0.5} : {}}
        >
            {isAutoScoreEnabled ? <Feather name="camera" size={24} color="black"/> :
                <Feather name="camera-off" size={24} color="black"/>}
        </TouchableOpacity>
    );
};