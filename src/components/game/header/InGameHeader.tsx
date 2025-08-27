import {View} from "react-native";
import {styled} from 'nativewind';
import HeaderText from "@/src/components/common/HeaderText";
import Header from "@/src/components/common/Header";
import React from "react";
import ConnectionStatus from "@/src/components/game/header/ConnectionStatus";
import AutoScoreToggle from "@/src/components/game/autoscore/AutoScoreToggle";

const StyledView = styled(View);

interface InGameHeaderProps {
    isConnected: boolean,
    isConnecting: boolean,
    handleReconnect: () => void;
    isAutoScoreEnabled: boolean;
    isCameraExpanded: boolean;
    onToggleCamera: () => void;
    calibrated: boolean;
}

export default function InGameHeader(props: InGameHeaderProps) {
    return (<Header>
        <StyledView className="flex-1 items-start">
            <ConnectionStatus
                isConnected={props.isConnected}
                isConnecting={props.isConnecting}
                onReconnect={props.handleReconnect}
            />
        </StyledView>
        <StyledView className="flex-2 items-center">
            <HeaderText title="OpenDarts"/>
        </StyledView>
        <StyledView className="flex-1 items-end">
            <AutoScoreToggle
                isAutoScoreEnabled={props.isAutoScoreEnabled}
                isCameraExpanded={props.isCameraExpanded}
                onToggleCamera={props.onToggleCamera}
                calibrated={props.calibrated}
            />
        </StyledView>
    </Header>);
};