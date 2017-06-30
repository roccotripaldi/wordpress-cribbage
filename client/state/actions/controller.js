/**
 * Internal Dependencies
 */
import { CONTROLLER_BUILDS_DECK, CONTROLLER_RESET_GAME, CONTROLLER_TOGGLE_TIMER } from '../action-types';

export const controllerBuildsDeck = deck => {
    return {
        type: CONTROLLER_BUILDS_DECK,
        deck
    }
};

export const resetGame = () => {
    return {
        type: CONTROLLER_RESET_GAME
    }
};

export const toggleTimer = () => {
    return {
        type: CONTROLLER_TOGGLE_TIMER
    }
};