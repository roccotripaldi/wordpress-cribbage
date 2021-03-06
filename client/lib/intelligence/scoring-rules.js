import groupBy from 'lodash/groupBy';
import isEmpty from 'lodash/isEmpty';
import keys from 'lodash/keys';
import pickBy from 'lodash/pickBy';
import sortBy from 'lodash/sortBy';

const scoringCombinations = {
    fifteens: [
        [0,1], [0,2], [0,3], [0,4], [1,2], [1,3], [1,4], [2,3], [2,4], [3,4],
        [0,1,2], [0,1,3], [0,1,4], [0,2,3], [0,2,4], [0,3,4], [1,2,3], [1,2,4], [1,3,4], [2,3,4],
        [0,1,2,3], [0,1,2,4], [0,1,3,4], [0,2,3,4], [1,2,3,4]
    ],
    pairs: [
        [0,1], [0,2], [0,3], [0,4], [1,2], [1,3], [1,4], [2,3], [2,4], [3,4]
    ],
    runs: {
        fourCards: [ [0,1,2,3], [0,1,2,4], [0,1,3,4], [0,2,3,4], [1,2,3,4] ],
        threeCards: [ [0,1,2], [0,1,3], [0,1,4], [0,2,3], [0,2,4], [0,3,4], [1,2,3], [1,2,4], [1,3,4], [2,3,4] ]
    }
};

export default class ScoringRules {
    constructor( hand, cutCard ) {
        this.hand = hand;
        this.cutCard = cutCard;
    }

    generateCardCombination( combination ) {
        const cards = this.hand.concat( this.cutCard );
        return combination.map( ( index ) => { return cards[ index ] } );
    }

    generateCardCombinations( combinations ) {
        return combinations.map( ( combination ) => { return this.generateCardCombination( combination ) } );
    }

    static isSequential( cards ) {
        return sortBy( cards, ( card ) => { return card.sequence } ).every( ( card, index, cards ) => {
            return (
                index === 0 ||
                card.sequence === cards[ index - 1 ].sequence + 1
            );
        } );
    }

    static isSumFifteen( cards ) {
        return ( cards.reduce( ( sum, card ) => { return sum + card.value }, 0 ) === 15 );
    }

    getFifteensScore() {
        let combinations,
            fifteens = [];

        if ( ScoringRules.isSumFifteen( this.hand.concat( this.cutCard ) ) ) {
            fifteens.push( this.hand.concat( this.cutCard ) );
        }

        if ( isEmpty( fifteens ) ) {
            combinations = this.generateCardCombinations( scoringCombinations.fifteens );
            fifteens = combinations.filter( ScoringRules.isSumFifteen );
        }

        return {
            cards: fifteens,
            score: fifteens.length * 2
        };
    }

    getRightJackScore() {
        return ( this.hand.find( ( card ) => { return card.name === 'Jack' && card.suit === this.cutCard.suit } ) ) ? 1 : 0;
    }

    getPairsScore() {
        const combinations = this.generateCardCombinations( scoringCombinations.pairs );
        const pairs = combinations.filter( ( cards ) => { return cards[0].name === cards[1].name } );
        return {
            cards: pairs,
            score: pairs.length * 2
        };
    }

    getRunScore() {
        let fourCardCombos, threeCardCombos,
            runs = [];

        if ( ScoringRules.isSequential( this.hand.concat( this.cutCard ) ) ) {
            runs.push( this.hand.concat( this.cutCard ) );
        }

        if ( isEmpty( runs ) ) {
            fourCardCombos = this.generateCardCombinations( scoringCombinations.runs.fourCards );
            runs = fourCardCombos.filter( ScoringRules.isSequential );

            if ( isEmpty( runs ) ) {
                threeCardCombos = this.generateCardCombinations( scoringCombinations.runs.threeCards );
                runs = threeCardCombos.filter( ScoringRules.isSequential );
            }
        }

        return {
            cards: runs,
            score: runs.reduce( ( sum, run ) => { return sum + run.length }, 0 )
        };
    }

    getFlushScore() {
        const groupedBySuit = groupBy( this.hand, ( card ) => { return card.suit } );
        const flush = pickBy( groupedBySuit, ( cards ) => { return cards.length > 3 } );
        let suit;
        if ( isEmpty( flush ) ) {
            return 0;
        }
        suit = keys( flush )[0];
        return ( suit === this.cutCard.suit ) ? 5 : 4;
    }

    getScore() {
        if( this.hand.length !== 4 ) {
            return null;
        }
        const fifteens = this.getFifteensScore(),
            rightJack = this.getRightJackScore(),
            pairs = this.getPairsScore(),
            runs = this.getRunScore(),
            flush = this.getFlushScore(),
            score = fifteens.score + rightJack + pairs.score + runs.score + flush;
        return { fifteens, rightJack, pairs, runs, flush, score }
    }
}
