import React from 'react';
import {Text, View} from 'react-native';
import {DartTrackedTo} from '../../types/api';
import {dartHistoryStyles} from '../../styles/DartHistoryStyles';

interface DartHistoryProps {
    dartHistory: DartTrackedTo[];
    maxDarts?: number;
}

export const DartHistory: React.FC<DartHistoryProps> = ({ 
    dartHistory, 
    maxDarts = 3 
}) => {
    const calculateDartNumber = (index: number) => {
        if (dartHistory.length <= maxDarts && index === 0) {
            return 1;
        }

        return dartHistory.length - index;
    };

    const displayDarts = dartHistory.slice(0, maxDarts);

    return (
        <View style={dartHistoryStyles.container}>
            <Text style={dartHistoryStyles.title}>Dart History</Text>
            {displayDarts.length > 0 ? (
                <View style={dartHistoryStyles.dartsList}>
                    {displayDarts.map((dartData, index) => {
                        const dartNumber = calculateDartNumber(index);
                        const result = dartData.trackedDart.score * dartData.trackedDart.multiplier;

                        return (
                            <View key={index} style={dartHistoryStyles.dartItem}>
                                <Text style={dartHistoryStyles.dartNumber}>
                                    {dartNumber}
                                </Text>
                                <View style={dartHistoryStyles.dartCalculation}>
                                    <Text style={dartHistoryStyles.multiplier}>
                                        {dartData.trackedDart.multiplier}
                                    </Text>
                                    <Text style={dartHistoryStyles.equals}>×</Text>
                                    <Text style={dartHistoryStyles.value}>
                                        {dartData.trackedDart.score}
                                    </Text>
                                    <Text style={dartHistoryStyles.equals}>=</Text>
                                    <Text style={dartHistoryStyles.result}>
                                        {result}
                                    </Text>
                                </View>
                            </View>
                        );
                    })}
                </View>
            ) : (
                <View style={dartHistoryStyles.emptyState}>
                    <Text style={dartHistoryStyles.noDartsText}>🎯 No darts thrown yet</Text>
                </View>
            )}
        </View>
    );
};
