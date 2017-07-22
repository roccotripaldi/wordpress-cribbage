import { expect } from 'chai';

import { getPegScore } from '../pegging-rules';
import { buildCard } from '../../deck/index';

describe( 'getPegScore()', () => {
    it( 'should return zero if sequence is empty', () => {
        expect( getPegScore( buildCard( '4', 'Hearts' ), [] ).score ).to.equal( 0 );
    } );

    it( 'should return 2 for sequences that sum to 15', () => {
        const sequence = [
            buildCard( '3', 'Spades' ),
            buildCard( '6', 'Hearts' )
        ],
            card = buildCard( '6', 'Diamonds' ),
            pegScore = getPegScore( card, sequence );
        expect( pegScore.score ).to.equal( 2 );
        expect( pegScore.reason ).to.equal( '2 points for 15. ' );
    } );

    it( 'should return 2 for sequences that sum to 31', () => {
        const sequence = [
                buildCard( '10', 'Hearts' ),
                buildCard( 'Jack', 'Diamonds' ),
                buildCard( '4', 'Spades' ),
                buildCard( '6', 'Hearts' )
            ],
            card = buildCard( 'Ace', 'Diamonds' ),
            pegScore = getPegScore( card, sequence );
        expect( pegScore.score ).to.equal( 2 );
        expect( pegScore.reason ).to.equal( '2 points for 31. ' );
    } );

    it( 'should return 2 for a sequence that starts with a pair', () => {
        const sequence = [
                buildCard( '4', 'Spades' ),
                buildCard( '6', 'Hearts' )
            ],
            card = buildCard( '4', 'Diamonds' ),
            pegScore = getPegScore( card, sequence );
        expect( pegScore.score ).to.equal( 2 );
        expect( pegScore.reason ).to.equal( '2 points for pairs.' );
    } );

    it( 'should return 6 for a sequence that starts with three of a kind', () => {
        const sequence = [
                buildCard( '4', 'Spades' ),
                buildCard( '4', 'Hearts' )
            ],
            card = buildCard( '4', 'Diamonds' ),
            pegScore = getPegScore( card, sequence );
        expect( pegScore.score ).to.equal( 6 );
        expect( pegScore.reason ).to.equal( '6 points for pairs.' );
    } );

    it( 'should return 12 for a sequence that starts with four of a kind', () => {
        const sequence = [
                buildCard( '4', 'Spades' ),
                buildCard( '4', 'Hearts' ),
                buildCard( '4', 'Clubs' )
            ],
            card = buildCard( '4', 'Diamonds' ),
            pegScore = getPegScore( card, sequence );
        expect( pegScore.score ).to.equal( 12 );
        expect( pegScore.reason ).to.equal( '12 points for pairs.' );
    } );

    it( 'should return 4 for a sequence that starts with a pair and sums to 15', () => {
        const sequence = [
                buildCard( '4', 'Spades' ),
                buildCard( '2', 'Hearts' ),
                buildCard( '5', 'Clubs' )
            ],
            card = buildCard( '4', 'Diamonds' ),
            pegScore = getPegScore( card, sequence )
        expect( pegScore.score ).to.equal( 4 );
        expect( pegScore.reason ).to.equal( '2 points for 15. 2 points for pairs.' );
    } );

    it( 'should return 8 for a sequence that starts with three of a kind and sums to 15', () => {
        const sequence = [
                buildCard( '4', 'Spades' ),
                buildCard( '4', 'Hearts' ),
                buildCard( '3', 'Clubs' )
            ],
            card = buildCard( '4', 'Diamonds' ),
            pegScore = getPegScore( card, sequence );
        expect( pegScore.score ).to.equal( 8 );
        expect( pegScore.reason ).to.equal( '2 points for 15. 6 points for pairs.' );
    } );

    it( 'should return 14 for a sequence that starts with four of a kind and sums to 31', () => {
        const sequence = [
                buildCard( '4', 'Spades' ),
                buildCard( '4', 'Hearts' ),
                buildCard( '4', 'Clubs' ),
                buildCard( '10', 'Diamonds' ),
                buildCard( '5', 'Clubs' )
            ],
            card = buildCard( '4', 'Diamonds' ),
            pegScore = getPegScore( card, sequence );
        expect( pegScore.score ).to.equal( 14 );
        expect( pegScore.reason ).to.equal( '2 points for 31. 12 points for pairs.' );
    } );

    it( 'should return 3 for a 3 card run', () => {
        const sequence = [
                buildCard( '4', 'Spades' ),
                buildCard( '3', 'Clubs' ),
                buildCard( '10', 'Diamonds' )
            ],
            card = buildCard( '2', 'Diamonds' ),
            pegScore = getPegScore( card, sequence );
        expect( pegScore.score ).to.equal( 3 );
        expect( pegScore.reason ).to.equal( '3 card run.' );
    } );

    it( 'should return 4 for a 4 card run', () => {
        const sequence = [
                buildCard( '4', 'Spades' ),
                buildCard( '3', 'Clubs' ),
                buildCard( 'Ace', 'Diamonds' )
            ],
            card = buildCard( '2', 'Diamonds' ),
            pegScore = getPegScore( card, sequence );
        expect( pegScore.score ).to.equal( 4 );
        expect( pegScore.reason ).to.equal( '4 card run.' );
    } );

    it( 'should return 5 for a 5 card run', () => {
        const sequence = [
                buildCard( '2', 'Spades' ),
                buildCard( '6', 'Clubs' ),
                buildCard( '4', 'Diamonds' ),
                buildCard( '5', 'Hearts' )
            ],
            card = buildCard( '3', 'Diamonds' ),
            pegScore = getPegScore( card, sequence );
        expect( pegScore.score ).to.equal( 5 );
        expect( pegScore.reason ).to.equal( '5 card run.' );
    } );

    it( 'should return 6 for a 6 card run', () => {
        const sequence = [
                buildCard( '2', 'Spades' ),
                buildCard( '6', 'Clubs' ),
                buildCard( '4', 'Diamonds' ),
                buildCard( '5', 'Hearts' ),
                buildCard( '7', 'Hearts' )
            ],
            card = buildCard( '3', 'Diamonds' ),
            pegScore = getPegScore( card, sequence );
        expect( pegScore.score ).to.equal( 6 );
        expect( pegScore.reason ).to.equal( '6 card run.' );
    } );

    it( 'should return 7 for a 7 card run', () => {
        const sequence = [
                buildCard( '2', 'Spades' ),
                buildCard( '6', 'Clubs' ),
                buildCard( '4', 'Diamonds' ),
                buildCard( '5', 'Hearts' ),
                buildCard( '7', 'Hearts' ),
                buildCard( '3', 'Hearts' )
            ],
            card = buildCard( 'Ace', 'Diamonds' ),
            pegScore = getPegScore( card, sequence );
        expect( pegScore.score ).to.equal( 7 );
        expect( pegScore.reason ).to.equal( '7 card run.' );
    } );

    it( 'should return 7 for a five card run that sums to 15', () => {
        const sequence = [
                buildCard( 'Ace', 'Spades' ),
                buildCard( '2', 'Clubs' ),
                buildCard( '4', 'Diamonds' ),
                buildCard( '3', 'Hearts' )
            ],
            card = buildCard( '5', 'Diamonds' ),
            pegScore = getPegScore( card, sequence );
        expect( pegScore.score ).to.equal( 7 );
        expect( pegScore.reason ).to.equal( '2 points for 15. 5 card run.' );
    } );

    it( 'should return 6 for a four card run that sums to 31', () => {
        const sequence = [
                buildCard( '5', 'Spades' ),
                buildCard( '7', 'Clubs' ),
                buildCard( '4', 'Diamonds' ),
                buildCard( '9', 'Hearts' )
            ],
            card = buildCard( '6', 'Diamonds' ),
            pegScore = getPegScore( card, sequence );
        expect( pegScore.score ).to.equal( 6 );
        expect( pegScore.reason ).to.equal( '2 points for 31. 4 card run.' );
    } );
} );