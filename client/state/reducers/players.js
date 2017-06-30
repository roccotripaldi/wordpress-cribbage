/**
 * Internal Dependencies
 */
import { CONTROLLER_RESET_GAME } from '../action-types';

export const defaultState = {
    player: {
        hand: [],
        crib: [],
        score: 0,
        initialDraw: []
    },
    opponent: {
        hand: [],
        crib: [],
        score: 0,
        initialDraw: []
    },
};

const players = ( state = defaultState, action ) => {
    switch ( action.type ) {
        case CONTROLLER_RESET_GAME:
            return defaultState;
        default:
            return state
    }
};

export default players;