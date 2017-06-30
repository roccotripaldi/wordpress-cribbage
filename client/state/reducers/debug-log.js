/**
 * Internal Dependencies
 */
import { CONTROLLER_BUILDS_DECK } from '../action-types';

export const defaultState = {
    items: [],
};

const debugLog = ( state = defaultState, action ) => {
    switch ( action.type ) {
        case CONTROLLER_BUILDS_DECK:
            state.items.push( 'Deck built and shuffled!' );
            return state;
        default:
            return state
    }
};

export default debugLog;