import {useState} from 'react';
import {styled} from 'nativewind';
import {router} from "expo-router";
import {CreateGameRequest} from '@/src/types/api';
import {useMutation} from '@/src/hooks/useMutation';
import {gameService} from "@/src/services/game/gameService";
import GamePicker, {GameConfig} from "@/src/components/game/creation/GamePicker";
import {StartGameButton} from "@/src/components/game/creation/StartGameButton";

export default function Play() {

    const [gameConfig, setGameConfig] = useState<GameConfig>({
        gameMode: 'X01',
        score: 301,
        players: ["test"],
    });

    const openGameView = (gameId: String) => {
        // @ts-ignore
        router.push(`/game/${gameId}`);
    };


    const createGameMutation = useMutation(
        (gameData: CreateGameRequest) => gameService.createGame(gameData),
        {
            onSuccess: (game) => {
                openGameView(game.gameId);
            },
            onError: (error) => {
                console.error('Failed to create game:', error);
            }
        }
    );

    const handleStartGame = async () => {
        const gameData: CreateGameRequest = {
            gameMode: gameConfig.gameMode,
            score: gameConfig.score,
            players: gameConfig.players,
        };

        await createGameMutation.mutate(gameData);
    };

    return (
        < styled.SafeAreaView
            className="flex-1 bg-background">
            < styled.View
                className="p-base pb-3xl">
                < GamePicker
    onGameConfigChange = {setGameConfig}
                />

                < StartGameButton
    onPress = {handleStartGame}
    loading = {createGameMutation.loading}
    error={createGameMutation.error}> < /StartGameButton>
            < /styled.View>
        < /styled.SafeAreaView>
    );
}