/**
 * Internal Dependencies
 */
import {
    CONTROLLER_BUILDS_DECK,
    CONTROLLER_RESET_GAME,
    PLAYER_INITIAL_DRAW
} from '../action-types';

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
        case PLAYER_INITIAL_DRAW:
            return Object.assign( {}, state, { deck: state.deck.slice( 1 ) } );
        case CONTROLLER_RESET_GAME:
            return defaultState;
        case CONTROLLER_BUILDS_DECK:
            return Object.assign( {}, state, { deck: action.deck } );
        default:
            return state
    }
};

export default game;