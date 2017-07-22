import { expect } from 'chai';

import PeggingAI from '../pegging-ai';
import { buildCard } from '../../deck/index';

describe( 'PeggingAI', () => {
    describe( 'constructor()', () => {
        it( 'should have given properties', () => {
            const ai = new PeggingAI( [], [] );
            expect( ai.hand ).to.deep.equal( [] );
            expect( ai.sequence ).to.deep.equal( [] );
        } );
        it( 'should order hand by card value and suit value descending', () => {
            const hand = [
                buildCard( '5', 'Spades' ),
                buildCard( '9', 'Diamonds' ),
                buildCard( '6', 'Hearts' ),
                buildCard( '9', 'Clubs' )
            ],
                expected = [
                    buildCard( '9', 'Diamonds' ),
                    buildCard( '9', 'Clubs' ),
                    buildCard( '6', 'Hearts' ),
                    buildCard( '5', 'Spades' )
                ],
                ai = new PeggingAI( hand, [] );
            expect( ai.hand ).to.deep.equal( expected );
        } );
    } );
    describe( 'playFirstCard()', () => {
        it( 'should play the highest card', () => {
            const hand = [
                buildCard( '5', 'Spades' ),
                buildCard( '9', 'Diamonds' ),
                buildCard( '4', 'Hearts' ),
                buildCard( '8', 'Spades' )
            ],
                expected = buildCard( '9', 'Diamonds' ),
                ai = new PeggingAI( hand, [] );
            expect( ai.playFirstCard() ).to.deep.equal( expected );
        } );
        it( 'should play the highest card, unless the highest card is a five', () => {
            const hand = [
                    buildCard( '5', 'Spades' ),
                    buildCard( '3', 'Diamonds' ),
                    buildCard( '3', 'Spades' ),
                    buildCard( 'Ace', 'Hearts' )
                ],
                expected = buildCard( '3', 'Spades' ),
                ai = new PeggingAI( hand, [] );
            expect( ai.playFirstCard() ).to.deep.equal( expected );
        } );
        it( 'should play the five with the lowest suit if all cards are fives', () => {
            const hand = [
                    buildCard( '5', 'Hearts' ),
                    buildCard( '5', 'Spades' ),
                    buildCard( '5', 'Clubs' ),
                    buildCard( '5', 'Diamonds' )
                ],
                expected = buildCard( '5', 'Clubs' ),
                ai = new PeggingAI( hand, [] );
            expect( ai.playFirstCard() ).to.deep.equal( expected );
        } );
    } );
    describe( 'playCard()', () => {
        it( 'should play the card if it only has one card', () => {
            const hand = [
                    buildCard( '5', 'Hearts' )
                ],
                expected = buildCard( '5', 'Hearts' ),
                ai = new PeggingAI( hand, [] );
            expect( ai.playCard() ).to.deep.equal( expected );
        } );
        it( 'should play the card that generates the highest score', () => {
            const hand = [
                    buildCard( 'King', 'Hearts' ),
                    buildCard( '6', 'Diamonds' )
                ],
                sequence = [
                    buildCard( '9', 'Hearts' )
                ],
                expected = buildCard( '6', 'Diamonds' ),
                ai = new PeggingAI( hand, sequence );
            expect( ai.playCard() ).to.deep.equal( expected );
        } );
        it( 'should play the card that generates the highest score', () => {
            const hand = [
                    buildCard( 'King', 'Hearts' ),
                    buildCard( '6', 'Diamonds' ),
                    buildCard( '9', 'Clubs' )
                ],
                sequence = [
                    buildCard( '9', 'Hearts' ),
                    buildCard( '9', 'Diamonds')
                ],
                expected = buildCard( '9', 'Clubs' ),
                ai = new PeggingAI( hand, sequence );
            expect( ai.playCard() ).to.deep.equal( expected );
        } );
        it( 'should play the card that generates the highest score', () => {
            const hand = [
                    buildCard( '3', 'Hearts' ),
                    buildCard( '4', 'Diamonds' ),
                    buildCard( '2', 'Clubs' )
                ],
                sequence = [
                    buildCard( '2', 'Hearts' ),
                    buildCard( '4', 'Diamonds'),
                    buildCard( '5', 'Diamonds' ),
                ],
                expected = buildCard( '3', 'Hearts' ),
                ai = new PeggingAI( hand, sequence );
            expect( ai.playCard() ).to.deep.equal( expected );
        } );
        it( 'should play highest card if no cards provide a score', () => {
            const hand = [
                    buildCard( '3', 'Hearts' ),
                    buildCard( '4', 'Diamonds' ),
                    buildCard( '2', 'Clubs' )
                ],
                sequence = [
                    buildCard( '8', 'Hearts' ),
                    buildCard( '7', 'Diamonds'),
                    buildCard( '3', 'Diamonds' ),
                ],
                expected = buildCard( '4', 'Diamonds' ),
                ai = new PeggingAI( hand, sequence );
            expect( ai.playCard() ).to.deep.equal( expected );
        } );
    } );
} );
