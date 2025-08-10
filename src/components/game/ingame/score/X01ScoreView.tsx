import {Text, View} from "react-native";
import React from "react";
import X01CurrentScoreBoxes from "@/src/components/game/ingame/score/X01CurrentScoreBoxes";
import {DartProcessedResult} from "@/src/types/api";
import {GameScoreStyles} from "@/src/styles/GameScoreStyles";

interface X01ScoreViewProps {
    dartProcessedResult: Partial<DartProcessedResult>;
}

export default function X01ScoreView(props: X01ScoreViewProps) {
    const remainingScore = props.dartProcessedResult.remainingScore ?? 0;

    return (
        <View style={GameScoreStyles.scoreContainer}>
            <View style={GameScoreStyles.remainingScoreContainer}>
                <Text style={GameScoreStyles.remainingScoreText}>{remainingScore}</Text>
                <Text style={GameScoreStyles.remainingScoreLabel}>Remaining</Text>
            </View>
            <X01CurrentScoreBoxes dartThrows={props.dartProcessedResult.currentTurnDarts}/>
        </View>
    );
};