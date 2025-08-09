import {View} from "react-native";
import ScoreBox from "@/src/components/game/ingame/score/ScoreBox";

export default function X01CurrentScoreBoxes() {
    return (

        <View>
            <ScoreBox text={"60 T20"}/>
            <ScoreBox text={"50 DB"}/>
        </View>


    );
};