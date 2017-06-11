import { expect } from 'chai';

import Analyzer from '../analyzer';
import Deck from '../../deck/index';

describe( 'Analyzer', () => {
    let analyzer, deck;
    beforeEach( () => {
        analyzer = new Analyzer;
        deck = new Deck;
    } );
    
    describe( 'constructor()', () => {
        it( 'should have a deck property', () => {
            expect( analyzer.deck ).to.be.an( 'Object' ).that.has.property( 'cards' );
        } );
    } );
    
    describe( 'removeHandFromDeck()', () => {
        it( 'should remove hand from deck', () => {
            let hand = [];
            hand.push( deck.buildCard( 'Ace', 'Spades' ) );
            hand.push( deck.buildCard( '2', 'Hearts' ) );
            hand.push( deck.buildCard( 'Jack', 'Hearts' ) );
            hand.push( deck.buildCard( '9', 'Clubs' ) );
            hand.push( deck.buildCard( 'Ace', 'Hearts' ) );
            hand.push( deck.buildCard( '4', 'Diamonds' ) );
            analyzer.removeHandFromDeck( hand );
            expect( analyzer.deck.cards.length ).to.equal( 46 );
        } );
    } );
} );
