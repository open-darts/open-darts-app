import {Text, View} from "react-native";
import ScoreBox from "@/src/components/game/ingame/score/ScoreBox";
import {DartThrow} from "@/src/types/api";
import {GameScoreStyles} from "@/src/styles/GameScoreStyles";

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
        <View style={GameScoreStyles.scoreBoxesWithSumContainer}>
            <View style={GameScoreStyles.scoreBoxesRow}>
                <View style={GameScoreStyles.sumContainer}>
                    <Text style={GameScoreStyles.sumText}>
                        {computedSum}
                    </Text>
                    <Text style={GameScoreStyles.sumLabel}>
                        SUM
                    </Text>
                </View>
                <View style={GameScoreStyles.scoreBoxesContainer}>
                    {scoreBoxes}
                </View>
            </View>
        </View>
    );
}