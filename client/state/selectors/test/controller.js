import { expect } from 'chai';

import { defaultState as state } from './fixtures';
import { getNextAppointment } from '../controller';

describe( 'Controller Selector', () => {
    describe( 'getNextAppointment()', () => {
        it( 'should return the next appointment', () => {
            const nextAppointment = getNextAppointment( state );
            expect( nextAppointment ).to.equal( 'buildDeck' );
        } );
    } );
} );

