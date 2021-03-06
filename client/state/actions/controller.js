/**
 * External Dependencies
 */
import shuffle from 'lodash/shuffle';
/**
 * Internal Dependencies
 */
import {
    CONTROLLER_BUILDS_DECK,
    CONTROLLER_RESET_GAME,
    CONTROLLER_TOGGLE_TIMER ,
    CONTROLLER_ASSIGNS_FIRST_DEALER,
    CONNTROLLER_RESET_DECK,
    CONTROLLER_DEALS_CARD_TO_PLAYER,
    CONTROLLER_DEALS_CARD_TO_OPPONENT,
    CONTROLLER_DEAL_COMPLETE,
    CONTROLLER_CUT_CARD,
    CONTROLLER_HIS_HEALS,
    CONTROLLER_SCORES_OPPONENT,
    CONTROLLER_SCORES_PLAYER,
    CONTROLLER_SCORES_CRIB,
    CONTROLLER_GAME_COMPLETE,
    CONTROLLER_COMPLETE_PLAY,
    CONTROLLER_RESET_PLAY
} from '../action-types';
import { buildDeck } from '../../lib/deck';
import ScoringRules from '../../lib/intelligence/scoring-rules';

export const controllerBuildsDeck = () => {
    return {
        type: CONTROLLER_BUILDS_DECK,
        deck: shuffle( buildDeck() )
    }
};

export const resetDeck = ( dealer ) => {
    return {
        type: CONNTROLLER_RESET_DECK,
        deck: shuffle( buildDeck() ),
        dealer
    }
};

export const resetGame = () => {
    return {
        type: CONTROLLER_RESET_GAME
    }
};

export const toggleTimer = () => {
    return {
        type: CONTROLLER_TOGGLE_TIMER
    }
};

export const assignFistDealer = ( playerDraw, opponentDraw ) => {
    let dealer;
    if ( playerDraw.sequence > opponentDraw.sequence ) {
        dealer = 'Opponent';
    } else if ( playerDraw.sequence < opponentDraw.sequence ) {
        dealer = 'Player'
    } else {
        dealer = ( playerDraw.suitValue > opponentDraw.suitValue ) ? 'Opponent' : 'Player';
    }
    return {
        type: CONTROLLER_ASSIGNS_FIRST_DEALER,
        dealer
    }
};

export const dealCardToPlayer = ( card ) => {
    return {
        type: CONTROLLER_DEALS_CARD_TO_PLAYER,
        card
    }
};

export const dealCardToOpponent = ( card ) => {
    return {
        type: CONTROLLER_DEALS_CARD_TO_OPPONENT,
        card
    }
};

export const dealComplete = () => {
    return {
        type: CONTROLLER_DEAL_COMPLETE
    }
};

export const selectRandomCutCard = ( deck, dealer ) => {
    const randomCard = deck[ Math.floor( Math.random() * deck.length ) ];
    return {
        type: CONTROLLER_CUT_CARD,
        card: randomCard,
        dealer
    }
};

export const awardHisHeels = ( person, pegIndex ) => {
    return {
        type: CONTROLLER_HIS_HEALS,
        person,
        pegIndex,
        points: 2
    }
};

export const setScore = ( hand, cutCard, actionType ) => {
    let type;
    const rules = new ScoringRules( hand, cutCard );
        if ( 'playerScores' === actionType ) {
            type = CONTROLLER_SCORES_PLAYER;
        } else if ( 'opponentScores' === actionType ) {
            type = CONTROLLER_SCORES_OPPONENT;
        } else if ( 'cribScores' === actionType ) {
            type = CONTROLLER_SCORES_CRIB;
        }
    return {
        type,
        score: rules.getScore()
    }
};

export const resetPlay = ( previousPlayer ) => {
    const nextPlayer = ( previousPlayer === 'Opponent' ) ? 'Player' : 'Opponent';
    return {
        type: CONTROLLER_RESET_PLAY,
        nextPlayer
    };
};

export const completePlay = ( lastPlayer, pegIndex, dealer ) => {
    return {
        type: CONTROLLER_COMPLETE_PLAY,
        points: 1,
        person: lastPlayer,
        play: {
            score: 1,
            reason: ( lastPlayer === 'Opponent' ) ? '1 point for opponent\'s last card.' : '1 point for your last card'
        },
        pegIndex,
        dealer
    };
};

export const gameComplete = ( winner ) => {
    return {
        type: CONTROLLER_GAME_COMPLETE,
        winner
    };
};
