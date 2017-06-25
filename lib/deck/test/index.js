import { expect } from 'chai';

import { getCardValueByName, buildCard, buildDeck } from '../index.js';

describe( 'Deck', () => {
    describe( 'getCardValueByName()', () => {
        it( 'should return 10 for face cards', () => {
            expect( getCardValueByName( 'Jack' ) ).to.equal( 10 );
            expect( getCardValueByName( 'Queen' ) ).to.equal( 10 );
            expect( getCardValueByName( 'King' ) ).to.equal( 10 );
        } );
        it( 'should return 1 for Ace', () => {
            expect( getCardValueByName( 'Ace' ) ).to.equal( 1 );
        } );
        it( 'should return an int for a known name', () => {
            expect( getCardValueByName( '10' ) ).to.equal( 10 );
            expect( getCardValueByName( '2' ) ).to.equal( 2 );
        } );
        it( 'should return 0 for an unknown name', () => {
            expect( getCardValueByName( '12' ) ).to.equal( 0 );
        } );
    } );
    describe( 'buildCard()', () => {
        it( 'should return null if given an unknown suit', () => {
            expect( buildCard( 'Ace', 8 ) ).to.be.null;
            expect( buildCard( 'Ace', 'Banana' ) ).to.be.null;
        } );
        it( 'should return null if given an out-of-range value', () => {
            expect( buildCard( '12', 'Hearts' ) ).to.be.null;
            expect( buildCard( 'Duece', 'Hearts' ) ).to.be.null;
        } );
        it( 'should return a card object when given a valid card and suit name', () => {
            const card = buildCard( 'Jack', 'Spades' );
            expect( card ).to.be.an( 'object' );
            expect( card.value ).to.equal( 10 );
            expect( card.name ).to.equal( 'Jack' );
            expect( card.suitValue ).to.equal( 3 );
            expect( card.suit ).to.equal( 'Spades' );
            expect( card.sequence ).to.equal( 10 );
        } );
    } );
    describe( 'buildDeck()', () => {
        it( 'should build a deck of 52 cards', () => {
            const deck = buildDeck();
            expect( deck.length ).to.equal( 52 );
        } );
    } );
} );
