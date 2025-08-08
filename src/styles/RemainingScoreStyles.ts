import {StyleSheet} from 'react-native';

export const remainingScoreStyles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        padding: 20,
        margin: 10,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#e9ecef',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 8,
    },
    header: {
        alignItems: 'center',
        marginBottom: 15,
    },
    playerLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#495057',
        marginBottom: 4,
    },
    statusText: {
        fontSize: 14,
        color: '#6c757d',
        fontStyle: 'italic',
    },
    scoreContainer: {
        alignItems: 'center',
        marginBottom: 15,
    },
    scoreLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: '#495057',
        marginBottom: 8,
    },
    scoreValue: {
        fontSize: 48,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 2,
    },
    gameInfo: {
        backgroundColor: '#f8f9fa',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    gameInfoText: {
        fontSize: 14,
        color: '#495057',
        fontWeight: '500',
    },
    winnerContainer: {
        backgroundColor: '#d4edda',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#28a745',
    },
    winnerText: {
        fontSize: 18,
        color: '#155724',
        fontWeight: 'bold',
    },
});