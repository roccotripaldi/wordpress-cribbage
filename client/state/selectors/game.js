/**
 * External Dependencies
 */
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

export const getDeck = ( state ) => {
    return get( state, 'game.deck' );
};

export const isInitialized = ( state ) => {
    return ! isEmpty( get( state, 'game.deck' ) );
}