import {Text, View} from "react-native";
import React from "react";
import X01CurrentScoreBoxes from "@/src/components/game/ingame/score/X01CurrentScoreBoxes";
import {DartProcessedResult} from "@/src/types/api";


interface X01ScoreViewProps {
    dartProcessedResult: Partial<DartProcessedResult>;
}

export default function X01ScoreView(props: X01ScoreViewProps) {
    const remainingScore = props.dartProcessedResult.remainingScore ?? 0;
    const currentTurnDarts = props.dartProcessedResult.currentTurnDarts ?? [];

    return (
        <View className="p-base mb-base">
            <View className="bg-emerald-500 rounded-xl p-xl items-center justify-center shadow-md mb-lg">
                <Text className="text-white text-3xl font-bold">{remainingScore}</Text>
                <Text className="text-white text-lg font-medium opacity-90 mt-xs">Remaining</Text>
            </View>
            <X01CurrentScoreBoxes dartThrows={currentTurnDarts}/>
        </View>
    );
};