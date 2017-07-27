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
    CONTROLLER_DEALS_CARD_TO_OPPONENT,
    CONTROLLER_CUT_CARD,
    CONTROLLER_SCORES_OPPONENT,
    CONTROLLER_SCORES_PLAYER,
    CONTROLLER_SCORES_CRIB,
    CONTROLLER_GAME_COMPLETE,
    OPPONENT_PLAYS,
    PLAYER_PLAYS,
    OPPONENT_GO
} from '../action-types';

export const defaultState = {
    deck: [],
    dealer: null,
    winner: null,
    cutCard: null,
    peggingCards: [],
    previousPlay: {},
    previousPlayer: '',
    opponentsHandScore: null,
    playersHandScore: null,
    cribScore: null
};

const game = ( state = defaultState, action ) => {
    let peggingCards, previousPlay;
    switch ( action.type ) {
        case OPPONENT_GO:
            if ( action.points === 1 && ! action.isFinalGo ) {
                peggingCards = state.peggingCards.map( () => { return null; } );
            } else if ( action.isFinalGo ) {
                peggingCards = [];
            } else {
                peggingCards = state.peggingCards;
            }
            return Object.assign( {}, state, { peggingCards, previousPlay: action.play } );
        case PLAYER_PLAYS:
        case OPPONENT_PLAYS:
            return Object.assign( {}, state, {
                previousPlay: action.play,
                peggingCards: [ action.card ].concat( state.peggingCards ),
                previousPlayer: action.person
            } );
        case CONTROLLER_GAME_COMPLETE:
            return Object.assign( {}, state, { winner: action.winner } );
        case CONTROLLER_SCORES_CRIB:
            return Object.assign( {}, state, { cribScore: action.score } );
        case CONTROLLER_SCORES_PLAYER:
            return Object.assign( {}, state, { playersHandScore: action.score } );
        case CONTROLLER_SCORES_OPPONENT:
            return Object.assign( {}, state, { opponentsHandScore: action.score } );
        case CONTROLLER_CUT_CARD:
            return Object.assign( {}, state, { cutCard: action.card } );
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
            return Object.assign( {}, defaultState, { deck: action.deck, dealer: action.dealer } );
        case CONTROLLER_BUILDS_DECK:
            return Object.assign( {}, state, { deck: action.deck } );
        default:
            return state
    }
};

export default game;