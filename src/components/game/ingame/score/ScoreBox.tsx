import {Text, View} from "react-native";
import React from "react";
import {GameScoreStyles} from "@/src/styles/GameScoreStyles";

interface ScoreBoxProps {
    text: string | String
}


export default function ScoreBox({text}: ScoreBoxProps) {
    const isEmpty = !text || text === "";
    
    return (
        <View style={[
            GameScoreStyles.scoreBox,
            isEmpty && GameScoreStyles.scoreBoxEmpty
        ]}>
            <Text style={[
                GameScoreStyles.scoreBoxText,
                isEmpty && GameScoreStyles.scoreBoxEmptyText
            ]}>
                {isEmpty ? "-" : text}
            </Text>
        </View>
    );
};