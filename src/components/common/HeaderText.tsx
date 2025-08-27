import {Text, View} from "react-native";
import React from "react";
import {styled} from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

interface HeaderPropsText {
    title?: string;
    subtitle?: string;
}


export default function HeaderText({title = "OpenDarts", subtitle}: HeaderPropsText) {
    return (
        <StyledView className="items-center justify-center">
            <StyledText className="text-lg font-bold text-tabBar-active tracking-wider">{title}</StyledText>
            {subtitle && (
                <StyledText className="text-sm font-medium text-tabBar-inactive mt-1">{subtitle}</StyledText>
            )}
        </StyledView>
    );
}
