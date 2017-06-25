import { expect } from 'chai';

import Analyzer from '../analyzer';
import { buildCard } from '../../deck/index';

const defaultHand = [
    buildCard( 'Ace', 'Spades' ),
    buildCard( '2', 'Hearts' ),
    buildCard( 'Jack', 'Hearts' ),
    buildCard( '9', 'Clubs' ),
    buildCard( 'Ace', 'Hearts' ),
    buildCard( '4', 'Diamonds' )
];

describe( 'Analyzer', () => {
    describe( 'constructor()', () => {
        it( 'should have a deck property', () => {
            const analyzer = new Analyzer( defaultHand );
            expect( analyzer.deck.length ).to.equal( 52 );
        } );
        it( 'should have a potentialHands property', () => {
            const analyzer = new Analyzer( defaultHand );
            expect( analyzer.potentialHands ).to.be.an( 'Array' ).that.is.empty;
        } );
        it( 'should have an hand property', () => {
            const analyzer = new Analyzer( defaultHand );
            expect( analyzer.hand ).to.be.an( 'Array' ).that.deep.equals( defaultHand );
        } );
    } );
    describe( 'keepCardInDeck()', () => {
        it( 'should not keep card if card is in hand', () => {
            const analyzer = new Analyzer( defaultHand );
            expect( analyzer.keepCardInDeck( buildCard( '2', 'Hearts' ) ) ).to.be.false;
        } );
        it( 'should keep card if hand does not have card', () => {
            const analyzer = new Analyzer( defaultHand );
            expect( analyzer.keepCardInDeck( buildCard( '5', 'Hearts' ) ) ).to.be.true;
        } );
    } );
    describe( 'removeHandFromDeck()', () => {
        it( 'should remove hand from deck', () => {
            const analyzer = new Analyzer( defaultHand );
            analyzer.removeHandFromDeck();
            expect( analyzer.deck.length ).to.equal( 46 );
        } );
    } );
    describe( 'generatePotentialFourCardHands()', () => {
        it( 'should generate 15 potential four card hands', () => {
            const analyzer = new Analyzer( defaultHand )
            analyzer.generatePotentialFourCardHands();
            expect( analyzer.potentialHands.length ).to.equal( 15 );
            analyzer.potentialHands.forEach( ( hand ) => {
                expect( hand.cards.length ).to.equal( 4 );
                expect( hand.scores ).to.be.an( 'Array' ).that.is.empty;
            } );
        } );
    } );
    describe( 'addScoreToPotentialHands()', () => {
        it( 'should should add a score to each potential hand based on the given cut card', () => {
            const analyzer = new Analyzer( defaultHand ),
                cutCard = buildCard( 'King', 'Diamonds' );
            analyzer.generatePotentialFourCardHands();
            analyzer.addScoreToPotentialHand( cutCard );
            analyzer.potentialHands.forEach( ( hand ) => {
                expect( hand.scores.length ).to.equal( 1 );
                expect( hand.scores[0].card ).to.deep.equal( cutCard );
                expect( hand.scores[0].score ).to.be.a( 'number' );
            } );
        } );
    } );
    describe( 'generateScores()', () => {
        it( 'should generate 46 scores for each potential hand', () => {
            const analyzer = new Analyzer( defaultHand );
            analyzer.generateScores();
            analyzer.potentialHands.forEach( ( hand ) => {
                expect( hand.scores.length ).to.equal( 46 );
            } );
        } );
    } );
} );
