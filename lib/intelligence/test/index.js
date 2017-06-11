import { expect } from 'chai';

import Intelligence from '../index';
import Deck from '../../deck/index';

describe( 'Intelligence', () => {
   let intel, hand, deck, cutCard;
   beforeEach( () => {
      intel = new Intelligence;
      deck = new Deck;
      hand = [];
      cutCard = deck.buildCard( '3', 'Clubs' );
   } );

   describe( 'isSequential()', () => {
      it( 'should return true for a group of sequential cards in ascending order', () => {
         hand.push( deck.buildCard( '2', 'Hearts' ) );
         hand.push( deck.buildCard( '3', 'Clubs' ) );
         hand.push( deck.buildCard( '4', 'Hearts' ) );
         expect( intel.isSequential( hand ) ).to.be.true;
      } );

      it( 'should return true for a group of sequential cards in descending order', () => {
         hand.push( deck.buildCard( '9', 'Hearts' ) );
         hand.push( deck.buildCard( '8', 'Clubs' ) );
         hand.push( deck.buildCard( '7', 'Hearts' ) );
         expect( intel.isSequential( hand ) ).to.be.true;
      } );

      it( 'should return true for a group of sequential cards in random order', () => {
         hand.push( deck.buildCard( '9', 'Hearts' ) );
         hand.push( deck.buildCard( '8', 'Clubs' ) );
         hand.push( deck.buildCard( '7', 'Hearts' ) );
         hand.push( deck.buildCard( 'Jack', 'Hearts' ) );
         hand.push( deck.buildCard( '10', 'Hearts' ) );
         expect( intel.isSequential( hand ) ).to.be.true;
      } );

      it( 'should return false for a group of non-sequential cards', () => {
         hand.push( deck.buildCard( 'Jack', 'Hearts' ) );
         hand.push( deck.buildCard( '3', 'Clubs' ) );
         hand.push( deck.buildCard( '8', 'Hearts' ) );
         expect( intel.isSequential( hand ) ).to.be.false;
      } );
   } );

   describe( 'isSumFifteen()', () => {
      it( 'should return true for cards that add to exactly fifteen', () => {
         hand.push( deck.buildCard( 'Jack', 'Hearts' ) );
         hand.push( deck.buildCard( 'Ace', 'Clubs' ) );
         hand.push( deck.buildCard( '4', 'Hearts' ) );
         expect( intel.isSumFifteen( hand ) ).to.be.true;
      } );

      it( 'should return false for cards that do not add to exactly fifteen', () => {
         hand.push( deck.buildCard( 'Jack', 'Hearts' ) );
         hand.push( deck.buildCard( 'Ace', 'Clubs' ) );
         hand.push( deck.buildCard( '8', 'Hearts' ) );
         expect( intel.isSumFifteen( hand ) ).to.be.false;
      } );
   } );

   describe( 'getFifteensScore()', () => {
      it( 'should return null for an invalid hand', () => {
         hand.push( deck.buildCard( 'Jack', 'Hearts' ) );
         hand.push( deck.buildCard( '4', 'Clubs' ) );
         expect( intel.getFifteensScore( hand ) ).to.be.null;
      } );

      it( 'should return a score of 2 for a hand whose cards add to fifteen with the cut card', () => {
         let fifteensScore, expectedMatch = [];
         hand.push( deck.buildCard( 'Ace', 'Clubs' ) );
         hand.push( deck.buildCard( '8', 'Clubs' ) );
         hand.push( deck.buildCard( 'Ace', 'Hearts' ) );
         hand.push( deck.buildCard( '2', 'Hearts' ) );
         hand.push( cutCard );
         expectedMatch.push( hand );
         fifteensScore = intel.getFifteensScore( hand );
         expect( fifteensScore.score ).to.equal( 2 );
         expect( fifteensScore.cards ).to.deep.equal( expectedMatch );
      } );

      it( 'should return a score of 2 for a hand with 3 cards that add to fifteen', () => {
         let fifteensScore, expectedMatch = [];
         hand.push( deck.buildCard( '10', 'Clubs' ) );
         hand.push( deck.buildCard( '8', 'Clubs' ) );
         hand.push( deck.buildCard( 'Ace', 'Hearts' ) );
         hand.push( deck.buildCard( '2', 'Hearts' ) );
         hand.push( cutCard );
         expectedMatch.push([]);
         expectedMatch[0].push( deck.buildCard( '10', 'Clubs' ) );
         expectedMatch[0].push( deck.buildCard( '2', 'Hearts' ) );
         expectedMatch[0].push( cutCard );
         fifteensScore = intel.getFifteensScore( hand );
         expect( fifteensScore.score ).to.equal( 2 );
         expect( fifteensScore.cards ).to.deep.equal( expectedMatch );
      } );

      it( 'should return a score of 8 for a hand with multiple fifteens', () => {
         let fifteensScore, expectedMatch = [];
         hand.push( deck.buildCard( '5', 'Clubs' ) );
         hand.push( deck.buildCard( '5', 'Spades' ) );
         hand.push( deck.buildCard( '10', 'Hearts' ) );
         hand.push( deck.buildCard( '2', 'Hearts' ) );
         hand.push( cutCard );
         expectedMatch.push([]);
         expectedMatch[0].push( deck.buildCard( '5', 'Clubs' ) );
         expectedMatch[0].push( deck.buildCard( '10', 'Hearts' ) );
         expectedMatch.push([]);
         expectedMatch[1].push( deck.buildCard( '5', 'Spades' ) );
         expectedMatch[1].push( deck.buildCard( '10', 'Hearts' ) );
         expectedMatch.push([]);
         expectedMatch[2].push( deck.buildCard( '10', 'Hearts' ) );
         expectedMatch[2].push( deck.buildCard( '2', 'Hearts' ) );
         expectedMatch[2].push( cutCard );
         expectedMatch.push([]);
         expectedMatch[3].push( deck.buildCard( '5', 'Clubs' ) );
         expectedMatch[3].push( deck.buildCard( '5', 'Spades' ) );
         expectedMatch[3].push( deck.buildCard( '2', 'Hearts' ) );
         expectedMatch[3].push( cutCard );
         fifteensScore = intel.getFifteensScore( hand );
         expect( fifteensScore.score ).to.equal( 8 );
         expect( fifteensScore.cards ).to.deep.equal( expectedMatch );
      } );

      it( 'should return a score of 0 for a hand with no fifteens', () => {
         let fifteensScore;
         hand.push( deck.buildCard( '3', 'Clubs' ) );
         hand.push( deck.buildCard( '5', 'Spades' ) );
         hand.push( deck.buildCard( 'Ace', 'Hearts' ) );
         hand.push( deck.buildCard( '2', 'Hearts' ) );
         hand.push( cutCard );
         fifteensScore = intel.getFifteensScore( hand );
         expect( fifteensScore.score ).to.equal( 0 );
         expect( fifteensScore.cards ).to.deep.equal( [] );
      } );
   } );

   describe( 'getRightJackScore()', () => {
      it( 'should return 1 if hand contains a jack of same suit as cut card', () => {
         hand.push( deck.buildCard( '3', 'Hearts' ) );
         hand.push( deck.buildCard( 'Jack', 'Clubs' ) );
         hand.push( deck.buildCard( 'Ace', 'Hearts' ) );
         hand.push( deck.buildCard( '2', 'Hearts' ) );
         expect( intel.getRightJackScore( hand, cutCard ) ).to.equal( 1 );
      } );
      it( 'should return 0 if hand contains a jack of different suit as cut card', () => {
         hand.push( deck.buildCard( '3', 'Hearts' ) );
         hand.push( deck.buildCard( 'Jack', 'Hearts' ) );
         hand.push( deck.buildCard( 'Ace', 'Hearts' ) );
         hand.push( deck.buildCard( '2', 'Hearts' ) );
         expect( intel.getRightJackScore( hand, cutCard ) ).to.equal( 0  );
      } );
      it( 'should return 0 if hand contains no jacks', () => {
         hand.push( deck.buildCard( '3', 'Hearts' ) );
         hand.push( deck.buildCard( 'Queen', 'Hearts' ) );
         hand.push( deck.buildCard( 'Ace', 'Hearts' ) );
         hand.push( deck.buildCard( '2', 'Hearts' ) );
         expect( intel.getRightJackScore( hand, cutCard ) ).to.equal( 0  );
      } );
   } );

   describe( 'getPairsScore()', () => {
      it( 'should return null for a hand of less than 5 cards', () => {
         hand.push( deck.buildCard( '3', 'Hearts' ) );
         hand.push( deck.buildCard( '4', 'Clubs' ) );
         expect( intel.getRunScore( hand ) ).to.be.null;
      } );
      it( 'should return a score of 2 and the pair for a hand with one pair', () => {
         let pairScore, expectedMatch = [];
         hand.push( deck.buildCard( '3', 'Hearts' ) );
         hand.push( deck.buildCard( '4', 'Clubs' ) );
         hand.push( deck.buildCard( 'Ace', 'Hearts' ) );
         hand.push( deck.buildCard( '2', 'Hearts' ) );
         hand.push( cutCard );
         expectedMatch.push([]);
         expectedMatch[0].push( deck.buildCard( '3', 'Hearts' ) );
         expectedMatch[0].push( cutCard );
         pairScore = intel.getPairsScore( hand );
         expect( pairScore.score ).to.equal( 2 );
         expect( pairScore.cards ).to.deep.equal( expectedMatch );
      } );

      it( 'should return a score of 4 and the pairs for a hand with two pairs', () => {
         let pairScore, expectedMatch = [];
         hand.push( deck.buildCard( '3', 'Hearts' ) );
         hand.push( deck.buildCard( '2', 'Clubs' ) );
         hand.push( deck.buildCard( 'Ace', 'Hearts' ) );
         hand.push( deck.buildCard( '2', 'Hearts' ) );
         hand.push( cutCard );
         expectedMatch.push([]);
         expectedMatch[0].push( deck.buildCard( '3', 'Hearts' ) );
         expectedMatch[0].push( cutCard );
         expectedMatch.push([]);
         expectedMatch[1].push( deck.buildCard( '2', 'Clubs' ) );
         expectedMatch[1].push( deck.buildCard( '2', 'Hearts' ) );
         pairScore = intel.getPairsScore( hand );
         expect( pairScore.score ).to.equal( 4 );
         expect( pairScore.cards ).to.deep.equal( expectedMatch );
      } );

      it( 'should return a score of 6 for 3 of a kind', () => {
         let pairScore, expectedMatch = [];
         hand.push( deck.buildCard( '3', 'Hearts' ) );
         hand.push( deck.buildCard( '3', 'Diamonds' ) );
         hand.push( deck.buildCard( 'Ace', 'Hearts' ) );
         hand.push( deck.buildCard( '2', 'Hearts' ) );
         hand.push( cutCard );
         expectedMatch.push([]);
         expectedMatch[0].push( deck.buildCard( '3', 'Hearts' ) );
         expectedMatch[0].push( deck.buildCard( '3', 'Diamonds' ) );
         expectedMatch.push([]);
         expectedMatch[1].push( deck.buildCard( '3', 'Hearts' ) );
         expectedMatch[1].push( cutCard );
         expectedMatch.push([]);
         expectedMatch[2].push( deck.buildCard( '3', 'Diamonds' ) );
         expectedMatch[2].push( cutCard );
         pairScore = intel.getPairsScore( hand );
         expect( pairScore.score ).to.equal( 6 );
         expect( pairScore.cards ).to.deep.equal( expectedMatch );
      } );

      it( 'should return a score of 12 for 4 of a kind', () => {
         let pairScore, expectedMatch = [];
         hand.push( deck.buildCard( '3', 'Hearts' ) );
         hand.push( deck.buildCard( '3', 'Diamonds' ) );
         hand.push( deck.buildCard( 'Ace', 'Hearts' ) );
         hand.push( deck.buildCard( '3', 'Spades' ) );
         hand.push( cutCard );
         expectedMatch.push([]);
         expectedMatch[0].push( deck.buildCard( '3', 'Hearts' ) );
         expectedMatch[0].push( deck.buildCard( '3', 'Diamonds' ) );
         expectedMatch.push([]);
         expectedMatch[1].push( deck.buildCard( '3', 'Hearts' ) );
         expectedMatch[1].push( deck.buildCard( '3', 'Spades' ) );
         expectedMatch.push([]);
         expectedMatch[2].push( deck.buildCard( '3', 'Hearts' ) );
         expectedMatch[2].push( cutCard );
         expectedMatch.push([]);
         expectedMatch[3].push( deck.buildCard( '3', 'Diamonds' ) );
         expectedMatch[3].push( deck.buildCard( '3', 'Spades' ) );
         expectedMatch.push([]);
         expectedMatch[4].push( deck.buildCard( '3', 'Diamonds' ) );
         expectedMatch[4].push( cutCard );
         expectedMatch.push([]);
         expectedMatch[5].push( deck.buildCard( '3', 'Spades' ) );
         expectedMatch[5].push( cutCard );
         pairScore = intel.getPairsScore( hand );
         expect( pairScore.score ).to.equal( 12 );
         expect( pairScore.cards ).to.deep.equal( expectedMatch );
      } );

      it( 'should return a score of 8 for a full house', () => {
         let pairScore, expectedMatch = [];
         hand.push( deck.buildCard( 'Ace', 'Hearts' ) );
         hand.push( deck.buildCard( '3', 'Diamonds' ) );
         hand.push( deck.buildCard( 'Ace', 'Spades' ) );
         hand.push( deck.buildCard( '3', 'Spades' ) );
         hand.push( cutCard );
         expectedMatch.push([]);
         expectedMatch[0].push( deck.buildCard( 'Ace', 'Hearts' ) );
         expectedMatch[0].push( deck.buildCard( 'Ace', 'Spades' ) );
         expectedMatch.push([]);
         expectedMatch[1].push( deck.buildCard( '3', 'Diamonds' ) );
         expectedMatch[1].push( deck.buildCard( '3', 'Spades' ) );
         expectedMatch.push([]);
         expectedMatch[2].push( deck.buildCard( '3', 'Diamonds' ) );
         expectedMatch[2].push( cutCard );
         expectedMatch.push([]);
         expectedMatch[3].push( deck.buildCard( '3', 'Spades' ) );
         expectedMatch[3].push( cutCard );
         pairScore = intel.getPairsScore( hand );
         expect( pairScore.score ).to.equal( 8 );
         expect( pairScore.cards ).to.deep.equal( expectedMatch );
      } );

      it( 'should return 0 for a hand with no pairs', () => {
         let pairsScore;
         hand.push( deck.buildCard( '2', 'Hearts' ) );
         hand.push( deck.buildCard( '4', 'Diamonds' ) );
         hand.push( deck.buildCard( '6', 'Spades' ) );
         hand.push( deck.buildCard( '8', 'Spades' ) );
         hand.push( cutCard );
         pairsScore = intel.getPairsScore( hand );
         expect( pairsScore.score ).to.equal( 0 );
         expect( pairsScore.cards ).to.deep.equal( [] );
      } )
   } );

   describe( 'getRunScore()', () => {
      it( 'should return null for a hand of less than five cards', () => {
         hand.push( deck.buildCard( '5', 'Hearts' ) );
         hand.push( deck.buildCard( '4', 'Clubs' ) );
         hand.push( deck.buildCard( 'Ace', 'Hearts' ) );
         hand.push( deck.buildCard( '2', 'Hearts' ) );
         expect( intel.getRunScore( hand ) ).to.be.null;
      } );

      it( 'should return a score of 5, and all 5 cards for a four card run with an additional cut card', () => {
         let runScore, expectedMatch = [];
         hand.push( deck.buildCard( '5', 'Hearts' ) );
         hand.push( deck.buildCard( '4', 'Clubs' ) );
         hand.push( deck.buildCard( 'Ace', 'Hearts' ) );
         hand.push( deck.buildCard( '2', 'Hearts' ) );
         hand.push( cutCard );
         expectedMatch.push( hand );
         runScore = intel.getRunScore( hand );
         expect( runScore.score ).to.equal( 5 );
         expect( runScore.cards ).to.deep.equal( expectedMatch );
      } );

      it( 'should return a score of 4, and matching cards for a hand with a four card run', () => {
         let runScore, expectedMatch = [];
         hand.push( deck.buildCard( '5', 'Hearts' ) );
         hand.push( deck.buildCard( '4', 'Clubs' ) );
         hand.push( deck.buildCard( '6', 'Hearts' ) );
         hand.push( deck.buildCard( '9', 'Hearts' ) );
         hand.push( cutCard );
         runScore = intel.getRunScore( hand );
         expectedMatch = [];
         expectedMatch.push( [] );
         expectedMatch[0].push( deck.buildCard( '5', 'Hearts' ) );
         expectedMatch[0].push( deck.buildCard( '4', 'Clubs' ) );
         expectedMatch[0].push( deck.buildCard( '6', 'Hearts' ) );
         expectedMatch[0].push( cutCard );
         expect( runScore.score ).to.equal( 4 );
         expect( runScore.cards ).to.deep.equal( expectedMatch );
      } );

      it( 'should return a score of 8 for a double run of 4', () => {
         let runScore, expectedMatch = [];
         hand.push( deck.buildCard( '5', 'Hearts' ) );
         hand.push( deck.buildCard( '4', 'Clubs' ) );
         hand.push( deck.buildCard( '6', 'Hearts' ) );
         hand.push( deck.buildCard( '3', 'Hearts' ) );
         hand.push( cutCard );
         runScore = intel.getRunScore( hand );
         expectedMatch = [];
         expectedMatch.push( [] );
         expectedMatch[0].push( deck.buildCard( '5', 'Hearts' ) );
         expectedMatch[0].push( deck.buildCard( '4', 'Clubs' ) );
         expectedMatch[0].push( deck.buildCard( '6', 'Hearts' ) );
         expectedMatch[0].push( deck.buildCard( '3', 'Hearts' ) );
         expectedMatch.push( [] );
         expectedMatch[1].push( deck.buildCard( '5', 'Hearts' ) );
         expectedMatch[1].push( deck.buildCard( '4', 'Clubs' ) );
         expectedMatch[1].push( deck.buildCard( '6', 'Hearts' ) );
         expectedMatch[1].push( cutCard );
         expect( runScore.score ).to.equal( 8 );
         expect( runScore.cards ).to.deep.equal( expectedMatch );
      } );

      it( 'should return a score of 3 for a 3 card run', () => {
         let runScore, expectedMatch = [];
         hand.push( deck.buildCard( '5', 'Hearts' ) );
         hand.push( deck.buildCard( '4', 'Clubs' ) );
         hand.push( deck.buildCard( 'Jack', 'Hearts' ) );
         hand.push( deck.buildCard( 'Queen', 'Hearts' ) );
         hand.push( cutCard );
         runScore = intel.getRunScore( hand );
         expectedMatch.push( [] );
         expectedMatch[0].push( deck.buildCard( '5', 'Hearts' ) );
         expectedMatch[0].push( deck.buildCard( '4', 'Clubs' ) );
         expectedMatch[0].push( cutCard );
         expect( runScore.score ).to.equal( 3 );
         expect( runScore.cards ).to.deep.equal( expectedMatch );
      } );

      it( 'should return a score of 6 for a double 3 card run', () => {
         let runScore, expectedMatch = [];
         hand.push( deck.buildCard( '5', 'Hearts' ) );
         hand.push( deck.buildCard( '4', 'Clubs' ) );
         hand.push( deck.buildCard( '4', 'Hearts' ) );
         hand.push( deck.buildCard( 'Queen', 'Hearts' ) );
         hand.push( cutCard );
         expectedMatch.push( [] );
         expectedMatch[0].push( deck.buildCard( '5', 'Hearts' ) );
         expectedMatch[0].push( deck.buildCard( '4', 'Clubs' ) );
         expectedMatch[0].push( cutCard );
         expectedMatch.push( [] );
         expectedMatch[1].push( deck.buildCard( '5', 'Hearts' ) );
         expectedMatch[1].push( deck.buildCard( '4', 'Hearts' ) );
         expectedMatch[1].push( cutCard );
         runScore = intel.getRunScore( hand );
         expect( runScore.score ).to.equal( 6 );
         expect( runScore.cards ).to.deep.equal( expectedMatch );
      } );

      it( 'should return a score of 9 for a triple 3 card run', () => {
         let runScore, expectedMatch = [];
         hand.push( deck.buildCard( '5', 'Hearts' ) );
         hand.push( deck.buildCard( '4', 'Clubs' ) );
         hand.push( deck.buildCard( '4', 'Hearts' ) );
         hand.push( deck.buildCard( '4', 'Diamonds' ) );
         hand.push( cutCard );
         expectedMatch.push([]);
         expectedMatch[0].push( deck.buildCard( '5', 'Hearts' ) );
         expectedMatch[0].push( deck.buildCard( '4', 'Clubs' ) );
         expectedMatch[0].push( cutCard );
         expectedMatch.push( [] );
         expectedMatch[1].push( deck.buildCard( '5', 'Hearts' ) );
         expectedMatch[1].push( deck.buildCard( '4', 'Hearts' ) );
         expectedMatch[1].push( cutCard );
         expectedMatch.push( [] );
         expectedMatch[2].push( deck.buildCard( '5', 'Hearts' ) );
         expectedMatch[2].push( deck.buildCard( '4', 'Diamonds' ) );
         expectedMatch[2].push( cutCard );
         runScore = intel.getRunScore( hand );
         expect( runScore.score ).to.equal( 9 );
         expect( runScore.cards ).to.deep.equal( expectedMatch );
      } );

      it( 'should return a score of 12 for 2 double 3 card runs', () => {
         let runScore, expectedMatch = [];
         hand.push( deck.buildCard( '5', 'Hearts' ) );
         hand.push( deck.buildCard( '5', 'Clubs' ) );
         hand.push( deck.buildCard( '4', 'Hearts' ) );
         hand.push( deck.buildCard( '4', 'Diamonds' ) );
         hand.push( cutCard );
         runScore = intel.getRunScore( hand );
         expect( runScore.score ).to.equal( 12 );
         expectedMatch.push([]);
         expectedMatch[0].push( deck.buildCard( '5', 'Hearts' ) );
         expectedMatch[0].push( deck.buildCard( '4', 'Hearts' ) );
         expectedMatch[0].push( cutCard );
         expectedMatch.push([]);
         expectedMatch[1].push( deck.buildCard( '5', 'Hearts' ) );
         expectedMatch[1].push( deck.buildCard( '4', 'Diamonds' ) );
         expectedMatch[1].push( cutCard );
         expectedMatch.push([]);
         expectedMatch[2].push( deck.buildCard( '5', 'Clubs' ) );
         expectedMatch[2].push( deck.buildCard( '4', 'Hearts' ) );
         expectedMatch[2].push( cutCard );
         expectedMatch.push([]);
         expectedMatch[3].push( deck.buildCard( '5', 'Clubs' ) );
         expectedMatch[3].push( deck.buildCard( '4', 'Diamonds' ) );
         expectedMatch[3].push( cutCard );
         expect( runScore.cards ).to.deep.equal( expectedMatch );
      } );

      it( 'should return a score of 0 for no run', () => {
         let runScore;
         hand.push( deck.buildCard( '5', 'Hearts' ) );
         hand.push( deck.buildCard( '5', 'Clubs' ) );
         hand.push( deck.buildCard( '10', 'Hearts' ) );
         hand.push( deck.buildCard( '10', 'Diamonds' ) );
         hand.push( cutCard );
         runScore = intel.getRunScore( hand )
         expect( runScore.score ).to.equal( 0 );
         expect( runScore.cards ).to.deep.equal( [] );
      } );
   } );

   describe( 'getFlushScore()', () => {
      it( 'should return null for an invalid hand', () => {
         hand.push( deck.buildCard( '4', 'Hearts' ) );
         hand.push( deck.buildCard( '5', 'Hearts' ) );
         expect( intel.getFlushScore( hand, cutCard ) ).to.be.null;
      } );

      it( 'should return 0 for a 3 card flush', () => {
         hand.push( deck.buildCard( 'Ace', 'Hearts' ) );
         hand.push( deck.buildCard( '2', 'Hearts' ) );
         hand.push( deck.buildCard( '5', 'Clubs' ) );
         hand.push( deck.buildCard( '8', 'Hearts' ) );
         expect( intel.getFlushScore( hand, cutCard ) ).to.equal( 0 );
      } );

      it( 'should return 4 for a 4 card flush ', () => {
         hand.push( deck.buildCard( 'Ace', 'Hearts' ) );
         hand.push( deck.buildCard( '2', 'Hearts' ) );
         hand.push( deck.buildCard( '5', 'Hearts' ) );
         hand.push( deck.buildCard( '8', 'Hearts' ) );
         expect( intel.getFlushScore( hand, cutCard ) ).to.equal( 4 );
      } );
      
      it( 'should return 5 for a 4 card flush that matches the suit of the cut card', () => {
         hand.push( deck.buildCard( 'Ace', 'Clubs' ) );
         hand.push( deck.buildCard( '2', 'Clubs' ) );
         hand.push( deck.buildCard( '5', 'Clubs' ) );
         hand.push( deck.buildCard( '8', 'Clubs' ) );
         expect( intel.getFlushScore( hand, cutCard ) ).to.equal( 5 );
      } );
   } );
   
   describe( 'getScore()', () => {
      it( 'should return 29 for the best possible hand', () => {
         let score;
         hand.push( deck.buildCard( 'Jack', 'Diamonds' ) );
         hand.push( deck.buildCard( '5', 'Clubs' ) );
         hand.push( deck.buildCard( '5', 'Hearts' ) );
         hand.push( deck.buildCard( '5', 'Spades' ) );
         score = intel.getScore( hand, deck.buildCard( '5', 'Diamonds' ) );
         expect( score.score ).to.equal( 29 );
         expect( score.fifteens.score ).to.equal( 16 );
         expect( score.rightJack ).to.equal( 1 );
         expect( score.pairs.score ).to.equal( 12 );
         expect( score.runs.score ).to.equal( 0 );
         expect( score.flush ).to.equal( 0 );
      } );

      it( 'should return 0 for a non-scoring hand', () => {
         let score;
         hand.push( deck.buildCard( 'Jack', 'Diamonds' ) );
         hand.push( deck.buildCard( '4', 'Clubs' ) );
         hand.push( deck.buildCard( '3', 'Hearts' ) );
         hand.push( deck.buildCard( '9', 'Spades' ) );
         score = intel.getScore( hand, deck.buildCard( 'King', 'Hearts' ) );
         expect( score.score ).to.equal( 0 );
      } );
   } );
} );
