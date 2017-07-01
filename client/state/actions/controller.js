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
    CONNTROLLER_RESET_DECK,
    CONTROLLER_DEALS_CARD_TO_PLAYER,
    CONTROLLER_DEALS_CARD_TO_OPPONENT,
    CONTROLLER_DEAL_COMPLETE
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

export const dealCardToPlayer = ( card ) => {
    return {
        type: CONTROLLER_DEALS_CARD_TO_PLAYER,
        card
    }
};

export const dealCardToOpponent = ( card ) => {
    return {
        type: CONTROLLER_DEALS_CARD_TO_OPPONENT,
        card
    }
};

export const dealComplete = ( card ) => {
    return {
        type: CONTROLLER_DEAL_COMPLETE
    }
};
