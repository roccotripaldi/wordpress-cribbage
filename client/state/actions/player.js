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
    OPPONENT_DISCARDS,
    PLAYER_ACCEPTS_CRIB_SCORE,
    PLAYER_ACCEPTS_OPPONENTS_SCORE,
    PLAYER_ACCEPTS_OWN_SCORE
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

export const acceptScore = ( points, actionType, dealer, pegIndex ) => {
    let type, person = null;
    if ( actionType === 'playerAcceptsOwnScore' ) {
        type = PLAYER_ACCEPTS_OWN_SCORE;
        person = 'Player';
    } else if ( actionType === 'playerAcceptsOpponentsScore' ) {
        type = PLAYER_ACCEPTS_OPPONENTS_SCORE;
        person = 'Opponent'
    } else {
        person = dealer;
        type = PLAYER_ACCEPTS_CRIB_SCORE;
    }
    return { type, points, dealer, person, pegIndex }
};