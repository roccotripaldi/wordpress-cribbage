import {
    concat,
    every,
    filter,
    find,
    forEach,
    groupBy,
    isEmpty,
    keys,
    map,
    pickBy,
    reduce,
    sortBy
} from 'lodash';

import ScoringIndexes from './scoringIndexes';

let currentHand, matches;

export default class Intelligence {

    isSequential( cards ) {
        return every( sortBy( cards, ['sequence'] ), ( card, index, cards ) => {
            return (
                index === 0 ||
                card.sequence === cards[ index - 1 ].sequence + 1
            );
        } );
    }

    isSumFifteen( cards ) {
        return ( reduce( cards, ( sum, card) => { return sum + card.value }, 0 ) === 15 );
    }

    getFifteensScore( hand ) {
        let combinations,
            fifteens = [];

        if ( hand.length !== 5 ) {
            return null;
        }

        if ( this.isSumFifteen( hand ) ) {
            fifteens.push( hand );
        }

        if ( isEmpty( fifteens ) ) {
            currentHand = hand;
            combinations = map( ScoringIndexes.fifteens, ( sequence ) => {
                return map( sequence, ( index ) => { return currentHand[ index ] } )
            } );
            fifteens = filter( combinations, this.isSumFifteen );
        }
        return {
            cards: fifteens,
            score: fifteens.length * 2
        };
    }

    getRightJackScore( hand, cutCard ) {
        return ( find( hand, { name: 'Jack', suit: cutCard.suit } ) ) ? 1 : 0;
    }
    
    getPairsScore( hand ) {
        if ( hand.length !== 5 ) {
            return null;
        }
        currentHand = hand;
        const combinations = map( ScoringIndexes.pairs, ( sequence ) => {
            return map( sequence, ( index ) => { return currentHand[ index ] } )
        } );
        const pairs = filter( combinations, ( cards ) => { return cards[0].name === cards[1].name } );
        return {
            cards: pairs,
            score: pairs.length * 2
        };
    }

    getRunScore( hand ) {
        let fourCardCombos, threeCardCombos,
            runs = [];

        if ( hand.length !== 5 ) {
            return null;
        }

        if ( this.isSequential( hand ) ) {
            runs.push( hand );
        }

        if ( isEmpty( runs ) ) {
            currentHand = hand;
            fourCardCombos = map( ScoringIndexes.runs.fourCards, ( sequence ) => {
                return map( sequence, ( index ) => { return currentHand[ index ] } )
            } );
            runs = filter( fourCardCombos, this.isSequential );
            if ( isEmpty( runs ) ) {
                threeCardCombos = map( ScoringIndexes.runs.threeCards, ( sequence ) => {
                    return map( sequence, ( index ) => { return currentHand[ index] } )
                } );
                runs = filter( threeCardCombos, this.isSequential );
            }
        }

        return {
            cards: runs,
            score: reduce( runs, ( sum, run ) => { return sum + run.length }, 0 )
        };
    }

    getFlushScore( hand, cutCard ) {
        if ( hand.length != 4 ) {
            return null;
        }
        const groupedBySuit = groupBy( hand, ( card ) => { return card.suit } );
        const flush = pickBy( groupedBySuit, ( cards ) => { return cards.length > 3 } );
        let suit;
        if ( isEmpty( flush ) ) {
            return 0;
        }
        suit = keys( flush )[0];
        return ( suit === cutCard.suit ) ? 5 : 4;
    }

    getScore( hand, cutCard ) {
        if( hand.length != 4 ) {
            return null;
        }
        const fifteens = this.getFifteensScore( concat( hand, cutCard ) ),
            rightJack = this.getRightJackScore( hand, cutCard ),
            pairs = this.getPairsScore( concat( hand, cutCard ) ),
            runs = this.getRunScore( concat( hand, cutCard ) ),
            flush = this.getFlushScore( hand, cutCard ),
            score = fifteens.score + rightJack + pairs.score + runs.score + flush;
        return { fifteens, rightJack, pairs, runs, flush, score }
    }
};
