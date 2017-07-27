import sortBy from 'lodash/sortBy';
import { getPegScore } from './pegging-rules';

export default class PeggingAI {
    constructor( hand, sequence ) {
        this.hand = sortBy( hand, [ 'value', 'suitValue' ] ).reverse();
        this.sequence = sequence;
        this.highestScoringIndex = -1;
        this.highestScore = 0;
    }

    playFirstCard() {
        const cardIndex = this.hand.findIndex( ( card, index, hand ) => {
            return card.value !== 5 || index === hand.length - 1;
        } );
        return this.hand[ cardIndex ];
    }

    playCard() {
        if( this.hand.length === 1 ) {
            return this.hand[0];
        }
        this.hand.forEach( ( card, index ) => {
            const pegScore = getPegScore( card, this.sequence );
            if ( pegScore === false ) {
                return;
            }
            if ( pegScore.score > this.highestScore ) {
                this.highestScore = pegScore.score;
                this.highestScoringIndex = index;
            } else if ( this.highestScoringIndex === -1 ) {
                this.highestScoringIndex = index;
            }
        } );
        return this.hand[ this.highestScoringIndex ];
    }
}
