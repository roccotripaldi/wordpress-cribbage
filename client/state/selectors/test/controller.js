import { expect } from 'chai';

import { defaultState as state } from './fixtures';
import { getNextAppointment, isPaused } from '../controller';

describe( 'Controller Selector', () => {
    describe( 'getNextAppointment()', () => {
        it( 'should return the next appointment', () => {
            const nextAppointment = getNextAppointment( state );
            expect( nextAppointment ).to.equal( 'buildDeck' );
        } );
    } );
    describe( 'isPaused()', () => {
        it( 'should not be paused by default', () => {
            const paused = isPaused( state );
            expect( paused ).to.be.false;
        } );
        it( 'should be paused if controller is set to pause', () => {
            const paused = isPaused( { controller: { isPaused: true } } );
            expect( paused ).to.be.true;
        } );
    } );
} );

