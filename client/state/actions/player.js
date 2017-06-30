/**
 * Internal Dependencies
 */
import { PLAYER_INITIAL_DRAW } from '../action-types';

export const playerDraws = ( card ) => {
    return {
        type: PLAYER_INITIAL_DRAW,
        card
    }
};