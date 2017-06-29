/**
 * External Dependencies
 */
import { combineReducers } from 'redux';
/**
 * Internal Dependencies
 */
import board from './board';
import controller from './controller';
import game from './game';
import players from './players';
import debugLog from './debug-log';


const cribbageState = combineReducers( {
    board,
    controller,
    debugLog,
    game,
    players
} );

export default cribbageState;