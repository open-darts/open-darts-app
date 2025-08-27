import {Text, View} from "react-native";
import React from "react";

interface HeaderPropsText {
    title?: string;
    subtitle?: string;
}


export default function HeaderText({title = "OpenDarts", subtitle}: HeaderPropsText) {
    return (
        <View className="items-center justify-center">
            <Text className="text-lg font-bold text-tabBar-active tracking-wider">{title}</Text>
            {subtitle && (
                <Text className="text-sm font-medium text-tabBar-inactive mt-1">{subtitle}</Text>
            )}
        </View>
    );
}
