/**
 * External Dependencies
 */
import findIndex from 'lodash/findIndex';
/**
 * Internal Dependencies
 */
import {
    PLAYER_INITIAL_DRAW,
    OPPONENT_INITIAL_DRAW,
    PLAYER_DISCARDS,
    OPPONENT_DISCARDS
} from '../action-types';
import Analyzer from '../../lib/intelligence/analyzer';

export const playerDraws = ( card ) => {
    return {
        type: PLAYER_INITIAL_DRAW,
        card
    }
};

export const opponentDraws = ( card ) => {
    return {
        type: OPPONENT_INITIAL_DRAW,
        card
    }
};

export const playerDiscards = ( cards, cardIndexes, dealer ) => {
    return {
        type: PLAYER_DISCARDS,
        cards,
        dealer,
        cardIndexes
    }
};

export const opponentDiscards = ( hand, dealer ) => {
    let keptCardIndexes, discards, discardIndexes;
    const analyzer = new Analyzer( hand );
        analyzer.analyze();
        keptCardIndexes = analyzer.analysis.highestAverageHand.combination;
        discards = hand.filter( ( card, index ) => {
            return ! keptCardIndexes.includes( index );
        } );
        discardIndexes = discards.map( ( card ) => {
            return findIndex( hand, { name: card.name, suit: card.suit } );
        } );
    return {
        type: OPPONENT_DISCARDS,
        cards: discards,
        dealer,
        cardIndexes: discardIndexes
    }
};