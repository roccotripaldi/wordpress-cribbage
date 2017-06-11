import { expect } from 'chai';

import Deck from '../index.js';

describe( 'Deck', () => {
    let deck;
    beforeEach( () => {
        deck = new Deck;
    } );

    describe( 'constructor()', () => {
        it( 'should have a `cards` property, defaulted to an empty array', () => {
            expect( deck.cards ).to.be.an('array').that.is.empty;
        } );

        it( 'should have a `suits` property, with four suits', () => {
            expect( deck.suits.length ).to.equal( 4 );
            expect( deck.suits ).to.include( 'Clubs' );
            expect( deck.suits ).to.include( 'Diamonds' );
            expect( deck.suits ).to.include( 'Hearts' );
            expect( deck.suits ).to.include( 'Spades' );
        } );

        it( 'should have a `names` property, with 13 values', () => {
            expect( deck.names.length ).to.equal( 13 );
        } );
    } );

    describe( 'buildCard()', () => {
        it( 'should return null if given an unknown suit', () => {
            expect( deck.buildCard( 'Ace', 8 ) ).to.be.null;
            expect( deck.buildCard( 'Ace', 'Banana' ) ).to.be.null;
        } );

        it( 'should return null if given an out-of-range value', () => {
            expect( deck.buildCard( '12', 'Hearts' ) ).to.be.null;
            expect( deck.buildCard( 'Duece', 'Hearts' ) ).to.be.null;
        } );

        it( 'should return a card object when given a card name and suit value', () => {
            const card = deck.buildCard( 'Ace', 3 );
            expect( card ).to.be.an( 'object' );
            expect( card.value ).to.equal( 1 );
            expect( card.name ).to.equal( 'Ace' );
            expect( card.suitValue ).to.equal( 3 );
            expect( card.suit ).to.equal( 'Spades' );
            expect( card.sequence ).to.equal( 0 );
        } );

        it( 'should return a card object when given a card name and suit name', () => {
            const card = deck.buildCard( 'Jack', 'Spades' );
            expect( card ).to.be.an( 'object' );
            expect( card.value ).to.equal( 10 );
            expect( card.name ).to.equal( 'Jack' );
            expect( card.suitValue ).to.equal( 3 );
            expect( card.suit ).to.equal( 'Spades' );
            expect( card.sequence ).to.equal( 10 );
        } );
    } );

    describe( 'build()', () => {
        it( 'should build a deck of 52 cards', () => {
            deck.build();
            expect( deck.cards.length ).to.equal( 52 );
        } );
    } );

    describe( 'getCard()', () => {
        it( 'should return null for an empty deck', () => {
            expect( deck.getCard() ).to.be.null;
        } );

        it( 'should return and remove the top card', () => {
            let topCard;
            deck.build();
            topCard = deck.cards[0];
            expect( deck.getCard() ).to.deep.equal( topCard );
            expect( deck.cards.length ).to.equal( 51 );
        } );

        it( 'should return and remove the given card', () => {
            let card;
            deck.build();
            card = deck.buildCard( 'Ace', 'Spades' );
            expect( deck.getCard( card ) ).to.deep.equal( card );
            expect( deck.cards.length ).to.equal( 51 );
        } );

        it( 'should return null for a card not present in the deck', () => {
            let card;
            deck.build();
            card = deck.buildCard( 'Ace', 'Spades' );
            expect( deck.getCard( card ) ).to.deep.equal( card );
            expect( deck.getCard( card ) ).to.be.null;
        } );
    } );
} );
