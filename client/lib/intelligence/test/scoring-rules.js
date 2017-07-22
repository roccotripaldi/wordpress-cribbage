import { expect } from 'chai';

import ScoringRules from '../scoring-rules';
import { buildCard } from '../../deck/index';

const cutCard = buildCard( '3', 'Clubs' );
const defaultHand = [
    buildCard( '5', 'Clubs' ),
    buildCard( '4', 'Clubs' ),
    buildCard( '6', 'Clubs' ),
    buildCard( 'Jack', 'Clubs' )
];

describe( 'ScoringRules', () => {

   describe( 'constructor()', () => {
      it( 'should accept a hand and a cut card property', () => {
         const rules = new ScoringRules( defaultHand, cutCard );
         expect( rules.cutCard ).to.deep.equal( cutCard );
         expect( rules.hand ).to.deep.equal( defaultHand );
      } );
   } );
   
   describe( 'generateCardCombination()', () => {
      it( 'should return cards from the hand', () => {
         const rules = new ScoringRules( defaultHand, cutCard ),
             combo = rules.generateCardCombination( [ 0, 4 ] );
         expect( combo ).to.deep.equal( [ buildCard( '5', 'Clubs' ), buildCard( '3', 'Clubs' ) ] );
      } );
   } );

   describe( 'generateCardCombinations()', () => {
      it( 'should return multiple combinations from the hand', () => {
         const rules = new ScoringRules( defaultHand, cutCard ),
             combos = rules.generateCardCombinations( [ [0,1,2], [3,4] ] ),
             expectedMatch = [
                [ buildCard( '5', 'Clubs' ), buildCard( '4', 'Clubs' ), buildCard( '6', 'Clubs' ) ],
                [ buildCard( 'Jack', 'Clubs' ), buildCard( '3', 'Clubs' ) ]
         ];
         expect( combos ).to.deep.equal( expectedMatch );
      } );
   } );

   describe( 'isSequential()', () => {
      it( 'should return true for a group of sequential cards in ascending order', () => {
         const cards = [
            buildCard( '2', 'Hearts' ),
            buildCard( '3', 'Clubs' ),
            buildCard( '4', 'Hearts' )
         ];
         expect( ScoringRules.isSequential( cards ) ).to.be.true;
      } );

      it( 'should return true for a group of sequential cards in descending order', () => {
         const cards = [
            buildCard( '9', 'Hearts' ),
            buildCard( '8', 'Clubs' ),
            buildCard( '7', 'Hearts' )
         ];
         expect( ScoringRules.isSequential( cards ) ).to.be.true;
      } );

      it( 'should return true for a group of sequential cards in random order', () => {
         const cards = [
            buildCard( '9', 'Hearts' ),
            buildCard( '8', 'Clubs' ),
            buildCard( '7', 'Hearts' ),
            buildCard( 'Jack', 'Hearts' ),
            buildCard( '10', 'Hearts' )
         ];
         expect( ScoringRules.isSequential( cards ) ).to.be.true;
      } );
      it( 'should return false for a group of non-sequential cards', () => {
         const cards = [
            buildCard( 'Jack', 'Hearts' ),
            buildCard( '3', 'Clubs' ),
            buildCard( '8', 'Hearts' )
         ];
         expect( ScoringRules.isSequential( cards ) ).to.be.false;
      } );
   } );
   describe( 'isSumFifteen()', () => {
      it( 'should return true for cards that add to exactly fifteen', () => {
         const cards = [
            buildCard( 'Jack', 'Hearts' ),
            buildCard( 'Ace', 'Clubs' ),
            buildCard( '4', 'Hearts' )
         ];
         expect( ScoringRules.isSumFifteen( cards ) ).to.be.true;
      } );

      it( 'should return false for cards that do not add to exactly fifteen', () => {
         const cards = [
            buildCard( 'Jack', 'Hearts' ),
            buildCard( 'Ace', 'Clubs' ),
            buildCard( '8', 'Hearts' )
         ];
         expect( ScoringRules.isSumFifteen( cards ) ).to.be.false;
      } );
   } );
   describe( 'getFifteensScore()', () => {
      it( 'should return a score of 2 for a hand whose cards add to fifteen with the cut card', () => {
         const hand = [
            buildCard( 'Ace', 'Clubs' ),
            buildCard( '8', 'Clubs' ),
            buildCard( 'Ace', 'Hearts' ),
            buildCard( '2', 'Hearts' )
         ],
             rules = new ScoringRules( hand, cutCard ),
             fifteensScore = rules.getFifteensScore();

         expect( fifteensScore.score ).to.equal( 2 );
         expect( fifteensScore.cards ).to.deep.equal( [ hand.concat( cutCard ) ] );
      } );
      it( 'should return a score of 4 for a hand with multiple fifteens', () => {
         const rules = new ScoringRules( defaultHand, cutCard ),
             fifteensScore = rules.getFifteensScore(),
             expectedMatch = [
                [ buildCard( '5', 'Clubs' ), buildCard( 'Jack', 'Clubs' ) ],
                [ buildCard( '5', 'Clubs' ), buildCard( '4', 'Clubs' ), buildCard( '6', 'Clubs' ) ]
             ];
         expect( fifteensScore.score ).to.equal( 4 );
         expect( fifteensScore.cards ).to.deep.equal( expectedMatch );
      } );
      it( 'should return a score of 0 for a hand with no fifteens', () => {
         const hand = [
            buildCard( '3', 'Diamonds' ),
            buildCard( '5', 'Spades' ),
            buildCard( 'Ace', 'Hearts' ),
            buildCard( '2', 'Hearts' )
         ],
             rules = new ScoringRules( hand, cutCard ),
             fifteensScore = rules.getFifteensScore();
         expect( fifteensScore.score ).to.equal( 0 );
         expect( fifteensScore.cards ).to.deep.equal( [] );
      } );
   } );
   describe( 'getRightJackScore()', () => {
      it( 'should return 1 if hand contains a jack of same suit as cut card', () => {
         const rules = new ScoringRules( defaultHand, cutCard );
         expect( rules.getRightJackScore() ).to.equal( 1 );
      } );
      it( 'should return 0 if hand contains a jack of different suit as cut card', () => {
         const hand = [
            buildCard( '3', 'Hearts' ),
            buildCard( 'Jack', 'Hearts' ),
            buildCard( 'Ace', 'Hearts' ),
            buildCard( '2', 'Hearts' )
         ],
             rules = new ScoringRules( hand, cutCard );
         expect( rules.getRightJackScore() ).to.equal( 0  );
      } );
      it( 'should return 0 if hand contains no jacks', () => {
         const hand = [
            buildCard( '3', 'Hearts' ),
            buildCard( 'Queen', 'Hearts' ),
            buildCard( 'Ace', 'Hearts' ),
            buildCard( '2', 'Hearts' )
         ],
             rules = new ScoringRules( hand, cutCard );
         expect( rules.getRightJackScore() ).to.equal( 0  );
      } );
   } );
   describe( 'getPairsScore()', () => {
      it( 'should return a score of 2 and the pair for a hand with one pair', () => {
         const hand = [
            buildCard( '3', 'Hearts' ),
            buildCard( '4', 'Clubs' ),
            buildCard( 'Ace', 'Hearts' ),
            buildCard( '2', 'Hearts' )
         ],
             rules = new ScoringRules( hand, cutCard ),
             pairScore = rules.getPairsScore(),
             expectedMatch = [
               [ buildCard( '3', 'Hearts' ), cutCard ]
             ];
         expect( pairScore.score ).to.equal( 2 );
         expect( pairScore.cards ).to.deep.equal( expectedMatch );
      } );
      it( 'should return a score of 4 and the pairs for a hand with two pairs', () => {
         const hand = [
            buildCard( '3', 'Hearts' ),
            buildCard( '2', 'Clubs' ),
            buildCard( 'Ace', 'Hearts' ),
            buildCard( '2', 'Hearts' )
         ],
             rules = new ScoringRules( hand, cutCard ),
             pairScore = rules.getPairsScore(),
             expectedMatch = [
                 [ buildCard( '3', 'Hearts' ), cutCard ],
                 [ buildCard( '2', 'Clubs' ), buildCard( '2', 'Hearts' ) ]
             ];
         expect( pairScore.score ).to.equal( 4 );
         expect( pairScore.cards ).to.deep.equal( expectedMatch );
      } );
      it( 'should return a score of 6 for 3 of a kind', () => {
         const hand = [
            buildCard( '3', 'Hearts' ),
            buildCard( '3', 'Diamonds' ),
            buildCard( 'Ace', 'Hearts' ),
            buildCard( '2', 'Hearts' )
         ],
             rules = new ScoringRules( hand, cutCard ),
             pairScore = rules.getPairsScore(),
             expectedMatch = [
                 [ buildCard( '3', 'Hearts' ), buildCard( '3', 'Diamonds' ) ],
                 [ buildCard( '3', 'Hearts' ), cutCard ],
                 [ buildCard( '3', 'Diamonds' ), cutCard ]
             ];
         expect( pairScore.score ).to.equal( 6 );
         expect( pairScore.cards ).to.deep.equal( expectedMatch );
      } );
      it( 'should return a score of 12 for 4 of a kind', () => {
         const hand = [
            buildCard( '3', 'Hearts' ),
            buildCard( '3', 'Diamonds' ),
            buildCard( 'Ace', 'Hearts' ),
            buildCard( '3', 'Spades' )
         ],
             rules = new ScoringRules( hand, cutCard ),
             pairScore = rules.getPairsScore(),
             expectedMatch = [
                [ buildCard( '3', 'Hearts' ), buildCard( '3', 'Diamonds' ) ],
                [ buildCard( '3', 'Hearts' ), buildCard( '3', 'Spades' ) ],
                [ buildCard( '3', 'Hearts' ), cutCard ],
                [ buildCard( '3', 'Diamonds' ), buildCard( '3', 'Spades' ) ],
                [ buildCard( '3', 'Diamonds' ), cutCard ],
                [ buildCard( '3', 'Spades' ), cutCard ]
             ];
         expect( pairScore.score ).to.equal( 12 );
         expect( pairScore.cards ).to.deep.equal( expectedMatch );
      } );
      it( 'should return 0 for a hand with no pairs', () => {
         const rules = new ScoringRules( defaultHand, cutCard ),
             pairsScore = rules.getPairsScore();
         expect( pairsScore.score ).to.equal( 0 );
         expect( pairsScore.cards ).to.deep.equal( [] );
      } )
   } );
   describe( 'getRunScore()', () => {
      it( 'should return a score of 5, and all 5 cards for a five card run', () => {
         const hand = [
            buildCard( '5', 'Hearts' ),
            buildCard( '4', 'Clubs' ),
            buildCard( 'Ace', 'Hearts' ),
            buildCard( '2', 'Hearts' )
         ],
             rules = new ScoringRules( hand, cutCard ),
             runScore = rules.getRunScore(),
             expectedMatch = [ hand.concat( cutCard ) ];
         expect( runScore.score ).to.equal( 5 );
         expect( runScore.cards ).to.deep.equal( expectedMatch );
      } );
      it( 'should return a score of 4, and matching cards for a hand with a four card run', () => {
         const rules = new ScoringRules( defaultHand, cutCard ),
             runScore = rules.getRunScore(),
             expectedMatch = [
                 [ buildCard( '5', 'Clubs' ), buildCard( '4', 'Clubs' ), buildCard( '6', 'Clubs' ), cutCard ]
             ];
         expect( runScore.score ).to.equal( 4 );
         expect( runScore.cards ).to.deep.equal( expectedMatch );
      } );
      it( 'should return a score of 8 for a double run of 4', () => {
         const hand = [
            buildCard( '5', 'Hearts' ),
            buildCard( '4', 'Clubs' ),
            buildCard( '6', 'Hearts' ),
            buildCard( '3', 'Hearts' )
         ],
             rules = new ScoringRules( hand, cutCard ),
             runScore = rules.getRunScore(),
             expectedMatch = [
                [ buildCard( '5', 'Hearts' ), buildCard( '4', 'Clubs' ), buildCard( '6', 'Hearts' ), buildCard( '3', 'Hearts' ) ],
                [ buildCard( '5', 'Hearts' ), buildCard( '4', 'Clubs' ), buildCard( '6', 'Hearts' ), cutCard ]
             ];
         expect( runScore.score ).to.equal( 8 );
         expect( runScore.cards ).to.deep.equal( expectedMatch );
      } );
      it( 'should return a score of 6 for a double 3 card run', () => {
         const hand = [
            buildCard( '5', 'Hearts' ),
            buildCard( '4', 'Clubs' ),
            buildCard( '4', 'Hearts' ),
            buildCard( 'Queen', 'Hearts' )
         ],
             rules = new ScoringRules( hand, cutCard ),
             runScore = rules.getRunScore(),
             expectedMatch = [
                 [ buildCard( '5', 'Hearts' ), buildCard( '4', 'Clubs' ), cutCard ],
                 [ buildCard( '5', 'Hearts' ), buildCard( '4', 'Hearts' ), cutCard ]
             ];
         expect( runScore.score ).to.equal( 6 );
         expect( runScore.cards ).to.deep.equal( expectedMatch );
      } );
      it( 'should return a score of 9 for a triple 3 card run', () => {
         const hand = [
            buildCard( '5', 'Hearts' ),
            buildCard( '4', 'Clubs' ),
            buildCard( '4', 'Hearts' ),
            buildCard( '4', 'Diamonds' )
         ],
             rules = new ScoringRules( hand, cutCard ),
             runScore = rules.getRunScore(),
             expectedMatch = [
                 [ buildCard( '5', 'Hearts' ), buildCard( '4', 'Clubs' ), cutCard ],
                 [ buildCard( '5', 'Hearts' ), buildCard( '4', 'Hearts' ), cutCard ],
                 [ buildCard( '5', 'Hearts' ), buildCard( '4', 'Diamonds' ), cutCard ]
             ];
         expect( runScore.score ).to.equal( 9 );
         expect( runScore.cards ).to.deep.equal( expectedMatch );
      } );
      it( 'should return a score of 12 for 2 double 3 card runs', () => {
         const hand = [
            buildCard( '5', 'Hearts' ),
            buildCard( '5', 'Clubs' ),
            buildCard( '4', 'Hearts' ),
            buildCard( '4', 'Diamonds' )
         ],
             rules = new ScoringRules( hand, cutCard ),
             runScore = rules.getRunScore(),
             expectedMatch = [
                 [ buildCard( '5', 'Hearts' ), buildCard( '4', 'Hearts' ), cutCard ],
                 [ buildCard( '5', 'Hearts' ), buildCard( '4', 'Diamonds' ), cutCard ],
                 [ buildCard( '5', 'Clubs' ), buildCard( '4', 'Hearts' ), cutCard ],
                 [ buildCard( '5', 'Clubs' ), buildCard( '4', 'Diamonds' ), cutCard ]
             ];
         expect( runScore.score ).to.equal( 12 );
         expect( runScore.cards ).to.deep.equal( expectedMatch );
      } );
      it( 'should return a score of 0 for no run', () => {
         const hand = [
            buildCard( '5', 'Hearts' ),
            buildCard( '5', 'Clubs' ),
            buildCard( '10', 'Hearts' ),
            buildCard( '10', 'Diamonds' )
         ],
             rules = new ScoringRules( hand, cutCard ),
             runScore = rules.getRunScore();
         expect( runScore.score ).to.equal( 0 );
         expect( runScore.cards ).to.deep.equal( [] );
      } );
   } );
   describe( 'getFlushScore()', () => {
      it( 'should return 0 for a 3 card flush', () => {
         const hand = [
            buildCard( 'Ace', 'Hearts' ),
            buildCard( '2', 'Hearts' ),
            buildCard( '5', 'Clubs' ),
            buildCard( '8', 'Hearts' )
         ],
             rules = new ScoringRules( hand, cutCard );
         expect( rules.getFlushScore() ).to.equal( 0 );
      } );
      it( 'should return 4 for a 4 card flush ', () => {
         const hand = [
            buildCard( 'Ace', 'Hearts' ),
            buildCard( '2', 'Hearts' ),
            buildCard( '5', 'Hearts' ),
            buildCard( '8', 'Hearts' )
         ],
             rules = new ScoringRules( hand, cutCard );
         expect( rules.getFlushScore() ).to.equal( 4 );
      } );
      it( 'should return 5 for a 4 card flush that matches the suit of the cut card', () => {
         const rules = new ScoringRules( defaultHand, cutCard );
         expect( rules.getFlushScore() ).to.equal( 5 );
      } );
   } );
   describe( 'getScore()', () => {
      it( 'should return 29 for the best possible hand', () => {
         const hand = [
            buildCard( 'Jack', 'Diamonds' ),
            buildCard( '5', 'Clubs' ),
            buildCard( '5', 'Hearts' ),
            buildCard( '5', 'Spades' )
         ],
             rules = new ScoringRules( hand, buildCard( '5', 'Diamonds' ) ),
             score = rules.getScore();
         expect( score.score ).to.equal( 29 );
         expect( score.fifteens.score ).to.equal( 16 );
         expect( score.rightJack ).to.equal( 1 );
         expect( score.pairs.score ).to.equal( 12 );
         expect( score.runs.score ).to.equal( 0 );
         expect( score.flush ).to.equal( 0 );
      } );
      it( 'should return 0 for a non-scoring hand', () => {
         const hand = [
            buildCard( 'Jack', 'Diamonds' ),
            buildCard( '4', 'Clubs' ),
            buildCard( '3', 'Hearts' ),
            buildCard( '9', 'Spades' )
         ],
             rules = new ScoringRules( hand, buildCard( 'King', 'Hearts' ) );
         expect( rules.getScore().score ).to.equal( 0 );
      } );
   } );
} );
