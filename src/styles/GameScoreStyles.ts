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
        marginBottom: Spacing.lg,
    },
    scoreBox: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
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
        minHeight: 80,
    },
    scoreBoxText: {
        fontSize: Typography.sizes.xl,
        fontWeight: Typography.weights.bold,
        color: Colors.slate[800],
    },
    scoreBoxEmpty: {
        backgroundColor: Colors.slate[100],
    },
    scoreBoxEmptyText: {
        color: Colors.slate[400],
        fontSize: Typography.sizes.sm,
    },
});