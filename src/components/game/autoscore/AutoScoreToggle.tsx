import React from "react";
import {TouchableOpacity, View} from "react-native";
import {styled} from 'nativewind';
import {Feather} from "@expo/vector-icons";
import {useGameStore} from "@/src/stores/gameStore";
import {isWeb} from "@/src/utils/platform";
import CalibrationStatus from "@/src/components/game/header/CalibrationStatus";

const StyledView = styled(View);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface AutoScoreToggleProps {
    isAutoScoreEnabled: boolean;
    isCameraExpanded: boolean;
    onToggleCamera: () => void;
    calibrated: boolean;
}

export default function AutoScoreToggle({
                                            isAutoScoreEnabled,
                                            isCameraExpanded,
                                            onToggleCamera,
                                            calibrated
                                        }: AutoScoreToggleProps) {
    const {toggleAutoScore} = useGameStore();

    return (
        <StyledView className="flex-row items-center gap-3">
            {isAutoScoreEnabled && !isWeb() && (
                <>
                    <CalibrationStatus calibrated={calibrated}/>
                    <StyledTouchableOpacity onPress={onToggleCamera}>
                        <Feather
                            name={isCameraExpanded ? "minimize-2" : "maximize-2"}
                            size={20}
                            color="black"
                        />
                    </StyledTouchableOpacity>
                </>
            )}
            <StyledTouchableOpacity
                onPress={isWeb() ? undefined : toggleAutoScore}
                className={isWeb() ? "opacity-50" : ""}
            >
                {isAutoScoreEnabled ? <Feather name="camera" size={24} color="black"/> :
                    <Feather name="camera-off" size={24} color="black"/>}
            </StyledTouchableOpacity>
        </StyledView>
    );
};