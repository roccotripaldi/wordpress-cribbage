import { filter, find, map } from 'lodash';

import Deck from '../deck/index';
import ScoringIndexes from './scoringIndexes';

let currentHand;

export default class Analyzer {
    constructor() {
        this.deck = new Deck;
        this.deck.build();
    }

    removeHandFromDeck( hand ) {
        currentHand = hand;
        this.deck.cards = filter( this.deck.cards, ( card ) => {
            return ! find( currentHand, { name: card.name, suit: card.suit } );
        } );
    }

    getPotentialFourCardHands( hand ) {
        currentHand = hand;
        return  map( ScoringIndexes.fourCardHandsFromSixCards, ( sequence ) => {
            return map( sequence, ( index ) => { return currentHand[ index ] } )
        } );
    }
}
