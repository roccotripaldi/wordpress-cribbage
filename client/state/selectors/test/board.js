import { expect } from 'chai';

import { defaultState as state } from './fixtures';
import { getPegPositions, getLowestPegForPerson } from '../board';

describe( 'Board Selector', () => {
    describe( 'getPegPositions()', () => {
        it( 'should return the positions', () => {
            const positions = getPegPositions( state );
            expect( positions.Opponent ).to.deep.equal( [ -1, 0 ] );
            expect( positions.Player ).to.deep.equal( [ -1, 0 ] );
        } );
    } );
    describe( 'getLowestPegForPerson', () => {
        it( 'should return the index of lowest peg for given person', () => {
            const state = { board: { Player: [ 15, 100 ], Opponent: [ 100, 15 ] } },
                lowestPeg = getLowestPegForPerson( state, 'Player' );
            expect( lowestPeg ).to.equal( 0 );
        } );
        it( 'should return the index of lowest peg for given person', () => {
            const state = { board: { Player: [ 15, 100 ], Opponent: [ 100, 15 ] } },
                lowestPeg = getLowestPegForPerson( state, 'Opponent' );
            expect( lowestPeg ).to.equal( 1 );
        } );
    } );
} );

