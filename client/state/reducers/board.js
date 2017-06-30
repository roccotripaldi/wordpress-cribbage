/**
 * Internal Dependencies
 */
import { CONTROLLER_RESET_GAME } from '../action-types';

export const defaultState = {
    opponent: [ -1, 0],
    player: [ -1, 0 ]
};

const board = (state = defaultState, action) => {
    switch (action.type) {
        case CONTROLLER_RESET_GAME:
            return defaultState;
        default:
            return state
    }
};

export default board;