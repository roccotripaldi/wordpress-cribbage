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
    PLAYER_ACCEPTS_OWN_SCORE,
    OPPONENT_PLAYS,
    PLAYER_PLAYS,
    OPPONENT_GO
} from '../action-types';
import DiscardAI from '../../lib/intelligence/discard-ai';
import PeggingAI from '../../lib/intelligence/pegging-ai';
import { getPegScore } from '../../lib/intelligence/pegging-rules';

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
    const ai = new DiscardAI( hand );
        ai.analyze();
        keptCardIndexes = ai.analysis.highestAverageHand.combination;
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

export const opponentPlays = ( playValue, sequence, hand, pegIndex ) => {
    const ai = new PeggingAI( hand, sequence );
    let card, play;
    if ( playValue === 0 ) {
        card = ai.playFirstCard();
    } else {
        card = ai.playCard();
    }
    play = getPegScore( card, sequence );
    return {
        type: OPPONENT_PLAYS,
        card,
        play,
        points: play.score,
        person: 'Opponent',
        pegIndex
    };
};

export const opponentGo = ( points, pegIndex, dealer, isFinalGo ) => {
    const play = {
        score: points,
        reason: ( points === 1 ) ? '1 point for last card' : 'Opponent cannot play.'
    };
    return {
        type: OPPONENT_GO,
        person: 'Opponent',
        points,
        pegIndex,
        isFinalGo,
        play,
        dealer
    };
};

export const playerPlays = ( sequence, card, pegIndex ) => {
    const play = getPegScore( card, sequence );
    return {
        type: PLAYER_PLAYS,
        card,
        play,
        points: play.score,
        person: 'Player',
        pegIndex
    };
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