import { expect } from 'chai';

import DiscardAI from '../discard-ai';
import { buildCard } from '../../deck/index';

const defaultHand = [
    buildCard( 'Ace', 'Spades' ),
    buildCard( '2', 'Hearts' ),
    buildCard( 'Jack', 'Hearts' ),
    buildCard( '9', 'Clubs' ),
    buildCard( 'Ace', 'Hearts' ),
    buildCard( '4', 'Diamonds' )
];

describe( 'DiscardAI', () => {
    describe( 'constructor()', () => {
        it( 'should have a deck property', () => {
            const ai = new DiscardAI( defaultHand );
            expect( ai.deck.length ).to.equal( 52 );
        } );
        it( 'should have a potentialHands property', () => {
            const ai = new DiscardAI( defaultHand );
            expect( ai.potentialHands ).to.be.an( 'Array' ).that.is.empty;
        } );
        it( 'should have an hand property', () => {
            const ai = new DiscardAI( defaultHand );
            expect( ai.hand ).to.be.an( 'Array' ).that.deep.equals( defaultHand );
        } );
        it( 'should have an analysis property', () => {
            const ai = new DiscardAI( defaultHand );
            expect( ai.analysis.highestAverageHand ).to.be.an( 'Object' );
            expect( ai.analysis.highestPossibleHand ).to.be.an( 'Object' );
            expect( ai.analysis.highestPossibleScore ).to.equal( 0 );
        } );
    } );
    describe( 'keepCardInDeck()', () => {
        it( 'should not keep card if card is in hand', () => {
            const ai = new DiscardAI( defaultHand );
            expect( ai.keepCardInDeck( buildCard( '2', 'Hearts' ) ) ).to.be.false;
        } );
        it( 'should keep card if hand does not have card', () => {
            const ai = new DiscardAI( defaultHand );
            expect( ai.keepCardInDeck( buildCard( '5', 'Hearts' ) ) ).to.be.true;
        } );
    } );
    describe( 'removeHandFromDeck()', () => {
        it( 'should remove hand from deck', () => {
            const ai = new DiscardAI( defaultHand );
            ai.removeHandFromDeck();
            expect( ai.deck.length ).to.equal( 46 );
        } );
    } );
    describe( 'generatePotentialFourCardHands()', () => {
        it( 'should generate 15 potential four card hands', () => {
            const ai = new DiscardAI( defaultHand )
            ai.generatePotentialFourCardHands();
            expect( ai.potentialHands.length ).to.equal( 15 );
            ai.potentialHands.forEach( ( hand ) => {
                expect( hand.cards.length ).to.equal( 4 );
                expect( hand.scores ).to.be.an( 'Array' ).that.is.empty;
                expect( hand.average ).to.equal( 0 );
                expect( hand.combination.length ).to.equal( 4 );
            } );
        } );
    } );
    describe( 'addScoreToPotentialHands()', () => {
        it( 'should should add a score to each potential hand based on the given cut card', () => {
            const ai = new DiscardAI( defaultHand ),
                cutCard = buildCard( 'King', 'Diamonds' );
            ai.generatePotentialFourCardHands();
            ai.addScoreToPotentialHand( cutCard );
            ai.potentialHands.forEach( ( hand ) => {
                expect( hand.scores.length ).to.equal( 1 );
                expect( hand.scores[0].card ).to.deep.equal( cutCard );
                expect( hand.scores[0].score ).to.be.a( 'number' );
            } );
        } );
    } );
    describe( 'generateScores()', () => {
        it( 'should generate 46 scores for each potential hand', () => {
            const ai = new DiscardAI( defaultHand );
            ai.generateScores();
            ai.potentialHands.forEach( ( hand ) => {
                expect( hand.scores.length ).to.equal( 46 );
            } );
        } );
    } );
    describe( 'analyze()', () => {
        it( 'should differentiate between best average score, and highest possible score', () => {
            const hand = [
                buildCard( 'Ace', 'Hearts' ),
                buildCard( 'Queen', 'Spades' ),
                buildCard( '2', 'Diamonds' ),
                buildCard( 'Queen', 'Hearts' ),
                buildCard( '3', 'Hearts' ),
                buildCard( '2', 'Hearts' )
            ],
                ai = new DiscardAI( hand ),
                highestPossibleHand = [
                    buildCard( 'Ace', 'Hearts' ),
                    buildCard( 'Queen', 'Hearts' ),
                    buildCard( '3', 'Hearts' ),
                    buildCard( '2', 'Hearts' )
                ],
                safestHand = [
                    buildCard( 'Ace', 'Hearts' ),
                    buildCard( '2', 'Diamonds' ),
                    buildCard( '3', 'Hearts' ),
                    buildCard( '2', 'Hearts' )
                ];
            ai.analyze();
            expect( ai.analysis.highestPossibleHand.cards ).to.deep.equal( highestPossibleHand );
            expect( ai.analysis.highestAverageHand.cards ).to.deep.equal( safestHand );
            expect( ai.analysis.highestPossibleScore ).to.equal( 18 );
            expect( ai.analysis.highestAverageHand.score ).to.equal( 16 );
        } );
    } );
} );
