import { expect } from 'chai';

import { defaultState as state } from './fixtures';
import { getPegPositions } from '../board';

describe( 'Board Selector', () => {
    describe( 'getPegPositions()', () => {
        it( 'should return the positions', () => {
            const positions = getPegPositions( state );
            expect( positions.opponent ).to.deep.equal( [ -1, 0 ] );
            expect( positions.player ).to.deep.equal( [ -1, 0 ] );
        } );
    } );
} );

