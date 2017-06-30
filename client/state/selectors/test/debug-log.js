import { expect } from 'chai';
import { createStore } from 'redux';

import cribbageState from '../../reducers/index';
import { getLog } from '../debug-log';

const state = createStore( cribbageState );

describe( 'Debug Log Selector', () => {
    describe( 'getLog()', () => {
        it( 'should return the log', () => {
            const log = getLog( state.getState() );
            expect( log ).to.be.an( 'Array' ).that.is.empty;
        } );
    } );
} );

