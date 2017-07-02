/**
 * External Dependencies
 */
import get from 'lodash/get';

export const getPegPositions = ( state ) => {
    return get( state, 'board' );
};

export const getLowestPegForPerson = ( state, person ) => {
    const pegsForPerson = get( state, 'board.' + person );
    return ( pegsForPerson[0] > pegsForPerson[1] ) ? 1 : 0;
};
