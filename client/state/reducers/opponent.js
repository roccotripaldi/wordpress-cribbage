/**
 * Internal Dependencies
 */
import {
    CONTROLLER_RESET_GAME,
    OPPONENT_INITIAL_DRAW,
    CONNTROLLER_RESET_DECK,
    CONTROLLER_DEALS_CARD_TO_OPPONENT,
    PLAYER_DISCARDS,
    OPPONENT_DISCARDS,
    PLAYER_ACCEPTS_OPPONENTS_SCORE,
    CONTROLLER_HIS_HEALS,
    PLAYER_ACCEPTS_CRIB_SCORE
} from '../action-types';

export const defaultState = {
    hand: [],
    crib: [],
    score: 0,
    initialDraw: []
};

const opponent = ( state = defaultState, action ) => {
    let hand, newState, newCrib;
    switch ( action.type ) {
        case CONTROLLER_HIS_HEALS:
        case PLAYER_ACCEPTS_CRIB_SCORE:
            if ( action.person === 'Opponent' ) {
                return Object.assign( {}, state, { score: state.score + action.points } );
            }
            return state;
        case PLAYER_ACCEPTS_OPPONENTS_SCORE:
            return Object.assign( {}, state, { score: state.score + action.points } );
        case OPPONENT_DISCARDS:
            hand = state.hand.slice();
            newState = {
                hand: hand.filter( ( card, index ) => {
                    return ! action.cardIndexes.includes( index );
                } )
            };
            if ( 'Opponent' === action.dealer ) {
                newCrib = state.crib.slice();
                newCrib.splice( 0, 0, action.cards[0], action.cards[1] );
                newState.crib = newCrib;
            }
            return Object.assign( {}, state, newState );
        case PLAYER_DISCARDS:
            if ( 'Opponent' === action.dealer ) {
                return Object.assign( {}, state, { crib: action.cards } );
            }
            return state;
        case CONTROLLER_DEALS_CARD_TO_OPPONENT:
            let newHand = state.hand.slice();
            newHand.splice( 0, 0, action.card );
            return Object.assign( {}, state, { hand: newHand } );
        case CONNTROLLER_RESET_DECK:
            return Object.assign( {}, state, { initialDraw: [], hand: [], crib: [] } );
        case OPPONENT_INITIAL_DRAW:
            return Object.assign( {}, state, { initialDraw: [ action.card ] } );
        case CONTROLLER_RESET_GAME:
            return defaultState;
        default:
            return state
    }
};

export default opponent;