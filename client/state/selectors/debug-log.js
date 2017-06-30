/**
 * External Dependencies
 */
import get from 'lodash/get';

export const getLog = ( state ) => {
    return get( state, 'debugLog.items' );
};