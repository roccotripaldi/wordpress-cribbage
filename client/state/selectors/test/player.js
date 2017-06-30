import { expect } from 'chai';
import { createStore } from 'redux';

import cribbageState from '../../reducers/index';
import { getPlayer, getOpponent } from '../players';

const state = createStore( cribbageState );

describe( 'Players Selector', () => {
    describe( 'getPlayer()', () => {
        it( 'should return the player', () => {
            const player = getPlayer( state.getState() );
            expect( player ).to.be.an( 'Object' );
            expect( player ).to.have.property( 'hand' );
            expect( player ).to.have.property( 'crib' );
            expect( player ).to.have.property( 'score' );
            expect( player ).to.have.property( 'initialDraw' );
        } );
    } );
    describe( 'getOpponent()', () => {
        it( 'should return the opponent', () => {
            const opponent = getOpponent( state.getState() );
            expect( opponent ).to.be.an( 'Object' );
            expect( opponent ).to.have.property( 'hand' );
            expect( opponent ).to.have.property( 'crib' );
            expect( opponent ).to.have.property( 'score' );
            expect( opponent ).to.have.property( 'initialDraw' );
        } );
    } );
} );

