import { buildDeck } from '../deck/index';
import Intelligence from './index';

const fourCardHandsFromSixCards = [
    [0,1,2,3],[0,1,2,4],[0,1,2,5],[0,1,3,4],[0,1,3,5],[0,1,4,5],
    [0,2,3,4],[0,2,3,5],[0,2,4,5],
    [0,3,4,5],
    [1,2,3,4],[1,2,3,5],[1,2,4,5],[1,3,4,5],
    [2,3,4,5]
];

export default class Analyzer {
    constructor( hand ) {
        this.deck = buildDeck();
        this.potentialHands = [];
        this.hand = hand;
    }

    keepCardInDeck( card ) {
        return ( this.hand.find( ( cardInHand ) => {
            return ( cardInHand.name === card.name && cardInHand.suit === card.suit )
        } ) ) ?
            false :
            true;
    }

    removeHandFromDeck() {
        this.deck = this.deck.filter( this.keepCardInDeck, this );
    }

    generatePotentialFourCardHands() {
        this.potentialHands = fourCardHandsFromSixCards.map( ( combination ) => {
            return {
                cards: combination.map( ( index ) => { return this.hand[ index ] } ),
                scores: []
            }
        } );
    }

    addScoreToPotentialHand( card ) {
        this.potentialHands.forEach( ( potentialHand ) => {
            const intel = new Intelligence( potentialHand.cards, card );
            potentialHand.scores.push( {
                card,
                score: intel.getScore().score
            } );
        } );
    }
    
    generateScores() {
        this.removeHandFromDeck();
        this.generatePotentialFourCardHands();
        this.deck.forEach( this.addScoreToPotentialHand, this );
    }
}
