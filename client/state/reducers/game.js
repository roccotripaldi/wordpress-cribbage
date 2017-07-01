/**
 * Internal Dependencies
 */
import {
    CONTROLLER_BUILDS_DECK,
    CONTROLLER_RESET_GAME,
    PLAYER_INITIAL_DRAW,
    OPPONENT_INITIAL_DRAW,
    CONTROLLER_ASSIGNS_FIRST_DEALER,
    CONNTROLLER_RESET_DECK,
    CONTROLLER_DEALS_CARD_TO_PLAYER,
    CONTROLLER_DEALS_CARD_TO_OPPONENT
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
        case CONTROLLER_ASSIGNS_FIRST_DEALER:
            return Object.assign( {}, state, { dealer: action.dealer } );
        case CONTROLLER_DEALS_CARD_TO_PLAYER:
        case CONTROLLER_DEALS_CARD_TO_OPPONENT:
        case OPPONENT_INITIAL_DRAW:
        case PLAYER_INITIAL_DRAW:
            return Object.assign( {}, state, { deck: state.deck.slice( 1 ) } );
        case CONTROLLER_RESET_GAME:
            return defaultState;
        case CONNTROLLER_RESET_DECK:
        case CONTROLLER_BUILDS_DECK:
            return Object.assign( {}, state, { deck: action.deck } );
        default:
            return state
    }
};

export default game;