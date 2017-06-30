/**
 * External Dependencies
 */
import get from 'lodash/get';

export const getPegPositions = ( state ) => {
    return get( state, 'board' );
};