import { expect } from 'chai';
import { createStore } from 'redux';

import cribbageState from '../../reducers/index';
import { getNextAppointment } from '../controller';

const state = createStore( cribbageState );

describe( 'Controller Selector', () => {
    describe( 'getNextAppointment()', () => {
        it( 'should return the next appointment', () => {
            const nextAppointment = getNextAppointment( state.getState() );
            expect( nextAppointment ).to.equal( 'buildDeck' );
        } );
    } );
} );

