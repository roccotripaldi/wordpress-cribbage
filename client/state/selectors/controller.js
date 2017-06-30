/**
 * External Dependencies
 */
import get from 'lodash/get';

export const getNextAppointment = ( state ) => {
    return get( state, 'controller.nextAppointment' );
};