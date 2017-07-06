import { expect } from 'chai';

import { defaultState as state } from './fixtures';
import { getDeck, isInitialized, getDealer, getCutCard, getScore, getWinner } from '../game';
import { buildCard } from '../../../lib/deck';

describe( 'Game Selector', () => {
    describe( 'getDeck()', () => {
        it( 'should return the deck', () => {
            const deck = getDeck( state );
            expect( deck ).to.be.an( 'Array' ).that.is.empty;
        } );
    } );
    describe( 'isInitialized()', () => {
        it( 'should not be initialized by default', () => {
            const initialized = isInitialized( state );
            expect( initialized ).to.be.false;
        } );
        it( 'should be initialized if there is a deck', () => {
            const initialized = isInitialized( { game: { deck: [1,2,3] } } );
            expect( initialized ).to.be.true;
        } );
    } );
    describe( 'getDealer()', () => {
        it( 'should return dealer', () => {
            const dealer = getDealer( { game: { dealer: 'Player' } } );
            expect( dealer ).to.equal( 'Player' );
        })
    } );
    describe( 'getCutCard()', () => {
        it( 'should get cut card', () => {
            const expectedCard = buildCard( 'Ace', 'Spades' ),
                cutCard = getCutCard( { game: { cutCard: expectedCard } } );
            expect( cutCard ).to.deep.equal( expectedCard );
        } );
    } );
    describe( 'getScore()', () => {
        it( 'should get player score', () => {
            const score = getScore( { game: { playersHandScore: 'playerScoreObject' } }, 'playersHandScore' );
            expect( score ).to.equal( 'playerScoreObject' );
        } );
        it( 'should get opponent score', () => {
            const score = getScore( { game: { opponentsHandScore: 'opponentScoreObject' } }, 'opponentsHandScore' );
            expect( score ).to.equal( 'opponentScoreObject' );
        } );
        it( 'should get crib score', () => {
            const score = getScore( { game: { cribScore: 'cribScoreObject' } }, 'cribScore' );
            expect( score ).to.equal( 'cribScoreObject' );
        } );
    } );

    describe( 'getWinner()', () => {
        it( 'should get the winner', () => {
            const winner = getWinner( { game: { winner: 'Player' } } );
            expect( winner ).to.equal( 'Player' );
        } );
    } );
} );

