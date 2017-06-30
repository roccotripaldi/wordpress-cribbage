/**
 * External Dependencies
 */
import get from 'lodash/get';

export const getDeck = ( state ) => {
    return get( state, 'game.deck' );
};