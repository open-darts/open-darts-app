import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

interface StartGameButtonProps {
    onPress: () => void;
    loading: boolean;
    error: string | null;
}

export function StartGameButton({onPress, loading, error}: StartGameButtonProps) {
    return (
        <>
            <TouchableOpacity
                className="bg-emerald-500 rounded-xl items-center justify-center shadow-md"
                style={loading ? {opacity: 0.7} : {}}
                onPress={onPress}
                disabled={loading}
            >
                <Text className="text-white text-lg font-semibold">
                    {loading ? 'Creating Game...' : 'Start Game'}
                </Text>
            </TouchableOpacity>

            {error && (
                <Text className="text-red-500 mt-2.5 text-center">
                    {error}
                </Text>
            )}
        </>
    );
}