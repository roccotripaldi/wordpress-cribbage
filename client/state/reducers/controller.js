/**
 * Internal Dependencies
 */
import { CONTROLLER_BUILDS_DECK, CONTROLLER_RESET_GAME } from '../action-types';

export const defaultState = {
    nextAppointment: 'buildDeck',
};

const controller = ( state = defaultState, action ) => {
    switch (action.type) {
        case CONTROLLER_RESET_GAME:
            return defaultState;
        case CONTROLLER_BUILDS_DECK:
            return Object.assign( {}, state, { nextAppointment: 'awaitDraw' } );
        default:
            return state
    }
};

export default controller;