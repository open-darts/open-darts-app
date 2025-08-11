import {StyleSheet} from 'react-native';
import {Colors} from './Colors';
import {BorderRadius, Spacing, Typography} from './Layout';

export const GameScoreStyles = StyleSheet.create({
    scoreContainer: {
        padding: Spacing.base,
        marginBottom: Spacing.base,
    },
    remainingScoreContainer: {
        backgroundColor: Colors.emerald[500],
        borderRadius: BorderRadius.xl,
        padding: Spacing.xl,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
        marginBottom: Spacing.lg,
    },
    remainingScoreText: {
        color: 'white',
        fontSize: Typography.sizes['3xl'],
        fontWeight: Typography.weights.bold,
    },
    remainingScoreLabel: {
        color: 'white',
        fontSize: Typography.sizes.lg,
        fontWeight: Typography.weights.medium,
        opacity: 0.9,
        marginTop: Spacing.xs,
    },
    scoreBoxesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        marginLeft: Spacing.lg
    },
    scoreBox: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: BorderRadius.lg,
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.sm,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Spacing.xs,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        minHeight: 70,
    },
    scoreBoxText: {
        fontSize: Typography.sizes.base,
        fontWeight: Typography.weights.bold,
        color: Colors.slate[800],
        textAlign: 'center',
        flexWrap: 'nowrap',
    },
    scoreBoxEmpty: {
        backgroundColor: Colors.slate[100],
    },
    scoreBoxEmptyText: {
        color: Colors.slate[400],
        fontSize: Typography.sizes.sm,
    },
    scoreBoxesWithSumContainer: {
        marginBottom: Spacing.lg,
    },
    scoreBoxesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sumContainer: {
        backgroundColor: Colors.emerald[600],
        borderRadius: BorderRadius.lg,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.base,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        minHeight: 80,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 80,
    },
    sumText: {
        color: 'white',
        fontSize: Typography.sizes.xl,
        fontWeight: Typography.weights.bold,
    },
    sumLabel: {
        color: 'white',
        fontSize: Typography.sizes.xs,
        fontWeight: Typography.weights.medium,
        opacity: 0.9,
        marginTop: 2,
    },
});