/**
 * Internal Dependencies
 */
import {
    CONTROLLER_BUILDS_DECK,
    CONTROLLER_RESET_GAME,
    CONTROLLER_TOGGLE_TIMER,
    PLAYER_INITIAL_DRAW,
    OPPONENT_INITIAL_DRAW,
    CONTROLLER_ASSIGNS_FIRST_DEALER,
    CONNTROLLER_RESET_DECK,
    CONTROLLER_DEALS_CARD_TO_PLAYER,
    CONTROLLER_DEALS_CARD_TO_OPPONENT,
    CONTROLLER_DEAL_COMPLETE,
    PLAYER_DISCARDS,
    OPPONENT_DISCARDS
} from '../action-types';

export const defaultState = {
    nextAppointment: 'buildDeck',
    isPaused: false,
    timerSpeed: 2000
};

const controller = ( state = defaultState, action ) => {
    let nextAppointment;
    switch (action.type) {
        case OPPONENT_DISCARDS:
            nextAppointment = ( 'Opponent' === action.dealer ) ? 'playerCuts' : 'opponentCuts';
            return Object.assign( {}, state, { nextAppointment } );
        case PLAYER_DISCARDS:
            return Object.assign( {}, state, { nextAppointment: 'opponentDiscards' } );
        case CONTROLLER_DEAL_COMPLETE:
            return Object.assign( {}, state, { nextAppointment: 'playerDiscards', timerSpeed: defaultState.timerSpeed } );
        case CONTROLLER_DEALS_CARD_TO_PLAYER:
            return Object.assign( {}, state, { nextAppointment: 'dealCardToOpponent' } );
        case CONTROLLER_DEALS_CARD_TO_OPPONENT:
            return Object.assign( {}, state, { nextAppointment: 'dealCardToPlayer' } );
        case CONNTROLLER_RESET_DECK:
            nextAppointment = ( 'Opponent' === action.dealer ) ? 'dealCardToPlayer' : 'dealCardToOpponent';
            return Object.assign( {}, state, { nextAppointment, timerSpeed: 500 } );
        case CONTROLLER_ASSIGNS_FIRST_DEALER:
            return Object.assign( {}, state, { nextAppointment: 'resetDeck' } );
        case OPPONENT_INITIAL_DRAW:
            return Object.assign( {}, state, { nextAppointment: 'assignFirstDealer' } );
        case PLAYER_INITIAL_DRAW:
            return Object.assign( {}, state, { nextAppointment: 'opponentDraw' } );
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