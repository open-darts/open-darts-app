import {Text, View} from "react-native";
import React from "react";
import X01CurrentScoreBoxes from "@/src/components/game/ingame/score/X01CurrentScoreBoxes";
import {DartProcessedResult} from "@/src/types/api";
import {styled} from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

interface X01ScoreViewProps {
    dartProcessedResult: Partial<DartProcessedResult>;
}

export default function X01ScoreView(props: X01ScoreViewProps) {
    const remainingScore = props.dartProcessedResult.remainingScore ?? 0;
    const currentTurnDarts = props.dartProcessedResult.currentTurnDarts ?? [];

    return (
        <StyledView className="p-base mb-base">
            <StyledView className="bg-emerald-500 rounded-xl p-xl items-center justify-center shadow-md mb-lg">
                <StyledText className="text-white text-3xl font-bold">{remainingScore}</StyledText>
                <StyledText className="text-white text-lg font-medium opacity-90 mt-xs">Remaining</StyledText>
            </StyledView>
            <X01CurrentScoreBoxes dartThrows={currentTurnDarts}/>
        </StyledView>
    );
};