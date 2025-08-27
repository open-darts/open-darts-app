import {Text, View} from "react-native";
import ScoreBox from "@/src/components/game/ingame/score/ScoreBox";
import {DartThrow} from "@/src/types/api";
import {styled} from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

interface X01CurrentScoreBoxesProps {
    dartThrows?: DartThrow[]
}

export default function X01CurrentScoreBoxes(props: X01CurrentScoreBoxesProps) {
    const dartThrows = props.dartThrows || [];

    const scoreBoxes = Array(3).fill(null).map((_, index) => {
        const dartThrow = dartThrows[index];
        return <ScoreBox key={index} text={dartThrow ? dartThrow.scoreString : ""}/>;
    });

    const computedSum = dartThrows.reduce((sum, dartThrow) => {
        return sum + (dartThrow?.computedScore || 0);
    }, 0);

    const hasAnyThrows = dartThrows.length > 0;

    return (
        <StyledView className="mb-base">
            <StyledView className="flex-row items-center justify-between">
                <StyledView
                    className="bg-emerald-600 rounded-lg px-lg py-base shadow-sm min-h-[80px] justify-center items-center min-w-[80px]">
                    <StyledText className="text-white text-xl font-bold">
                        {computedSum}
                    </StyledText>
                    <StyledText className="text-white text-xs font-medium opacity-90 mt-0.5">
                        SUM
                    </StyledText>
                </StyledView>
                <StyledView className="flex-row justify-between flex-1 ml-lg">
                    {scoreBoxes}
                </StyledView>
            </StyledView>
        </StyledView>
    );
}