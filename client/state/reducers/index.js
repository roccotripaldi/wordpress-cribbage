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
import player from './player';
import opponent from './opponent';


const cribbageState = combineReducers( {
    board,
    controller,
    game,
    player,
    opponent
} );

export default cribbageState;