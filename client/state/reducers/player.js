/**
 * Internal Dependencies
 */
import { CONTROLLER_RESET_GAME, PLAYER_INITIAL_DRAW } from '../action-types';

export const defaultState = {
    hand: [],
    crib: [],
    score: 0,
    initialDraw: []
};

const player = ( state = defaultState, action ) => {
    switch ( action.type ) {
        case PLAYER_INITIAL_DRAW:
            return Object.assign( {}, state, { initialDraw: [ action.card ] } );
        case CONTROLLER_RESET_GAME:
            return defaultState;
        default:
            return state
    }
};

export default player;