import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {styled} from 'nativewind';

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);

interface StartGameButtonProps {
    onPress: () => void;
    loading: boolean;
    error: string | null;
}

export function StartGameButton({onPress, loading, error}: StartGameButtonProps) {
    return (
        <>
            <StyledTouchableOpacity
                className="bg-emerald-500 rounded-xl items-center justify-center shadow-md"
                style={loading ? {opacity: 0.7} : {}}
                onPress={onPress}
                disabled={loading}
            >
                <StyledText className="text-white text-lg font-semibold">
                    {loading ? 'Creating Game...' : 'Start Game'}
                </StyledText>
            </StyledTouchableOpacity>

            {error && (
                <StyledText className="text-red-500 mt-2.5 text-center">
                    {error}
                </StyledText>
            )}
        </>
    );
}