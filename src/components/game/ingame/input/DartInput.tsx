import React from 'react';
import { View } from 'react-native';
import InputButton from '@/src/components/game/ingame/input/InputButton';

interface DartInputProps {
    onNumberPress: (value: number) => void;
    onDoublePress: () => void;
    onTriplePress: () => void;
    onBackPress: () => void;
    modifier?: 'single' | 'double' | 'triple';
}

export default function DartInput({
    onNumberPress,
    onDoublePress,
    onTriplePress,
    onBackPress,
    modifier = 'single'
}: DartInputProps) {
    const rows = [
        [1, 2, 3, 4, 5, 6, 7],
        [8, 9, 10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19, 20, 25],
        [0, "DOUBLE", "TRIPLE", "BACK"]
    ];

    return (
        <View className="p-base">
            <View className="gap-md">
                {rows.map((row, rowIndex) => (
                    <View key={rowIndex} className="flex-row gap-md">
                        {row.map((item, colIndex) => {
                            if (typeof item === 'number') {
                                return (
                                    <View key={colIndex} className="flex-1">
                                        <InputButton
                                            value={item}
                                            onPress={() => onNumberPress(item)}
                                            variant="number"
                                        />
                                    </View>
                                );
                            } else if (item === "DOUBLE") {
                                return (
                                    <View key={colIndex} className="flex-1">
                                        <InputButton
                                            value="2x"
                                            onPress={onDoublePress}
                                            variant="action"
                                            selected={modifier === 'double'}
                                        />
                                    </View>
                                );
                            } else if (item === "TRIPLE") {
                                return (
                                    <View key={colIndex} className="flex-1">
                                        <InputButton
                                            value="3x"
                                            onPress={onTriplePress}
                                            variant="action"
                                            selected={modifier === 'triple'}
                                        />
                                    </View>
                                );
                            } else if (item === "BACK") {
                                return (
                                    <View key={colIndex} className="flex-1">
                                        <InputButton
                                            value="←"
                                            onPress={onBackPress}
                                            variant="action"
                                        />
                                    </View>
                                );
                            }
                            return null;
                        })}
                    </View>
                ))}
            </View>
        </View>
    );
}