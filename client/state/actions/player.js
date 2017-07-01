/**
 * Internal Dependencies
 */
import { PLAYER_INITIAL_DRAW, OPPONENT_INITIAL_DRAW, PLAYER_DISCARDS } from '../action-types';

export const playerDraws = ( card ) => {
    return {
        type: PLAYER_INITIAL_DRAW,
        card
    }
};

export const opponentDraws = ( card ) => {
    return {
        type: OPPONENT_INITIAL_DRAW,
        card
    }
};

export const playerDiscards = ( cards, cardIndexes, dealer ) => {
    return {
        type: PLAYER_DISCARDS,
        cards,
        dealer,
        cardIndexes
    }
};
