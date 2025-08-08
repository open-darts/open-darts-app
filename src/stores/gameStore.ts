import {create} from 'zustand';
import {isWeb} from "@/src/utils/platform";

interface GameState {
    isAutoScoreEnabled: boolean;
    toggleAutoScore: () => void;
}

export const useGameStore = create<GameState>((set) => ({
    isAutoScoreEnabled: isWeb(),
    toggleAutoScore: () => set((state) => ({
        isAutoScoreEnabled: !state.isAutoScoreEnabled
    })),
}));
