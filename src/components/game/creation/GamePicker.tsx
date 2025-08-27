import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styled} from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface GamePickerProps {
    onGameConfigChange?: (config: GameConfig) => void;
}

export interface GameConfig {
    gameMode: 'X01';
    score: 301 | 501;
    players: string[];
}

export default function GamePicker({onGameConfigChange}: GamePickerProps) {
    const [selectedScore, setSelectedScore] = useState<301 | 501>(301);
    const [selectedMode] = useState<'X01'>('X01');
    const [selectedPlayers] = useState<string[]>(["test"]);

    const handleScoreChange = (score: 301 | 501) => {
        setSelectedScore(score);
        const config: GameConfig = {
            gameMode: selectedMode,
            score,
            players: selectedPlayers,
        };
        onGameConfigChange?.(config);
    };

    return (
        <StyledView className="bg-white rounded-xl shadow-md p-lg mb-base">
            <StyledText className="text-slate-800 text-2xl font-bold mb-sm">New Game</StyledText>
            <StyledText className="text-slate-600 text-base mb-lg">Configure your dart game settings</StyledText>

            <StyledView className="mb-lg">
                <StyledText className="text-lg font-semibold text-slate-800 mb-sm">Game Mode</StyledText>
                <StyledTouchableOpacity
                    className="border-2 border-slate-300 rounded-lg py-md px-lg items-center justify-center bg-white"
                    disabled>
                    <StyledText className="text-base font-medium text-slate-700">X01</StyledText>
                </StyledTouchableOpacity>
            </StyledView>

            <StyledView className="mb-lg">
                <StyledText className="text-lg font-semibold text-slate-800 mb-sm">Starting Score</StyledText>
                <StyledView className="flex-row gap-sm">
                    <StyledTouchableOpacity
                        className={`border-2 rounded-lg py-md px-lg items-center justify-center bg-white flex-1 ${selectedScore === 301 ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300'}`}
                        onPress={() => handleScoreChange(301)}
                    >
                        <StyledText
                            className={`text-base ${selectedScore === 301 ? 'text-emerald-600 font-semibold' : 'text-slate-700 font-medium'}`}>
                            301
                        </StyledText>
                    </StyledTouchableOpacity>

                    <StyledTouchableOpacity
                        className={`border-2 rounded-lg py-md px-lg items-center justify-center bg-white flex-1 ${selectedScore === 501 ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300'}`}
                        onPress={() => handleScoreChange(501)}
                    >
                        <StyledText
                            className={`text-base ${selectedScore === 501 ? 'text-emerald-600 font-semibold' : 'text-slate-700 font-medium'}`}>
                            501
                        </StyledText>
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledView>

            <StyledView className="mb-lg">
                <StyledText className="text-lg font-semibold text-slate-800 mb-sm">Players</StyledText>
                <StyledTouchableOpacity
                    className="border-2 border-slate-300 rounded-lg py-md px-lg items-center justify-center bg-white"
                    disabled>
                    <StyledText className="text-base font-medium text-slate-700">Single Player</StyledText>
                </StyledTouchableOpacity>
            </StyledView>

            <StyledView className="bg-slate-50 rounded-md p-base mt-sm">
                <StyledText className="text-sm font-semibold text-slate-600 mb-xs">Game Summary</StyledText>
                <StyledText className="text-base text-slate-800 font-medium">
                    {selectedMode.toUpperCase()} • {selectedScore} points • Single Player
                </StyledText>
            </StyledView>
        </StyledView>
    );
}
