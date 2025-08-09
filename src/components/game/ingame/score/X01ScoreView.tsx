import {Text, View} from "react-native";
import React from "react";
import X01CurrentScoreBoxes from "@/src/components/game/ingame/score/X01CurrentScoreBoxes";
import {CurrentGameState} from "@/src/types/api";

interface X01ScoreViewProps {
    currentState: Partial<CurrentGameState>;
}

export default function X01ScoreView(props: X01ScoreViewProps) {

    return (
        <View>
            <View>
                <Text>{props.currentState.remainingScore}</Text>
                <Text>Remaining</Text>
            </View>
            <X01CurrentScoreBoxes dartThrows={props.currentState.currentTurnDarts}/>
        </View>
    );
};