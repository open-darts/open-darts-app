import {Text, View} from "react-native";
import React from "react";


interface ScoreBoxProps {
    text: string | String
}


export default function ScoreBox({text}: ScoreBoxProps) {
    const isEmpty = !text || text === "";
    
    return (
        <View
            className={`flex-1 bg-white rounded-lg py-md px-sm items-center justify-center mx-xs shadow-sm min-h-[70px] ${isEmpty ? 'bg-slate-100' : ''}`}>
            <Text
                className={`text-base font-bold text-slate-800 text-center ${isEmpty ? 'text-slate-400 text-sm' : ''}`}>
                {isEmpty ? "-" : text}
            </Text>
        </View>
    );
};