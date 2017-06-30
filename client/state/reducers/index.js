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


const cribbageState = combineReducers( {
    board,
    controller,
    game,
    players
} );

export default cribbageState;