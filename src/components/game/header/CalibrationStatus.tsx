import React from 'react';
import {View} from 'react-native';
import {styled} from 'nativewind';
import {Feather} from "@expo/vector-icons";

const StyledView = styled(View);

interface CalibrationStatusProps {
    calibrated: boolean;
}

export default function CalibrationStatus({calibrated}: CalibrationStatusProps) {
    return (
        <StyledView>
            {calibrated ? (
                <Feather name="check-circle" size={20} color="green"/>
            ) : (
                <Feather name="x-circle" size={20} color="red"/>
            )}
        </StyledView>
    );
}