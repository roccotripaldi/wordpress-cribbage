/**
 * Internal Dependencies
 */
import { CONTROLLER_RESET_GAME } from '../action-types';

export const defaultState = {
    hand: [],
    crib: [],
    score: 0,
    initialDraw: []
};

const opponent = ( state = defaultState, action ) => {
    switch ( action.type ) {
        case CONTROLLER_RESET_GAME:
            return defaultState;
        default:
            return state
    }
};

export default opponent;