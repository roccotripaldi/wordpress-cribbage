/**
 * External Dependencies
 */
import get from 'lodash/get';

export const getNextAppointment = ( state ) => {
    return get( state, 'controller.nextAppointment' );
};

export const isPaused = ( state ) => {
    return get( state, 'controller.isPaused' );
};

export const getTimerSpeed = ( state ) => {
    return get( state, 'controller.timerSpeed' );
};