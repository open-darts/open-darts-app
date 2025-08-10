import {View} from "react-native";
import {HeaderStyles} from "@/src/styles/HeaderStyles";
import HeaderText from "@/src/components/common/HeaderText";
import Header from "@/src/components/common/Header";
import React from "react";
import ConnectionStatus from "@/src/components/game/header/ConnectionStatus";
import AutoScoreToggle from "@/src/components/game/autoscore/AutoScoreToggle";

interface InGameHeaderProps {
    isConnected: boolean,
    isConnecting: boolean,
    handleReconnect: () => void;
    isAutoScoreEnabled: boolean;
    isCameraExpanded: boolean;
    onToggleCamera: () => void;
}

export default function InGameHeader(props: InGameHeaderProps) {
    return (<Header>
        <View style={HeaderStyles.leftContent}>
            <ConnectionStatus
                isConnected={props.isConnected}
                isConnecting={props.isConnecting}
                onReconnect={props.handleReconnect}
            />
        </View>
        <View style={HeaderStyles.centerContent}>
            <HeaderText title="OpenDarts"/>
        </View>
        <View style={HeaderStyles.rightContent}>
            <AutoScoreToggle
                isAutoScoreEnabled={props.isAutoScoreEnabled}
                isCameraExpanded={props.isCameraExpanded}
                onToggleCamera={props.onToggleCamera}
            />
        </View>
    </Header>);
};