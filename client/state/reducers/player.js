/**
 * Internal Dependencies
 */
import {
    CONTROLLER_RESET_GAME,
    PLAYER_INITIAL_DRAW,
    CONNTROLLER_RESET_DECK,
    CONTROLLER_DEALS_CARD_TO_PLAYER
} from '../action-types';

export const defaultState = {
    hand: [],
    crib: [],
    score: 0,
    initialDraw: []
};

const player = ( state = defaultState, action ) => {
    switch ( action.type ) {
        case CONTROLLER_DEALS_CARD_TO_PLAYER:
            let newHand = state.hand.slice();
            newHand.splice( 0, 0, action.card );
            return Object.assign( {}, state, { hand: newHand } );
        case CONNTROLLER_RESET_DECK:
            return Object.assign( {}, state, { initialDraw: [], hand: [], crib: [] } );
        case PLAYER_INITIAL_DRAW:
            return Object.assign( {}, state, { initialDraw: [ action.card ] } );
        case CONTROLLER_RESET_GAME:
            return defaultState;
        default:
            return state
    }
};

export default player;