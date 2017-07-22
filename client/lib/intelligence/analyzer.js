import { buildDeck } from '../deck/index';
import ScoringRules from './scoring-rules';

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
        this.analysis = {
            highestPossibleHand: {},
            highestAverageHand: {},
            highestPossibleScore: 0
        }
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
                combination,
                cards: combination.map( ( index ) => { return this.hand[ index ] } ),
                scores: [],
                average: 0
            }
        } );
    }

    addScoreToPotentialHand( card ) {
        this.potentialHands.forEach( ( potentialHand ) => {
            const rules = new ScoringRules( potentialHand.cards, card );
            potentialHand.scores.push( {
                card,
                score: rules.getScore().score
            } );
        } );
    }
    
    generateScores() {
        this.removeHandFromDeck();
        this.generatePotentialFourCardHands();
        this.deck.forEach( this.addScoreToPotentialHand, this );
    }

    generateAverages() {
        this.generateScores();
        this.potentialHands.forEach( ( hand ) => {
            hand.average = hand.scores.reduce( ( average, score ) => {
                return average + score.score;
            }, 0 ) / 46;
        } );
        this.potentialHands.sort( ( hand, nextHand ) => { return nextHand.average - hand.average } );
        this.potentialHands.forEach( ( hand ) => {
            hand.scores.sort( ( score, nextScore ) => { return nextScore.score - score.score } );
        } );
    }

    analyze() {
        this.generateAverages();
        const { combination, cards, average, scores } = this.potentialHands[0];
        this.analysis.highestAverageHand = { combination, cards, average, cutCard: scores[0].card, score: scores[0].score };
        this.potentialHands.forEach( ( hand ) => {
            if ( hand.scores[0].score > this.analysis.highestPossibleScore ) {
                this.analysis.highestPossibleScore = hand.scores[0].score;
                this.analysis.highestPossibleHand = {
                    combination: hand.combination,
                    cards: hand.cards,
                    cutCard: scores[0].card,
                    average: hand.average,
                    score: hand.scores[0].score
                };
            }
        } );
    }
}
