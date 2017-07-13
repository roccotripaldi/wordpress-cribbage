import { expect } from 'chai';

import { defaultState as state } from './fixtures';
import {
    getPlayer,
    getOpponent,
    getPlayerInitialDraw,
    getOpponentInitialDraw,
    calculateWinner
} from '../players';
import { buildCard } from '../../../lib/deck';

describe( 'Players Selector', () => {
    describe( 'getPlayer()', () => {
        it( 'should return the player', () => {
            const player = getPlayer( state );
            expect( player ).to.be.an( 'Object' );
            expect( player ).to.have.property( 'hand' );
            expect( player ).to.have.property( 'crib' );
            expect( player ).to.have.property( 'score' );
            expect( player ).to.have.property( 'initialDraw' );
        } );
    } );
    describe( 'getOpponent()', () => {
        it( 'should return the opponent', () => {
            const opponent = getOpponent( state );
            expect( opponent ).to.be.an( 'Object' );
            expect( opponent ).to.have.property( 'hand' );
            expect( opponent ).to.have.property( 'crib' );
            expect( opponent ).to.have.property( 'score' );
            expect( opponent ).to.have.property( 'initialDraw' );
        } );
    } );
    describe( 'getPlayerInitialDraw()', () => {
        it( 'should return the players initial draw', () => {
            const card = buildCard( 'Ace', 'Spades' ),
                state = { player: { initialDraw: [ card ] } },
                initialDraw = getPlayerInitialDraw( state );
            expect( initialDraw ).to.deep.equal( card );
        } );
    } );
    describe( 'getOpponentInitialDraw()', () => {
        it( 'should return the players initial draw', () => {
            const card = buildCard( 'Ace', 'Spades' ),
                state = { opponent: { initialDraw: [ card ] } },
                initialDraw = getOpponentInitialDraw( state );
            expect( initialDraw ).to.deep.equal( card );
        } );
    } );

    describe( 'getWinningPerson()', () => {
        it( 'should return null if there is no winner', () => {
            const state = {
                opponent: { score: 14 },
                player: { score: 38 }
            };
            expect( calculateWinner( state ) ).to.be.null;
        } );
        it( 'should return "Player" if player is winner', () => {
            const state = {
                opponent: { score: 107 },
                player: { score: 119 }
            };
            expect( calculateWinner( state ) ).to.equal( 'Player' );
        } );
        it( 'should return "Opponent" if opponent is winner', () => {
            const state = {
                opponent: { score: 123 },
                player: { score: 114 }
            };
            expect( calculateWinner( state ) ).to.equal( 'Opponent' );
        } );
    } );
} );

