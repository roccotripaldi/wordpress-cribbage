/**
 * Internal Dependencies
 */
import { CONTROLLER_RESET_GAME, CONTROLLER_HIS_HEALS } from '../action-types';

export const defaultState = {
    Opponent: [ -1, 0 ],
    Player: [ -1, 0 ]
};

const board = (state = defaultState, action) => {
    let newArray, score;
    switch (action.type) {
        case CONTROLLER_HIS_HEALS:
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