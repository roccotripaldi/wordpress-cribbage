/**
 * Internal Dependencies
 */
import { CONTROLLER_BUILDS_DECK } from '../action-types';

export const defaultState = {
    deck: [],
    dealer: null,
    winner: null,
    cutCard: null,
    peggingCards: [],
    opponentsHandScore: null,
    playersHandScore: null,
    cribScore: null
};

const game = ( state = defaultState, action ) => {
    switch ( action.type ) {
        case CONTROLLER_BUILDS_DECK:
            return Object.assign( {}, state, { deck: action.deck } );
        default:
            return state
    }
};

export default game;