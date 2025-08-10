import {View} from "react-native";
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

    return (
        <View style={GameScoreStyles.scoreBoxesContainer}>
            {scoreBoxes}
        </View>
    );
}