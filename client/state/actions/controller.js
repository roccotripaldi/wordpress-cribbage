/**
 * External Dependencies
 */
import shuffle from 'lodash/shuffle';
/**
 * Internal Dependencies
 */
import {
    CONTROLLER_BUILDS_DECK,
    CONTROLLER_RESET_GAME,
    CONTROLLER_TOGGLE_TIMER ,
    CONTROLLER_ASSIGNS_FIRST_DEALER,
    CONNTROLLER_RESET_DECK
} from '../action-types';
import { buildDeck } from '../../lib/deck';

export const controllerBuildsDeck = () => {
    return {
        type: CONTROLLER_BUILDS_DECK,
        deck: shuffle( buildDeck() )
    }
};

export const resetDeck = ( dealer ) => {
    return {
        type: CONNTROLLER_RESET_DECK,
        deck: shuffle( buildDeck() ),
        dealer
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