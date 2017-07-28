/**
 * Internal Dependencies
 */
import {
    CONTROLLER_RESET_GAME,
    CONTROLLER_HIS_HEALS,
    PLAYER_ACCEPTS_CRIB_SCORE,
    PLAYER_ACCEPTS_OPPONENTS_SCORE,
    PLAYER_ACCEPTS_OWN_SCORE,
    OPPONENT_PLAYS,
    PLAYER_PLAYS,
    OPPONENT_GO,
    PLAYER_GO,
    CONTROLLER_COMPLETE_PLAY
} from '../action-types';

export const defaultState = {
    Opponent: [ -1, 0 ],
    Player: [ -1, 0 ]
};

const board = (state = defaultState, action) => {
    let newArray, score;
    switch (action.type) {
        case CONTROLLER_COMPLETE_PLAY:
        case PLAYER_GO:
        case OPPONENT_GO:
        case PLAYER_PLAYS:
        case OPPONENT_PLAYS:
        case PLAYER_ACCEPTS_CRIB_SCORE:
        case PLAYER_ACCEPTS_OWN_SCORE:
        case PLAYER_ACCEPTS_OPPONENTS_SCORE:
        case CONTROLLER_HIS_HEALS:
            if ( action.points === 0 ) {
                return state;
            }
            score = ( action.pegIndex === 0 ) ? state[ action.person ][1] : state[ action.person ][0];
            newArray = state[ action.person ].map( ( position, index ) => {
                if ( index === action.pegIndex ) {
                    return score + action.points;
                }
                return position;
            } );
            return Object.assign( {}, state, { [ action.person ]: newArray } );
        case CONTROLLER_RESET_GAME:
            return defaultState;
        default:
            return state
    }
};

export default board;