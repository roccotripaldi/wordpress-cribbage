/**
 * Internal Dependencies
 */
import { PLAYER_INITIAL_DRAW, OPPONENT_INITIAL_DRAW } from '../action-types';

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
