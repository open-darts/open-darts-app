import React from 'react';
import {Text, View} from 'react-native';
import {remainingScoreStyles} from '../../styles/RemainingScoreStyles';

interface RemainingScoreProps {
    score: number | null;
    playerId: string;
    isGameActive: boolean;
}

export const RemainingScore: React.FC<RemainingScoreProps> = ({ 
    score, 
    playerId, 
    isGameActive 
}) => {
    const getScoreColor = (score: number | null) => {
        if (score === null) return '#6c757d';
        if (score === 0) return '#28a745';
        if (score <= 50) return '#ffc107';
        if (score <= 170) return '#fd7e14';
        return '#007bff';
    };

    const getStatusMessage = (score: number | null, isActive: boolean) => {
        if (score === null) return 'Waiting for first dart...';
        if (score === 0) return '🎉 Game Finished!';
        if (!isActive) return 'Game paused';
        if (score <= 32) return 'Finish available!';
        if (score <= 100) return 'Getting close!';
        return 'Keep throwing!';
    };

    return (
        <View style={remainingScoreStyles.container}>
            <View style={remainingScoreStyles.header}>
                <Text style={remainingScoreStyles.playerLabel}>{playerId}</Text>
                <Text style={remainingScoreStyles.statusText}>
                    {getStatusMessage(score, isGameActive)}
                </Text>
            </View>

            <View style={remainingScoreStyles.scoreContainer}>
                <Text style={remainingScoreStyles.scoreLabel}>Remaining Score</Text>
                <Text style={[remainingScoreStyles.scoreValue, {color: getScoreColor(score)}]}>
                    {score !== null ? score : '--'}
                </Text>
            </View>

            {score !== null && score > 0 && (
                <View style={remainingScoreStyles.gameInfo}>
                    <Text style={remainingScoreStyles.gameInfoText}>
                        Game Status: {isGameActive ? '🟢 Active' : '🟡 Waiting'}
                    </Text>
                </View>
            )}

            {score === 0 && (
                <View style={remainingScoreStyles.winnerContainer}>
                    <Text style={remainingScoreStyles.winnerText}>🏆 Winner! 🏆</Text>
                </View>
            )}
        </View>
    );
};
