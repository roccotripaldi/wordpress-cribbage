/**
 * Internal Dependencies
 */
import {
    CONTROLLER_BUILDS_DECK,
    CONTROLLER_RESET_GAME,
    CONTROLLER_TOGGLE_TIMER ,
    CONTROLLER_ASSIGNS_FIRST_DEALER
} from '../action-types';

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

export const assignFistDealer = ( playerDraw, opponentDraw ) => {
    let dealer;
    if ( playerDraw.sequence > opponentDraw.sequence ) {
        dealer = 'Opponent';
    } else if ( playerDraw.sequence < opponentDraw.sequence ) {
        dealer = 'Player'
    } else {
        dealer = ( playerDraw.suitValue > opponentDraw.suitValue ) ? 'Opponent' : 'Player';
    }
    return {
        type: CONTROLLER_ASSIGNS_FIRST_DEALER,
        dealer
    }
};