/**
 * Internal Dependencies
 */
import {
    CONTROLLER_BUILDS_DECK,
    CONTROLLER_RESET_GAME,
    CONTROLLER_TOGGLE_TIMER
} from '../action-types';

export const defaultState = {
    nextAppointment: 'buildDeck',
    isPaused: false
};

const controller = ( state = defaultState, action ) => {
    switch (action.type) {
        case CONTROLLER_TOGGLE_TIMER:
            return Object.assign( {}, state, { isPaused: ! state.isPaused } );
        case CONTROLLER_RESET_GAME:
            return defaultState;
        case CONTROLLER_BUILDS_DECK:
            return Object.assign( {}, state, { nextAppointment: 'awaitDraw' } );
        default:
            return state
    }
};

export default controller;