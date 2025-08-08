import {StyleSheet} from 'react-native';

export const dartHistoryStyles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        padding: 16,
        margin: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e1e5e9',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2c3e50',
        marginBottom: 12,
        textAlign: 'center',
    },
    dartsList: {
        gap: 10,
    },
    dartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: 14,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    dartNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007bff',
        minWidth: 30,
        textAlign: 'center',
    },
    dartCalculation: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    multiplier: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#28a745',
    },
    value: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#28a745',
    },
    result: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#28a745',
    },
    equals: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#6c757d',
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    noDartsText: {
        fontSize: 18,
        color: '#6c757d',
        textAlign: 'center',
        marginBottom: 8,
    },
    instructionText: {
        fontSize: 14,
        color: '#adb5bd',
        textAlign: 'center',
        fontStyle: 'italic',
    },
});