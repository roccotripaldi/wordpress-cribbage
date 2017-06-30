import { expect } from 'chai';
import { createStore } from 'redux';

import cribbageState from '../../reducers/index';
import { getPegPositions } from '../board';

const state = createStore( cribbageState );

describe( 'Board Selector', () => {
    describe( 'getPegPositions()', () => {
        it( 'should return the positions', () => {
            const positions = getPegPositions( state.getState() );
            expect( positions.opponent ).to.deep.equal( [ -1, 0 ] );
            expect( positions.player ).to.deep.equal( [ -1, 0 ] );
        } );
    } );
} );

